package com.fate.match.model;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")
public class User {

    @TableField(exist = false)
    private Integer minAge;
    @TableField(exist = false)
    private Integer maxAge;
//    @TableField(exist = false)
//    private String token;

    // 用户Id
    @TableId(value = "user_id", type = IdType.AUTO)
    private Integer userId;
    // 用户账号
    private String account;
    // 用户密码
    private String password;
    // 用户昵称
    private String nickname;
    // 出生日期
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date birthday;
    // 用户年龄
    private Integer age;
    // 用户性别
    private String sex;
    // 用户QQ
    private String qq;
    // 用户微信
    private String wx;
    // 用户邮箱
    private String email;
    // 用户头像地址
    private String avatar;
    // 用户地区
    private String region;
    // 用户手机号码
    private String phoneNumber;
    // 用户等级
    private Integer level;
    // 用户职业
    private String vocation;
    // 用户兴趣（用于匹配）
    private String interests;
    // 用户兴趣（自定义）
    private String detailInterests;
    // 用户性格（用于匹配）
    private String characters;
    // 用户性格（自定义）
    private String detailCharacters;
    // 用户签名
    private String signature;
    // 用户是否被阻挡
    private Boolean isBlock;
    // 用户是否是管理员
    private Boolean isManager;
    // 用户创建日期
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateDate;

}
