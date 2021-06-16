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
@TableName("post")
public class Post {

    // 动态ID
    @TableId(value = "post_id", type = IdType.AUTO)
    private Integer postId;
    // 发表用户ID
    private Integer userId;
    // 封面图片URL
    private String cover;
    // 标题
    private String title;
    // 正文
    private String content;
    // 浏览量
    private Integer viewCount;
    // 回复量
    private Integer replyCount;
    // 点赞数
    private Integer goodCount;
    // 点踩数
    private Integer badCount;
    // 创建日期
    @JsonFormat(pattern = "yy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createDate;
    // 更新日期
    @JsonFormat(pattern = "yy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateDate;
    // 是否私密
    private Boolean isPrivate;
    // 是否仅关注自己可见
    private Boolean isAttention;
    // 是否公开
    private Boolean isPublic;
}
