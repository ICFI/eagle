resource "aws_instance" "bastion" {
  ami           = "${data.aws_ami.ec2-linux.id}"
  associate_public_ip_address = true
  count = "${var.create_bastion ? 1 : 0}"
  instance_type = "t2.nano"
  key_name = "${var.key}"
  tags {
    Name = "bastion-${var.project}-${terraform.workspace}"
  }
  subnet_id = "${var.subnet_id}"
  vpc_security_group_ids = [ "${aws_security_group.bastion-sg.id}" ]
  user_data = <<EOF
#!/usr/bin/env bash
sed -i 's/#Port 22/Port 22\nPort 443\n/g' /etc/ssh/sshd_config
service sshd restart
yum -y install mysql
EOF
}

data "aws_ami" "ec2-linux" {
  most_recent = true
  filter {
    name = "name"
    values = ["amzn-ami-*-x86_64-gp2"]
  }
  filter {
    name = "virtualization-type"
    values = ["hvm"]
  }
  filter {
    name = "owner-alias"
    values = ["amazon"]
  }
}

resource "aws_security_group" "bastion-sg" {
  name   = "bastion-security-group"
  vpc_id = "${var.vpc_id}"

  ingress {
    protocol    = "tcp"
    from_port   = 22
    to_port     = 22
    cidr_blocks = ["${var.bastion_allowed_ips}"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 443
    to_port     = 443
    cidr_blocks = ["${var.bastion_allowed_ips}"]
  }

  ingress {
    protocol    = "tcp"
    from_port   = 3306
    to_port     = 3306
    cidr_blocks = ["${var.bastion_allowed_ips}"]
  }

  egress {
    protocol    = -1
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
