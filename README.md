# Eagle project

## Details
React frontend with Spring Boot backend application running within a Docker container "microservice"

## To Use:

## Outside of Docker with embedded tomcat (preferred)
./gradlew clean bootRun 

## Inside of a Docker container locally.

./gradlew clean build docker
docker run -p 8080:8080 eagle-img
