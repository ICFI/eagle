
### Setup

* [Create an EC2 SSH keypair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)
* Initialize the terraform project and set up multiple environments
  * `cd pipeline/terraform`
  * `terraform init`
  * `terraform workspace new prod`
  * `terraform workspace new stage`
* Configure the project settings
  * [Create an AWS CLI named profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html)
  * [Create an MFA enabled cli profile](https://aws.amazon.com/premiumsupport/knowledge-center/authenticate-mfa-cli/)
  * Copy, update and source the example environment variables file
  * `cp env.sh.example env.sh`
  * edit file
  * `source env.sh`
* Build stage environment infrastructure
  * `terraform apply`

### Result

At the end of the deployment the following resources will have been provisioned.

* VPC with two public and two private subnets
* An optional bastion host which allows for console access to resources in private subnets
* An ECS cluster provisioned within the private subnet
* An Nginx container
* An application load balancer

EC2 -> Load Balancers link in the left-hand menu -> Select the ALB and copy the DNS hostname to access Nginx

![architecture](diagrams/architecture.png)