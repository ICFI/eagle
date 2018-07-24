resource "aws_efs_file_system" "efs" {
  encrypted = true
  performance_mode = "${var.performance_mode}"
  tags             = "${var.tags}"
}

resource "aws_efs_mount_target" "mount_a" {
  file_system_id = "${aws_efs_file_system.efs.id}"
  subnet_id      = "${var.private_subnet_a}"
  security_groups = [ "${aws_security_group.efs.id}" ]
}

resource "aws_efs_mount_target" "mount_b" {
  file_system_id = "${aws_efs_file_system.efs.id}"
  subnet_id      = "${var.private_subnet_b}"
  security_groups = [ "${aws_security_group.efs.id}" ]
}

resource "aws_security_group" "efs" {
  name        = "efs-sg-${var.name}"
  description = "efs"
  vpc_id      = "${var.vpc_id}"

  lifecycle {
    create_before_destroy = true
  }

  ingress {
    from_port   = "2049" # NFS
    to_port     = "2049"
    protocol    = "tcp"
    cidr_blocks = [ "${var.vpc_cidr}" ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = "${var.tags}"
}