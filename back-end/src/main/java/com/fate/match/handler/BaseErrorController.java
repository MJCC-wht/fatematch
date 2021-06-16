package com.fate.match.handler;

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 定义全局系统错误异常处理
 */
@Component
public class BaseErrorController extends BasicErrorController{

    public BaseErrorController(ServerProperties serverProperties) {
        super(new DefaultErrorAttributes(), serverProperties.getError());
    }

    /**
     * 覆盖默认的json响应，输入json格式的错误信息
     * code : 错误码
     * description : 错误信息
     * @param request: 网页请求
     * @return
     */
    @Override
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        // 获取错误信息
        Map<String, Object> body = this.getErrorAttributes(request,
                this.getErrorAttributeOptions(request, MediaType.ALL));
        HttpStatus status = this.getStatus(request);
        // 输入自定义的json格式
        Map<String, Object> map = new HashMap<>();
        // 错误代码
        map.put("code",status.value());
        // 错误信息描述
        map.put("description",body.get("message"));
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        // 在header中添加application/json的内容协商
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<Map<String, Object>>(map, headers, HttpStatus.OK);
    }
}
