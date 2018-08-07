variable "performance_mode" {
  description  = "The file system performance mode."
  default      = "generalPurpose"
}

variable "private_subnet_a" {
  description  = "The ID of first private subnet"
}

variable "private_subnet_b" {
  description  = "The ID of second private subnet"
}

variable "name" {
  description = "Name to use when labeling resources"
  default = ""
}

variable "tags" {
  description  = "A mapping of tags."
  type = "map"
  default = {}
}

variable "vpc_cidr" {
  description = "vpc cidr range to allow traffic"
}

variable "vpc_id" {
  description = "vpc id to use with security group"
}

