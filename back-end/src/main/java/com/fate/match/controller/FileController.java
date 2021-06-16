package com.fate.match.controller;

import com.fate.match.bean.Result;
import com.fate.match.model.User;
import com.fate.match.service.UserService;
import com.fate.match.util.FileUtil;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * 文件控制器
 */
@RestController
public class FileController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserService userService;
    @Autowired
    FileUtil fileUtil;

    /**
     * 文件上传的借口
     * @param img 需要上传的文件(假设为图片)
     * @param request 网页请求
     * @return 返回上传的文件URL和token
     */
    @PostMapping("/upload")
    public Result upload(@RequestPart(value = "img", required = false) MultipartFile img,
                         HttpServletRequest request) {
        // 获取token
        String token = jwtTokenUtil.getNewToken(request);
        // 获取用户
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        String url;
        // 如果上传的文件为空
        if (img == null || img.isEmpty()) {
            // 则默认设置为该用户的头像地址
            url = user.getAvatar();
        } else {
            // 否则将文件上传后并获取地址
            url = fileUtil.getUploadFilePath(img);
        }
        return Result.success(url, token);
    }
}
