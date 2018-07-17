# Eagle project

## Details
React frontend with Spring Boot backend application running within a Docker container "microservice"

## To Use:

### Run app outside of Docker with embedded tomcat (preferred)
* ./gradlew clean bootRun 

### Run app inside of a Docker container locally.
* ./gradlew clean build docker
* docker run -p 8080:8080 eagle-img

### Access Webpage
Navigate to application within browser at http://localhost:8080

### Access REST Endpoint
After starting the app, a temp password will be generated to secure REST endpoint.  The password is output in the console when the application starts.  Use this password to access endpoint like so.

curl -u user:<password> http://localhost:8080/movie

### Documentation
AsciiDoc easily generates lightweight documentation to describe all critical aspects of the project.  Asciidoc generate and serve documentation with the following commands.
* Build documentation - run './gradlew asciidoctor'
* View documentation - go to the '/eagle/build/asciidoc/html5/index.html' file within a web browser

