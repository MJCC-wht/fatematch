package com.fate.match.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fate.match.model.AccessToken;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AccessTokenMapper extends BaseMapper<AccessToken> {

    AccessToken getByUserId(@Param("userId") Integer userId);
}
