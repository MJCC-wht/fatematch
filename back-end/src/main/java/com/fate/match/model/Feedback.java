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
@TableName("feedback")
public class Feedback {

    // 主键ID
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    // 举报人ID
    private Integer userClientId;
    // 被举报人ID
    private Integer userServerId;
    // 举报理由
    private String reason;
    // 举报结果
    private Boolean result;
    // 是否被审核
    private Boolean isCheck;
    // 创建时间
    @JsonFormat(pattern = "yy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createDate;
}
