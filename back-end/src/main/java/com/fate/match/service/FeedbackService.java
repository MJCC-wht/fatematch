package com.fate.match.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fate.match.model.Feedback;

public interface FeedbackService extends IService<Feedback> {

    void setAutoIncrement();
}
