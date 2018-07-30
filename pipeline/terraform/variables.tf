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

variable "identifier" {
  description = "The name of the RDS instance, if omitted, Terraform will assign a random, unique identifier"
}

variable "allocated_storage" {
  description = "The allocated storage in gigabytes"
}

variable "engine" {
  description = "The database engine to use"
}

variable "engine_version" {
  description = "The engine version to use"
}

variable "instance_class" {
  description = "The instance type of the RDS instance"
}

variable "name" {
  description = "The DB name to create. If omitted, no database is created initially"
  default     = ""
}

variable "username" {
  description = "Username for the master DB user"
}

variable "password" {
  description = "Password for the master DB user. Note that this may show up in logs, and it will be stored in the state file"
}

variable "port" {
  description = "The port on which the DB accepts connections"
}

variable "backup_window" {
  description = "The daily time range (in UTC) during which automated backups are created if they are enabled. Example: '09:46-10:16'. Must not overlap with maintenance_window"
}

variable "maintenance_window" {
  description = "The window to perform maintenance in. Syntax: 'ddd:hh24:mi-ddd:hh24:mi'. Eg: 'Mon:00:00-Mon:03:00'"
}

variable "storage_encrypted" {
  description = "Specifies whether the DB instance is encrypted"
  default     = false
}
