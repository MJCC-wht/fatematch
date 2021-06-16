package com.fate.match.bean;

import com.fate.match.util.JsonUtil;
import lombok.Data;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 封装成json对象，所有的返回结果都使用Result
 */
@Data
public class Result {

    // 状态码
    private int code;
    // 描述信息
    private String description;
    // 用户的token
    private String token;
    // 成功时返回的对象
    private Object detail;

    /**
     * 访问成功，返回对象
     * @param detail：返回的对象带有的数据
     * @return
     */
    public static Result success(Object detail, String token) {
        Result result = new Result();
        result.setCode(200);
        result.setDescription("success");
        result.setToken(token);
        result.setDetail(detail);
        return result;
    }
    /**
     * 访问成功，但是不返回对象
     */
    public static Result success(String token) {
        return success(null, token);
    }

    public static void error(HttpServletResponse response, int code, String description) throws IOException {
        Result result = new Result();
        result.setCode(code);
        result.setDescription(description);
        result.setDetail(null);
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(JsonUtil.objectToJson(result));
    }

    /**
     * 访问失败，返回自定义错误码和错误信息
     * @param code：错误码
     * @param description：错误信息
     * @return
     */
    public static Result error(int code, String description) {
        Result result = new Result();
        result.setCode(code);
        result.setDescription(description);
        result.setDetail(null);
        return result;
    }

    /**
     * 访问失败，返回201错误码和自定义错误信息
     * @param description：错误信息
     * @return
     */
    public static Result error(String description) {
        return error(201, description);
    }

    /**
     * 访问失败，返回201错误码，不含任何信息
     * @return
     */
    public static Result error() {
        return error(null);
    }

}
