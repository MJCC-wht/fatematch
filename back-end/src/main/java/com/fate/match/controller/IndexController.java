package com.fate.match.controller;

import com.fate.match.bean.Result;
import com.fate.match.exception.ApiAssert;
import com.fate.match.model.User;
import com.fate.match.service.UserService;
import com.fate.match.util.JwtTokenUtil;
import com.fate.match.util.StringUtil;
import com.fate.match.util.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * 主页面的控制器
 */
@RestController
public class IndexController {

    @Autowired
    private UserService userService;
    @Autowired
    private StringUtil stringUtil;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * 用户注册功能
     * @param user: 注册的用户信息
     * @return 返回注册成功后的相关信息
     */
    @PostMapping("/register")
    public Result register(@RequestBody User user) {
        // 获取注册时填写的账号和密码
        String userAccount = user.getAccount();
        String password = user.getPassword();
        // 账号不能为空
        ApiAssert.notEmpty(userAccount, "请输入用户名");
        // 密码不能为空
        ApiAssert.notEmpty(password, "请输入密码");
        // 账号输入必须符号规范
        ApiAssert.isTrue(stringUtil.check(userAccount, stringUtil.userAccountRegex), "用户名只能输入[0-9a-zA-Z]，长度3-16位");
        // 密码输入必须符合规范
        ApiAssert.isTrue(stringUtil.check(password, stringUtil.passwordRegex), "密码只能输入[0-9a-zA-Z]，长度6-32位");
        // 根据输入的账号检查是否已存在该账号对应的用户
        user = userService.getByUserAccount(userAccount);
        ApiAssert.isNull(user, "用户名已经存在");
        // 如果是新用户，进行存储
        user = userService.create(userAccount, password);
        // 返回新注册的用户的相关信息
        return Result.success(user, null);
    }

    /**
     * 登录功能
     * @param user: 登录需要的用户的账号和密码
     * @return 返回登录成功后的相关信息
     */
    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        // 获取登录时输入的账号和密码
        String userAccount = user.getAccount();
        String password = user.getPassword();
        // 账号和密码不能为空
        ApiAssert.notEmpty(userAccount, "请输入用户名");
        ApiAssert.notEmpty(password, "请输入密码");
        // 通过账号查询是否存在该用户
        user = userService.getByUserAccount(userAccount);
        ApiAssert.notNull(user, "用户不存在");
        // 如果存在，对加密后的密码进行比对检查
        ApiAssert.isTrue(new BCryptPasswordEncoder().matches(password, user.getPassword()), "密码不正确");
        // 如果验证密码成功，进行登录日期的更新
        user.setUpdateDate(new Date());
        userService.updateById(user);
        // 再次给予一个新的token
        String newToken = jwtTokenUtil.refreshToken(userAccount);
        // 通过检查后返回用户相关信息
        return Result.success(user, newToken);
    }
}
