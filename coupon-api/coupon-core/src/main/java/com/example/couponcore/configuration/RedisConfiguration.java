package com.example.couponcore.configuration;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class RedisConfiguration {
  private static final Logger logger = LoggerFactory.getLogger(RedisConfiguration.class); // log 추가

// ISSUE: Redis configuraion Error (host, port)
//  @Value("${spring.data.redis.host}")
  private String host="coupon-redis";

//  @Value("${spring.data.redis.port}")
  private int port=6379;

  @Bean
  RedissonClient redissonClient() {
    Config config = new Config();
    String address = "redis://" + host + ":" + port;
    logger.info("Connecting to Redis at {}", address); // log 추가
    config.useSingleServer().setAddress(address);
    return Redisson.create(config);
  }
}
