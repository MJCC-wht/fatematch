package com.fate.match.filter;

import com.fate.match.bean.Result;
import com.fate.match.config.JwtConfig;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtFilter implements HandlerInterceptor {

    @Autowired
    private JwtConfig jwtConfig;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 如果是OPTIONS请求，返回SC_NO_CONTENT并放行
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            return true;
        }

        // 获取JWT的header部分
        String authHeader = request.getHeader(jwtConfig.getHeader());
        // 验证JWT的token，如果无效，进行拦截
        if (authHeader == null || !authHeader.startsWith(jwtConfig.getTokenHead())) {
            Result.error(response,202,"无效Token");
            return false;
        }

        // 获取JWT的token head长度
        String authToken = authHeader.substring(jwtConfig.getTokenHead().length());
        if (!jwtTokenUtil.validateToken(authToken)) {
            Result.error(response,202,"不合法或已过期");
            return false;
        }

        // 如果都通过，放行
        request.setAttribute("authToken", authToken);
        return true;
    }
}
