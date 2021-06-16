package com.fate.match.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtConfig {

    // JWT的头部
    private String header;
    // JWT的secret部分
    private String secret;
    // JWT的持续时间
    private long expiration;
    // JWT的最长保持时间
    private long allow_exp;
    // JWT的名义头部
    private String tokenHead;
}
