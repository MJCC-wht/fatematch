package com.fate.match.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fate.match.model.Attention;

public interface AttentionService extends IService<Attention> {
    void setAutoIncrement();
}
