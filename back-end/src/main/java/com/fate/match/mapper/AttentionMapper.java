package com.fate.match.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fate.match.model.Attention;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AttentionMapper extends BaseMapper<Attention> {
    void setAutoIncrement();
}
