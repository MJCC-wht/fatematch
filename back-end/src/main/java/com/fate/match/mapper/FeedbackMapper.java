package com.fate.match.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fate.match.model.Feedback;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FeedbackMapper extends BaseMapper<Feedback> {

    void setAutoIncrement();
}
