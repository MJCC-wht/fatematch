package com.fate.match.model;

import lombok.Data;

@Data
public class Music {

    // ID
    private Integer id;
    // 用户ID
    private Integer userId;
    // 古典
    private Boolean classical;
    // 民谣
    private Boolean folk;
    // 流行
    private Boolean pop;
    // 金属
    private Boolean metal;
    // 朋克
    private Boolean punk;
    // 蓝调
    private Boolean blue;
    // 纯音乐
    private Boolean pure;
    // 说唱
    private Boolean rap;
    // 乡村
    private Boolean country;
    // 电音
    private Boolean electronic;

}
