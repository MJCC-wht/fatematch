package com.fate.match.model;

import lombok.Data;

@Data
public class Game {

    // ID
    private Integer id;
    // 用户ID
    private Integer userId;
    // 英雄联盟
    private Boolean lol;
    // 绝地求生
    private Boolean pubg;
    // 穿越火线
    private Boolean cf;
    // CSGO
    private Boolean csgo;
    // DOTA2
    private Boolean dota2;
    // 地下城与勇士
    private Boolean dnf;
    // 守望先锋
    private Boolean overwatch;
    // 炉石传说
    private Boolean heartstone;
    // 王者荣耀
    private Boolean honorOfKings;
    // 和平精英
    private Boolean peaceElite;
    // 实况足球
    private Boolean proEvSoccer;
    // 第五人格
    private Boolean identityV;
    // 原神
    private Boolean genshin;
    // 中国象棋
    private Boolean chineseChess;
    // 国际象棋
    private Boolean chess;
    // 军棋
    private Boolean armyChess;
    // 五子棋
    private Boolean gobang;
    // 围棋
    private Boolean go;
    // 飞行棋
    private Boolean ludo;
    // 扑克牌
    private Boolean card;
    // 麻将
    private Boolean mahjong;
    // 三国杀
    private Boolean lottk;
    // 狼人杀
    private Boolean wolfHuman;

}
