FROM eclipse-temurin:25-jdk-resolute AS builder
WORKDIR /build

COPY gradlew build.gradle settings.gradle ./
COPY gradle gradle
RUN ./gradlew dependencies

COPY src src
RUN ./gradlew bootJar

FROM eclipse-temurin:25-jre-resolute
WORKDIR /app

COPY --from=builder /build/build/libs/polikut-0.0.1-SNAPSHOT.jar polikut.jar

RUN groupadd --gid 1001 appgroup && \
    useradd --uid 1001 --gid appgroup --shell /bin/bash --create-home appuser && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "polikut.jar"]
