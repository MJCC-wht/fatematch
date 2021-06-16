package com.fate.match.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fate.match.mapper.AccessTokenMapper;
import com.fate.match.model.AccessToken;
import com.fate.match.service.AccessTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccessTokenServiceImpl extends ServiceImpl<AccessTokenMapper, AccessToken> implements AccessTokenService {

    @Autowired
    AccessTokenMapper accessTokenMapper;

    @Override
    public AccessToken getByUserId(Integer userId) {
        return accessTokenMapper.getByUserId(userId);
    }
}
