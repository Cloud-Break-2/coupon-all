1.application-docker.yml 확인
2. 도커파일 확인
3. 도커 컴포즈 실행 및 동작 확인
4. 이미지 빌드 및 푸시
---------------------------
# 수정 사항
- mysql 주소 변경 ./shop-back/src/main/resources/application-docker.yml 수정 
- dockerfile 수정

# 소스코드 빌드
- mysql 먼저 실행 및 연결이 되어야 빌드가 가능하다.
```
./gradlew build -x test
```

- KakaoApplication(main) jar 파일 생성 확인
```
cd ./build/libs
java -jar -Dspring.profiles.active=docker kakao-1.0.jar
./build/libs/coupon-api.jar
```

# 도커컴포즈 실행 및 확인
- 도커 컨테이너 실행
```
docker compose up -d --build
```

도커 내부로 들어가서 디비 통신 확인
- 도커 내부로 들어가기
```
> docker exec -it shop-back /bin/bash
> curl http://shop-back:8080/products?page=0
```
- mysql 확인 :
```
> mysql -h coupon-mysql -P 3306 -u abcd -p
> 1234
> show databases;
> use coupon;
> show tables;
> show tables;
> select * from coupon_issues;
> select * from coupons;
```

# 컨테이너 이미지 빌드
docker buildx create --use --name mynewbuilder
docker buildx use mybuilder
docker buildx inspect --bootstrap
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

docker buildx build --platform linux/amd64,linux/arm64 -t cloudbreak6th/shop-front:latest --push .

