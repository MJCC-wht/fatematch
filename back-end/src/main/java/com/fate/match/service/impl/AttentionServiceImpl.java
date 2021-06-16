package com.fate.match.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fate.match.mapper.AttentionMapper;
import com.fate.match.model.Attention;
import com.fate.match.service.AttentionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttentionServiceImpl extends ServiceImpl<AttentionMapper, Attention> implements AttentionService {

    @Autowired
    AttentionMapper attentionMapper;

    @Override
    public void setAutoIncrement() {
        attentionMapper.setAutoIncrement();
    }
}
