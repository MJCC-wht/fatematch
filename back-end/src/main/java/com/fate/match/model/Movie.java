package com.fate.match.model;

import lombok.Data;

@Data
public class Movie {

    // ID
    private Integer id;
    // 用户ID
    private Integer userId;
    // 喜剧
    private Boolean comedy;
    // 爱情剧
    private Boolean love;
    // 动作片
    private Boolean action;
    // 犯罪片
    private Boolean crime;
    // 惊悚片
    private Boolean horror;
    // 恐怖片
    private Boolean terror;
    // 悬疑片
    private Boolean suspense;
    // 动画片
    private Boolean animation;
    // 魔幻片
    private Boolean fantasy;
    // 科幻片
    private Boolean science;
    // 战争片
    private Boolean war;
    // 青春派
    private Boolean youth;

}
