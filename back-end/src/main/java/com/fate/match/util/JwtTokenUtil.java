package com.fate.match.util;

import com.fate.match.config.JwtConfig;
import com.fate.match.exception.ApiAssert;
import com.fate.match.model.AccessToken;
import com.fate.match.model.User;
import com.fate.match.service.AccessTokenService;
import com.fate.match.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil {

    // 该JWT所面向的用户
    private static final String CLAIM_KEY_USERNAME = "sub";
    // 该JWT所创建的时间
    private static final String CLAIM_KEY_CREATED = "created";

    @Autowired
    private JwtConfig jwtConfig;
    @Autowired
    private UserService userService;
    @Autowired
    private AccessTokenService accessTokenService;

    //生成到期时间
    private Date generateExpirationDate(){
        // *1000表示转换为ms
        return new Date(System.currentTimeMillis() + jwtConfig.getExpiration() * 1000);
    }

    //生成Token
    private String generateToken(Map<String, Object> claims){
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(generateExpirationDate())
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret())
                .compact();
    }

    //添加自定义属性并生成Token
    public String generateToken(String userAccount){
        Map<String,Object> claims = new HashMap<>();
        claims.put(CLAIM_KEY_USERNAME, userAccount);
        claims.put(CLAIM_KEY_CREATED, new Date());
        return generateToken(claims);
    }

    //解码
    private Claims getClaimsFromToken(String token){
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtConfig.getSecret())
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            Date now = new Date();
            Date expiration = e.getClaims().getExpiration();
            String userAccount = e.getClaims().getSubject();
            // 如果现在的时间减去过期的时间大于允许过期的时间，则需要重新登录，否则自动刷新得到新的token
            if (now.getTime() - expiration.getTime() > jwtConfig.getAllow_exp() * 1000) {
                return null;
            } else {
                String newToken = refreshToken(userAccount);
                claims = getClaimsFromToken(newToken);
            }
        }
        return claims;
    }

    //
    public String refreshToken(String userAccount) {
        User user = userService.getByUserAccount(userAccount);
        String newToken = generateToken(userAccount);
        AccessToken accessToken = accessTokenService.getByUserId(user.getUserId());
        if (accessToken == null) {
            accessToken = new AccessToken();
            accessToken.setUserId(user.getUserId());
            accessToken.setCreateDate(new Date());
            accessToken.setToken(newToken);
            accessTokenService.save(accessToken);
        } else {
            accessToken.setCreateDate(new Date());
            accessToken.setToken(newToken);
            accessTokenService.updateById(accessToken);
        }
        return newToken;
    }


    //获取该JWT所面向的用户
    public String getUserAccountFromToken(String token){
        String userAccount = null;
        try {
            Claims claims = getClaimsFromToken(token);
            userAccount = claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userAccount;
    }

    //获取该JWT所创建的时间
    // private Date getCreatedDateFromToken(String token){
    //     Date created = null;
    //     try {
    //         Claims claims = getClaimsFromToken(token);
    //         created = new Date((Long) claims.get(CLAIM_KEY_CREATED));
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    //     return created;
    // }

    // 验证token
    public boolean validateToken(String token){
        Claims claims = getClaimsFromToken(token);
        return claims != null;
    }

    // 通过request中的token更新token，需要比较account
    public String getNewToken(HttpServletRequest request, String message, String userAccount) {
        String authHeader = request.getHeader(jwtConfig.getHeader());
        String token = null;
        if (authHeader != null) {
            String authToken = authHeader.substring(jwtConfig.getTokenHead().length());
            String account_client = getUserAccountFromToken(authToken);
            ApiAssert.isTrue(account_client.equals(userAccount), message);
            User user_client = userService.getByUserAccount(account_client);
            AccessToken accessToken = accessTokenService.getByUserId(user_client.getUserId());
            token = accessToken.getToken();
        }
        return token;
    }

    // 通过request中的token更新token，不需要比较account
    public String getNewToken(HttpServletRequest request) {
        String authHeader = request.getHeader(jwtConfig.getHeader());
        String token = null;
        if (authHeader != null) {
            String authToken = authHeader.substring(jwtConfig.getTokenHead().length());
            String account_client = getUserAccountFromToken(authToken);
            User user_client = userService.getByUserAccount(account_client);
            AccessToken accessToken = accessTokenService.getByUserId(user_client.getUserId());
            token = accessToken.getToken();
        }
        return token;
    }
}
