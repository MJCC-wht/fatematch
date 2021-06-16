package com.fate.match.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("access_token")
public class AccessToken {

    // 主键ID
    @TableId(value = "access_token_id", type = IdType.AUTO)
    private Integer accessTokenId;
    // token
    private String token;
    // userId
    private Integer userId;
    // 创建日期
    @JsonFormat(pattern = "yy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createDate;

}
