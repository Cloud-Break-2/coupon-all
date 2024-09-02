package com.example.couponcore.service;

import com.example.couponcore.model.Coupon;
import com.example.couponcore.model.CouponType;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.IntStream;

class AsyncCouponIssueServiceV2Test {

    @Test
    void testFirstComeFirstServedCouponIssue() {
        Coupon coupon = Coupon.builder()
                .couponType(CouponType.FIRST_COME_FIRST_SERVED)
                .title("선착순 테스트 쿠폰")
                .totalQuantity(new AtomicInteger(10))  // AtomicInteger로 수정
                .issuedQuantity(new AtomicInteger(0))  // AtomicInteger로 수정
                .dateIssueStart(LocalDateTime.now().minusDays(1))
                .dateIssueEnd(LocalDateTime.now().plusDays(1))
                .build();

        IntStream.range(0, coupon.getTotalQuantity().get())  // .get()을 사용하여 int 값 가져오기
                .forEach(idx -> {
                    // 발급 로직 처리
                });
    }

    @Test
    void testFirstComeFirstServedCouponIssueWithFutureDate() {
        Coupon coupon = Coupon.builder()
                .couponType(CouponType.FIRST_COME_FIRST_SERVED)
                .title("선착순 테스트 쿠폰")
                .totalQuantity(new AtomicInteger(10))  // AtomicInteger로 수정
                .issuedQuantity(new AtomicInteger(0))  // AtomicInteger로 수정
                .dateIssueStart(LocalDateTime.now().plusDays(1))
                .dateIssueEnd(LocalDateTime.now().plusDays(2))
                .build();

        // 테스트 로직
    }

    @Test
    void testAnotherFirstComeFirstServedCouponIssue() {
        Coupon coupon = Coupon.builder()
                .couponType(CouponType.FIRST_COME_FIRST_SERVED)
                .title("선착순 테스트 쿠폰")
                .totalQuantity(new AtomicInteger(10))  // AtomicInteger로 수정
                .issuedQuantity(new AtomicInteger(0))  // AtomicInteger로 수정
                .dateIssueStart(LocalDateTime.now().minusDays(1))
                .dateIssueEnd(LocalDateTime.now().plusDays(2))
                .build();

        // 테스트 로직
    }

    // 추가적인 테스트 메서드들...
}
