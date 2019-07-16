FROM navikt/java:8
COPY target/forenklet-deploy.jar app.jar
EXPOSE 8800