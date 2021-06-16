package com.fate.match.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fate.match.model.AccessToken;

public interface AccessTokenService extends IService<AccessToken> {

    AccessToken getByUserId(Integer userId);
}
