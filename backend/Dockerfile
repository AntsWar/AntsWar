# 1단계: 빌드용 이미지

# Gradle + JDK17이 들어있는 이미지
# 여기서 Spring Boot jar를 빌드함
FROM gradle:9.4.1-jdk21 AS builder

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# Gradle 설정 파일 먼저 복사
# dependency 캐시를 활용하기 위해 먼저 복사함
COPY build.gradle settings.gradle ./

# gradle wrapper 설정 복사
COPY gradle ./gradle

# 의존성 먼저 다운로드 (캐시 레이어용)
# 실패해도 계속 진행하도록 || true 사용
RUN gradle dependencies --no-daemon || true

# 프로젝트 전체 복사
COPY . .

# Spring Boot jar 생성
# build/libs/app.jar 생성됨 (bootJar 설정 필요)
RUN gradle bootJar --no-daemon


# 2단계: 실행용 이미지

# JRE만 있는 가벼운 이미지
# 빌드 도구 없이 실행만 가능
FROM eclipse-temurin:21-jre

# 실행 디렉토리
WORKDIR /app

# 1단계에서 만든 jar 복사
# build.gradle에서 archiveFileName = 'app.jar' 해야 안정적
COPY --from=builder /app/build/libs/app.jar app.jar

# 컨테이너가 사용할 포트
# 실제로 열어주는 건 compose에서 ports 설정
EXPOSE 8080

# 컨테이너 시작 시 실행할 명령
# java -jar app.jar 실행
ENTRYPOINT ["java", "-jar", "app.jar"]