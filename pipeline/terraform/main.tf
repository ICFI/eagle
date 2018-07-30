provider "aws" {
  profile = "${var.profile}"
  region  = "${var.region}"
}

locals {
  network_prefix = "10.1"
  availability_zones = [ "${var.region}a", "${var.region}b" ]
  resource_label = "${var.project}-${terraform.workspace}"
}

// ~~ Eagle container ~~~

resource "aws_ecr_repository" "ecr" {
  name = "eagle-${local.resource_label}"
}

data "template_file" "eagle_task_definition" {
  template = "${file("${path.module}/tasks/app.json")}"

  vars {
    image            = "733061535348.dkr.ecr.us-east-1.amazonaws.com/eagle-${local.resource_label}:latest"
    container_name   = "eagle"
    cpu              = "512"
    memory           = "2048"
    log_group_region = "${var.region}"
    log_group_name   = "eagle-${local.resource_label}"
  }
}

resource "aws_ecs_task_definition" "eagle" {
  family                = "${local.resource_label}-eagle"
  container_definitions = "${data.template_file.eagle_task_definition.rendered}"
}

resource "aws_alb_target_group" "eagle" {
  name     = "eagle-${local.resource_label}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${module.vpc.vpc_id}"

  health_check {
    protocol = "HTTP"
    path = "/"
    interval = 30
    healthy_threshold = 5
    unhealthy_threshold = 4
    timeout = 5
    matcher = "200"
  }
}

resource "aws_ecs_service" "eagle" {
  name            = "eagle"
  cluster         = "${module.ecs_cluster.cluster_id}"
  task_definition = "${aws_ecs_task_definition.eagle.arn}"
  desired_count   = 1
  iam_role        = "${aws_iam_role.ecs_service.name}"

  load_balancer {
    target_group_arn = "${aws_alb_target_group.eagle.id}"
    container_name   = "eagle"
    container_port   = "8080"
  }

  depends_on = [ "aws_alb_listener.front_end" ]
}

// ~~ Jenkins container ~~~

data "template_file" "jenkins_task_definition" {
  template = "${file("${path.module}/tasks/jenkins.json")}"

  vars {
    image            = "spohnan/jenkins-docker:latest"
    container_name   = "jenkins"
    cpu              = "2048"
    memory           = "6144"
  }
}

resource "aws_ecs_task_definition" "jenkins" {
  family                = "${local.resource_label}-jenkins"
  container_definitions = "${data.template_file.jenkins_task_definition.rendered}"

  volume {
    name      = "efs-jenkins"
    host_path = "/mnt/efs/jenkins"
  }

  volume {
    name = "docker-socket"
    host_path = "/var/run/docker.sock"
  }

  volume {
    name = "ecs-cluster-config"
    host_path = "/etc/ecs/ecs.config"
  }
}

resource "aws_ecs_service" "jenkins" {
  name            = "jenkins"
  cluster         = "${module.ecs_cluster.cluster_id}"
  task_definition = "${aws_ecs_task_definition.jenkins.arn}"
  desired_count   = 1
  iam_role        = "${aws_iam_role.ecs_service.name}"

  load_balancer {
    target_group_arn = "${aws_alb_target_group.jenkins.id}"
    container_name   = "jenkins"
    container_port   = "8080"
  }

  depends_on = [ "aws_alb_listener.front_end" ]
}

resource "aws_alb_target_group" "jenkins" {
  name     = "jenkins-${local.resource_label}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${module.vpc.vpc_id}"

  health_check {
    protocol = "HTTP"
    path = "/jenkins/login"
    interval = 30
    healthy_threshold = 5
    unhealthy_threshold = 4
    timeout = 5
    matcher = "200"
  }
}

resource "aws_lb_listener_rule" "jenkins" {
  listener_arn = "${aws_alb_listener.front_end.arn}"
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.jenkins.arn}"
  }

  condition {
    field  = "path-pattern"
    values = ["/jenkins*"]
  }
}

// ~~~ Networking ~~~

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "vpc"

  cidr = "${local.network_prefix}.0.0/16"

  azs             = "${local.availability_zones}"
  private_subnets = ["${local.network_prefix}.1.0/24", "${local.network_prefix}.2.0/24"]
  public_subnets  = ["${local.network_prefix}.11.0/24", "${local.network_prefix}.12.0/24"]
  enable_s3_endpoint = true
  enable_dynamodb_endpoint = true
  enable_dns_hostnames = true
  enable_nat_gateway = true
  single_nat_gateway = false

  tags = {
    Environment = "${terraform.env}"
    Name        = "${local.resource_label}"
  }
}

// ~~~ Load Balancer ~~~

resource "aws_alb" "main" {
  name            = "${local.resource_label}"
  subnets         = ["${module.vpc.public_subnets}"]
  security_groups = ["${aws_security_group.lb_sg.id}"]
}

resource "aws_alb_listener" "front_end" {
  load_balancer_arn = "${aws_alb.main.id}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "${var.certificate_arn}"

  default_action {
    target_group_arn = "${aws_alb_target_group.eagle.id}"
    type             = "forward"
  }
}

resource "aws_security_group" "lb_sg" {
  description = "controls access to the ${local.resource_label} ALB"

  vpc_id = "${module.vpc.vpc_id}"
  name   = "${local.resource_label}"

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"

    cidr_blocks = [
      "0.0.0.0/0",
    ]
  }
}

// ~~~ ECS Cluster ~~~

module "ecs_cluster" {
  source = "modules/ecs-cluster"

  name = "${local.resource_label}"
  efs_volume_id = "${module.efs.filesystem_id}"
  instance_keypair = "${var.key}"
  instance_type = "${var.ecs_instance_type}"
  instance_root_volume_size = "${var.ecs_instance_root_volume_size}"
  asg_desired_size = "${var.ecs_asg_min_size}"
  asg_min_size = "${var.ecs_asg_min_size}"
  asg_max_size = "${var.ecs_asg_max_size}"
  network_prefix = "${local.network_prefix}"
  vpc_id      = "${module.vpc.vpc_id}"
  vpc_subnets = ["${module.vpc.private_subnets}"]
}

resource "aws_iam_role" "ecs_service" {
  name = "${local.resource_label}"

  assume_role_policy = <<EOF
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "ecs_service" {
  name = "${local.resource_label}"
  role = "${aws_iam_role.ecs_service.name}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
        "elasticloadbalancing:DeregisterTargets",
        "elasticloadbalancing:Describe*",
        "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
        "elasticloadbalancing:RegisterTargets"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}

// ~~~ EFS Volume ~~~

module "efs" {
  source = "modules/efs"

  name = "${local.resource_label}"
  performance_mode = "generalPurpose"
  private_subnet_a = "${module.vpc.private_subnets[0]}"
  private_subnet_b = "${module.vpc.private_subnets[1]}"
  tags = {
    Name = "efs-${local.resource_label}"
  }
  vpc_cidr = "${local.network_prefix}.0.0/16"
  vpc_id = "${module.vpc.vpc_id}"
}

// ~~~ Bastion host ~~~

module "bastion" {
  source = "modules/bastion"

  bastion_allowed_ips = "${var.bastion_allowed_ips}"
  create_bastion = "${var.create_bastion}"
  key = "${var.key}"
  profile = "${var.profile}"
  project = "${var.project}"
  region = "${var.region}"
  subnet_id = "${module.vpc.public_subnets[0]}"
  vpc_id = "${module.vpc.vpc_id}"
}

// ~~~ RDS-Mysql ~~~

data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "all" {
  vpc_id = "${data.aws_vpc.default.id}"
}

data "aws_security_group" "default" {
  vpc_id = "${data.aws_vpc.default.id}"
  name   = "default"
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "1.19.0"

  # insert the 10 required variables here
  identifier = "${var.identifier}"
  engine            = "${var.engine}"
  engine_version    = "${var.engine_version}"
  instance_class    = "${var.instance_class}"
  allocated_storage = "${var.allocated_storage}"
  storage_encrypted = "${var.storage_encrypted}"
  maintenance_window = "${var.maintenance_window}"
  backup_window      = "${var.backup_window}"
  username = "${var.username}"
  password = "${var.password}"
  port     = "${var.port}"
  iam_database_authentication_enabled = true
  vpc_security_group_ids = ["${aws_security_group.lb_sg.id}"]
#["${data.aws_security_group.default.id}"]
  backup_retention_period = 0

  tags = {
    Name       = "${local.resource_label}"
    Environment = "${terraform.env}"
  }

  # DB subnet group
  subnet_ids = ["${module.vpc.private_subnets}"]
#["${data.aws_subnet_ids.all.ids}"]

  # DB parameter group
  family = "mysql5.7"

  # DB option group
  major_engine_version = "5.7"

  # Snapshot name upon DB deletion
  final_snapshot_identifier = "${var.identifier}"

 parameters = [
    {
      name = "character_set_client"
      value = "utf8"
    },
    {
      name = "character_set_server"
      value = "utf8"
    }
  ]
}
