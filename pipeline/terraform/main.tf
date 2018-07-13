provider "aws" {
  profile = "${var.profile}"
  region  = "${var.region}"
}

locals {
  network_prefix = "10.1"
  availability_zones = [ "${var.region}a", "${var.region}b" ]
  resource_label = "${var.project}-${terraform.workspace}"
}

// ~~ Nginx container ~~~

data "template_file" "nginx_task_definition" {
  template = "${file("${path.module}/tasks/nginx.json")}"

  vars {
    image            = "nginx:alpine"
    container_name   = "nginx"
    cpu              = "256"
    memory           = "256"
    log_group_region = "${var.region}"
    log_group_name   = "${local.resource_label}"
  }
}

resource "aws_ecs_task_definition" "nginx" {
  family                = "${local.resource_label}-nginx"
  container_definitions = "${data.template_file.nginx_task_definition.rendered}"
}

resource "aws_ecs_service" "nginx" {
  name            = "nginx"
  cluster         = "${module.ecs_cluster.cluster_id}"
  task_definition = "${aws_ecs_task_definition.nginx.arn}"
  desired_count   = 1
  iam_role        = "${aws_iam_role.ecs_service.name}"

  load_balancer {
    target_group_arn = "${aws_alb_target_group.nginx.id}"
    container_name   = "nginx"
    container_port   = "80"
  }

  depends_on = [ "aws_alb_listener.front_end" ]
}

// ~~~ Networking ~~~

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "vpc"

  cidr = "${local.network_prefix}.0.0/16"

  azs             = "${local.availability_zones}"
  private_subnets = ["${local.network_prefix}.1.0/24", "${local.network_prefix}.2.0/24"]
  public_subnets  = ["${local.network_prefix}.11.0/24", "${local.network_prefix}.12.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

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

resource "aws_alb_target_group" "nginx" {
  name     = "${local.resource_label}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${module.vpc.vpc_id}"
}

resource "aws_alb_listener" "front_end" {
  load_balancer_arn = "${aws_alb.main.id}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = "${aws_alb_target_group.nginx.id}"
    type             = "forward"
  }
}

resource "aws_security_group" "lb_sg" {
  description = "controls access to the ${local.resource_label} ALB"

  vpc_id = "${module.vpc.vpc_id}"
  name   = "${local.resource_label}"

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
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
  instance_keypair = "${var.key}"
  instance_type = "${var.ecs_instance_type}"
  instance_root_volume_size = "${var.ecs_instance_root_volume_size}"
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
