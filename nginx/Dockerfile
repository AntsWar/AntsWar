# 1단계: frontend 빌드

FROM node:25.1-slim AS frontend-builder

# 작업 디렉토리
WORKDIR /app

# frontend의 package 설정만 먼저 복사
# npm install 캐시 활용 목적
COPY ./frontend/package*.json ./
RUN npm ci

COPY ./frontend ./
RUN npm run build

# 2단계: nginx 실행 이미지
FROM nginx:stable-alpine

# 1단계에서 만든 프론트 build 결과물(dist)을 nginx 정적 파일 기본 경로로 복사
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# nginx가 사용할 포트
EXPOSE 80
EXPOSE 443

# 컨테이너 시작 시 nginx 실행
CMD ["nginx", "-g", "daemon off;"]