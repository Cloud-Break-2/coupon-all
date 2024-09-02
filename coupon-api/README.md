1.application-docker.yml 확인
2. 도커파일 확인
3. 도커 컴포즈 실행 및 동작 확인
4. 이미지 빌드 및 푸시
---------------------------
# 수정 사항
- mysql, redis 주소 변경 coupon-XXX/src/main/resources/application-docker.yml 수정: 

# 소스코드 빌드 
- mysql, redis 먼저 실행 및 연결이 되어야 빌드가 가능하다.
- test task를 제외하고 빌드한다. 
```
./gradlew build -x test
```

- coupon-api(main) jar 파일 생성 확인 
```
cd ./build/libs
./coupon-api/build/libs/coupon-api.jar
```

# 도커컴포즈 실행 및 확인
- 도커 컨테이너 실행
```
docker-compose up -d
```

방법1. curl <url>:8080/hello ✅ 
방법2. 도커 내부로 들어가서 디비, 레디스 잘 있는지 확인 ✅
- 도커 내부로 들어가기 
```
> docker exec -it coupon-api /bin/bash
```

- mysql 확인 :
```
> mysql -h coupon-mysql -P 3306 -u abcd -p
> show databases;
> use coupon;
> show tables;
> select * from coupon_issues;
> select * from coupons;
```

- redis 확인 :
```
> redis-cli -h coupon-redis -p 6379 
> ping
PONG 
```

방법3. 포스트맨으로 post 보내보기 ✅


# 컨테이너 이미지 빌드
docker buildx create --use --name mynewbuilder
docker buildx use mybuilder
docker buildx inspect --bootstrap
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

docker buildx build --platform linux/amd64,linux/arm64 -t cloudbreak6th/coupon-api:v1.1 --push .

-- ec2 확인 후에 latest로 변경하기 
docker buildx build --platform linux/amd64,linux/arm64 -t cloudbreak6th/coupon-api:latest --push .

