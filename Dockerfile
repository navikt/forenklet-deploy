FROM node as node-builder
ADD /src/frontend /source
WORKDIR /source
RUN npm ci && npm run build

FROM maven as maven-builder
ADD / /source
WORKDIR /source
COPY --from=node-builder /source/build /source/src/main/resources/static
RUN mvn package -DskipTests

FROM navikt/java:8
COPY --from=maven-builder /source/target/forenklet-deploy.jar app.jar
EXPOSE 8800