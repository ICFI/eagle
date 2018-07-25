variable "bastion_allowed_ips" {
  description = "CIDR range allowed"
  default = "0.0.0.0/0"
}

variable "create_bastion" {
  description = "true/false if bastion should be provisioned"
  default = false
}

variable "certificate_arn" {
  description = "HTTPS certificate ARN from the AWS Certificate Manager service"
}

variable "ecs_instance_type" {
  description = "ec2 instance type used by ecs container hosts"
  default = "t2.large"
}

variable "ecs_instance_root_volume_size" {
  description = "size in GB of the root volume of each ECS container host"
  default = 10
}

variable "ecs_asg_min_size" {
  description = "autocaling group minimum number of instances"
  default = 1
}

variable "ecs_asg_max_size" {
  description = "autoscaling group maximum number of instances"
  default = 1
}

variable "region" {
  description = "aws region"
  default = "us-east-1"
}

variable "profile" {
  description = "aws profile"
}

variable "project" {
  description = "project name"
}

variable "key" {
  description = "ssh key"
}


