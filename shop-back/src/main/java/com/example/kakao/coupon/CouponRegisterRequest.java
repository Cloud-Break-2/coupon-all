package com.example.kakao.coupon;

import lombok.Data;

@Data
public class CouponRegisterRequest {
    private Long userId;
    private Long couponId;
}
