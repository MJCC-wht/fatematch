package com.fate.match.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fate.match.mapper.UploadFileMapper;
import com.fate.match.model.UploadFile;
import com.fate.match.service.UploadFileService;
import org.springframework.stereotype.Service;

@Service
public class UploadFileServiceImpl extends ServiceImpl<UploadFileMapper, UploadFile> implements UploadFileService {
}
