package com.fate.match.util;

import com.fate.match.exception.ApiAssert;
import com.fate.match.model.UploadFile;
import com.fate.match.service.UploadFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.UUID;

@Component
public class FileUtil {

    @Value("${file.staticAccessPath}")
    private String staticAccessPath;
    @Value("${file.uploadFolder}")
    private String uploadFolder;
    @Value("${server.port}")
    private String POST;
    @Autowired
    UploadFileService uploadFileService;

    public String getUploadFilePath(MultipartFile file) {
        ApiAssert.notTrue(file.isEmpty(),"上传的文件为空");
        String suffix = file.getOriginalFilename();
        //为防止文件重名被覆盖，文件名取名为：当前日期 + 1-1000内随机数
        String fileName = UUID.randomUUID() + "_" + suffix;
        String staticPath = uploadFolder;
        String savePath = staticPath + "img/" + fileName;
        File dest = new File(savePath);
        if (!dest.getParentFile().exists()) {
            dest.getParentFile().mkdirs();
        }
        try {
            file.transferTo(dest);
            return saveUploadFile(fileName);
        } catch (Exception e) {
            return dest.toString();
        }

    }

    public String saveUploadFile(String fileName) {

        //获取本机IP
        String IP = null;
        try {
            IP = InetAddress.getLocalHost().getHostAddress();
            if (IP.equals("127.0.1.1")) {
                IP = "124.71.190.211";
            }
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        UploadFile uploadFile = new UploadFile();
        uploadFile.setCreateDate(new Date());
        uploadFile.setUpdateDate(new Date());
        uploadFile.setUrl("http://" + IP + ":" + POST + "/fate/upload/img/" + fileName);
        uploadFileService.save(uploadFile);
        return uploadFile.getUrl();

    }

}
