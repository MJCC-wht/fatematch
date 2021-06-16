package com.fate.match.exception;

import lombok.Data;

/**
 * 自定义异常信息
 */
@Data
public class ApiException extends RuntimeException{

    // 错误码
    private int code;
    // 错误信息
    private String message;

    public ApiException(String message) {
        this.code = 201;
        this.message = message;
    }

    public ApiException(int code, String message) {
        this.code = code;
        this.message = message;
    }
}



