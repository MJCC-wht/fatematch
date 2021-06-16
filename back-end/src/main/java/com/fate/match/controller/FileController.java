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

@RestController
public class FileController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserService userService;
    @Autowired
    FileUtil fileUtil;

    @PostMapping("/upload")
    public Result upload(@RequestPart(value = "img", required = false) MultipartFile img,
                         HttpServletRequest request) {
        String token = jwtTokenUtil.getNewToken(request);
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        String url;
        if (img == null || img.isEmpty()) {
            url = user.getAvatar();
        } else {
            url = fileUtil.getUploadFilePath(img);
        }
        return Result.success(url, token);
    }
}
