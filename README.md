# Eagle project

## Project Overview
React frontend with Spring Boot backend application running within a Docker container "microservice".

[System Documentation](https://github.com/ICFI/eagle/blob/master/documentation/pdf/index.pdf)

## How to Use:

### To build, scan, and test app
* `./gradlew clean build`

### To run app with embedded tomcat (preferred)
* `./gradlew clean bootRun`
* Navigate to application within browser at http://localhost:8080
* Verify REST endpoint by `curl -u user:<password> http://localhost:8080/movie`.  Password is generated during spring boot startup within console.

### To run app inside Docker container locally.
* Install docker on local machine
* `./gradlew clean build docker`
* `docker run -p 8080:8080 eagle-img`

### To build and run app within AWS environment (stage/prod)
* TODO - Add Terraform commands
