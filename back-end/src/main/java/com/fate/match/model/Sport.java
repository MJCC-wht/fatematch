package com.fate.match.model;

import lombok.Data;

@Data
public class Sport {

    // ID
    private Integer id;
    // 用户ID
    private Integer userId;
    // 足球
    private Boolean soccer;
    // 篮球
    private Boolean basketball;
    // 排球
    private Boolean volleyball;
    // 乒乓
    private Boolean pingPong;
    // 台球
    private Boolean tableTennis;
    // 网球
    private Boolean tennis;
    // 跑步
    private Boolean run;
    // 骑行
    private Boolean cycling;
    // 攀爬
    private Boolean climb;
    // 游泳
    private Boolean swim;

}
