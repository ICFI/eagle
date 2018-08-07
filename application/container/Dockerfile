FROM openjdk:8-jdk as build_stage

RUN apt-get update
RUN apt-get install -y --no-install-recommends gcc make libpng-dev

WORKDIR /app

# download gradle in a cached layer to save rebuild time
COPY ./gradlew ./
COPY ./gradle ./gradle
RUN ./gradlew

# get dependencies in a cached layer to save rebuild time
COPY ./build.gradle ./
COPY ./settings.gradle ./
RUN ./gradlew downloadDependencies -Dorg.gradle.daemon=false

# npm install in a cached layer to save rebuild time
# TODO: copy in package-lock.json, too
COPY ./package.json ./
COPY ./webpack.config.js ./
RUN ./gradlew clean npmInstall -Dorg.gradle.daemon=false

# RUN ./gradlew sonarqube -Dorg.gradle.daemon=false

# build in the final layer, since that one is likely to have the most changes
COPY ./src ./src
# can't run `build bootJar` together, as bundle.js goes missing
RUN ./gradlew build -Dorg.gradle.daemon=false
RUN ./gradlew bootJar -Dorg.gradle.daemon=false

LABEL test=true

FROM openjdk:8-jdk-alpine

VOLUME /tmp

EXPOSE 8080

COPY --from=build_stage /app/build/libs/app.jar /app.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
