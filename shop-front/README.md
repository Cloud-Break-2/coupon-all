# 수정 사항
- default.conf
- Dockerfile

# 소스코드 빌드
빌드되면, build 폴더 생성됨.
```
npm install
npm run build
```

# 도커컴포즈 실행 및 확인
도커 내부에 들어가서 확인하기
```
> docker compose up -d --build
> docker exec -it shop-front /bin/sh
> curl http://shop-back:8080/products?page=0 
> curl http://coupon-api:8080/hello
```

--------기타 참고


# 컨테이너 이미지 빌드
docker buildx create --use --name mynewbuilder
docker buildx use mybuilder
docker buildx inspect --bootstrap
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

docker buildx build --platform linux/amd64,linux/arm64 -t cloudbreak6th/shop-front:latest --push .

-----------------
작업 해야하는 것
ㅁ nginx 자체 웹페이지 형태로 할수 있도록 하기 
