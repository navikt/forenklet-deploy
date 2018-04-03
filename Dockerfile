FROM docker.adeo.no:5000/pus/node as node-builder
ADD /src/frontend /source
WORKDIR /source
RUN npm ci && npm run build

FROM docker.adeo.no:5000/fo/maven as maven-builder
ADD / /source
WORKDIR /source
COPY --from=node-builder /source/build /source/src/main/webapp
RUN mvn package -DskipTests

FROM docker.adeo.no:5000/bekkci/nais-java-app
COPY --from=maven-builder /source/target/forenklet-deploy /app