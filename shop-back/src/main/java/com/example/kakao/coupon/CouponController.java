package com.example.kakao.coupon;

import com.example.kakao._core.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/coupon")
public class CouponController {

    private final RestTemplate client;
    private final String COUPON_BACKEND_URL = "http://127.0.0.1:8080";

    @PostMapping("/v1")
    public ResponseEntity<?> registerCouponV1(@RequestBody CouponRegisterRequest request, @AuthenticationPrincipal CustomUserDetails userDetails) {
        request.setUserId((long) userDetails.getUser().getId());
        log.info("request[{}]", request);

        return ResponseEntity.ok(client.postForObject(COUPON_BACKEND_URL + "/v1/issue", request, Map.class));
    }

    @PostMapping("/v2")
    public ResponseEntity<?> registerCouponV2(@RequestBody CouponRegisterRequest request) {
        log.info("request[{}]", request);

        return ResponseEntity.ok(client.postForObject(COUPON_BACKEND_URL + "/v2/issue", request, Map.class));
    }
}
