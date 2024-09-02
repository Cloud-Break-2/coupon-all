FROM --platform=$BUILDPLATFORM gradle:8-jdk17 AS build
WORKDIR /home/gradle
COPY . /home/gradle
RUN ./gradlew build -x test

FROM eclipse-temurin:17-jre
WORKDIR /app
RUN apt-get update && apt-get install -y mysql-client
COPY --from=build /home/gradle/build/libs/kakao-1.0.jar /app/kakao-1.0.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=docker", "/app/kakao-1.0.jar"]
EXPOSE 8080
