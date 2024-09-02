package com.example.couponapi;

import com.example.couponcore.model.Coupon;
import com.example.couponcore.model.CouponType;
import com.example.couponcore.repository.mysql.CouponJpaRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CouponIssuer {

    private final CouponJpaRepository couponJpaRepository;

    @PostConstruct
    public void init() {
        log.info("===== 쿠폰 생성 시작 =====");
        final Coupon coupon = new Coupon();
        coupon.setTitle("선착순 쿠폰");
        coupon.setCouponType(CouponType.FIRST_COME_FIRST_SERVED);
        coupon.setTotalQuantity(new AtomicInteger(300));   // 총 쿠폰
        coupon.setIssuedQuantity(new AtomicInteger(0));    // 발급된 쿠폰
        coupon.setDiscountAmount(3000);                                // 할인 금액
        coupon.setMinAvailableAmount(50000);                           // 5만원 이상 사용시 할인 가능

        final LocalDateTime now = LocalDateTime.now();
        coupon.setDateIssueStart(now);
        coupon.setDateIssueEnd(now.plusDays(7)); // 7일후까지 사용 가능

        couponJpaRepository.save(coupon);
        log.info("===== 쿠폰 생성 종료=====");
    }
}
