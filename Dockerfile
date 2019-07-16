FROM navikt/java:8
COPY build /source/src/main/resources/static
COPY target/forenklet-deploy.jar app.jar
EXPOSE 8800