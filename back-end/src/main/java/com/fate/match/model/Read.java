package com.fate.match.model;

import lombok.Data;

@Data
public class Read {

    // ID
    private Integer id;
    // 用户ID
    private Integer userId;
    // 文艺
    private Boolean literary;
    // 哲学
    private Boolean philosophy;
    // 历史
    private Boolean history;
    // 武侠
    private Boolean martial;
    // 玄幻
    private Boolean fantasy;
    // 推理
    private Boolean inference;
    // 科幻
    private Boolean science;
    // 爱情
    private Boolean romance;
    // 恐怖
    private Boolean terror;

}
