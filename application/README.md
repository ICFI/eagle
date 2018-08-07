## How to Use:

### To build, scan, and test app
* `./gradlew clean build`

### To run app with embedded tomcat (preferred)
* `./gradlew clean bootRun`
* Navigate to application within browser at http://localhost:8080
* Verify REST endpoint by `curl -u user:<password> http://localhost:8080/movie`.  Password is generated during spring boot startup within console.

### To run app inside Docker container locally.
* Install docker on local machine
* `docker-compose up --build`
