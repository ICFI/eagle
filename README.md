# Eagle Project

The Eagle project is a single page application (SPA) built with ReactJS and Java running within an AWS cloud environment.  The application utilizes server-side rendering (SSR) technologies to first render the HTML on the server before serving to the client.  A "SPA + SSR" application is often called an ***isomorphic application***.  The application infrastructure is built with cloud agnostic Terraform modules and scripts.

This combination of web techniques can take advantage of both SPA and SSR benefits.  Server-side rendering can improve application performance during degraded web conditions.  Other benefits include improved user experiences and accessibility, along with increased search engine optimization.  Additionally, utilizing single page application technologies to render only dynamic components on the client-side after the initial rendering can give a top-notch user experience with advanced web application designs.

| Technical Highlights  |
| ------------- |
| Spring Boot application framework |
| ReactJS SPA/SSR UI framework |
| Gradle boostrap tooling and plugins|
| Terraform modules and scripting |
| Functional testing (Cucumber) framework |
| CD/CI pipeline using Jenkins/Docker/Gradle|
| AWS ECR (microservice cloud containers) configuration|
| NodeJS, NPM, and Webpack usage within Gradle |
| AuthO SSO secure integration within ReactUI|
| REST API integration within ReactUI |
| React Bootstrap integration within ReactUI |

## Application
To run the application go to the Application [README](application/README.md)


## Infrastructure
To use scripts go to the Infrastructure [README](infrastructure/README.md)

## Functional Test
To use tests go to the Functional Test [README](functional_test/README.md)
