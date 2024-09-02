dependencies {
    implementation(project(":coupon-core"))
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

//build.gradle 파일에서 테스트 작업을 비활성화
tasks.withType<Test> {
    enabled = false
}
