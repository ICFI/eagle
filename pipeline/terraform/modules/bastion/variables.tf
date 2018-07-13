variable "bastion_allowed_ips" {
  description = "CIDR range allowed"
  default = "0.0.0.0/0"
}

variable "create_bastion" {
  description = "true/false if bastion should be provisioned"
  default = false
}

variable "key" {
  description = "ssh key"
}

variable "profile" {
  description = "aws profile"
}

variable "project" {
  description = "project name"
}

variable "region" {
  description = "aws region"
  default = "us-east-2"
}

variable "subnet_id" {
  description = "VPC Subnet ID"
}

variable "vpc_id" {
  description = "VPC ID"
}