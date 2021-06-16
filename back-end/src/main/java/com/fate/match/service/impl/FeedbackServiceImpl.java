package com.fate.match.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fate.match.mapper.FeedbackMapper;
import com.fate.match.model.Feedback;
import com.fate.match.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackServiceImpl extends ServiceImpl<FeedbackMapper, Feedback> implements FeedbackService {

    @Autowired
    FeedbackMapper feedbackMapper;

    @Override
    public void setAutoIncrement() {
        feedbackMapper.setAutoIncrement();
    }
}
