package com.fate.match.filter;

import com.fate.match.bean.Result;
import com.fate.match.config.JwtConfig;
import com.fate.match.model.User;
import com.fate.match.service.UserService;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class UserFilter implements HandlerInterceptor {

    @Autowired
    private JwtConfig jwtConfig;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 拿到登录用户
        String authHeader = request.getHeader(jwtConfig.getHeader());
        if (authHeader == null) {
            return false;
        } else {
            String authToken = authHeader.substring(jwtConfig.getTokenHead().length());
            String account_client = jwtTokenUtil.getUserAccountFromToken(authToken);
            User user = userService.getByUserAccount(account_client);
            if (user.getIsBlock()) {
                Result.error(201,"你的账号已被封禁");
                return false;
            }
        }
        return true;
    }
}
