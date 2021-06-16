package com.fate.match.model;

import lombok.Data;

@Data
public class Recreation {

    // ID
    private Integer id;
    // 用户ID
    private Integer userId;
    // 戏曲
    private Boolean drama;
    // 小品
    private Boolean sketch;
    // 相声
    private Boolean crosstalk;
    // 脱口秀
    private Boolean talkShow;
    // 综艺
    private Boolean varietyShow;
    // 真人秀
    private Boolean realityShow;

}
