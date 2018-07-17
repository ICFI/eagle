output "public_ip" {
  description = "Public IP of bastion"
  value       = ["${aws_instance.bastion.*.public_ip}"]
}