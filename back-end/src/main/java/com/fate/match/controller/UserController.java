package com.fate.match.controller;

import com.fate.match.bean.Result;
import com.fate.match.config.JwtConfig;
import com.fate.match.exception.ApiAssert;
import com.fate.match.model.User;
import com.fate.match.service.AccessTokenService;
import com.fate.match.service.UserService;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * 涉及到用户的相关控制器
 */
@RestController
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    AccessTokenService accessTokenService;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    JwtConfig jwtConfig;

    /**
     * 根据账号查询用户数据并返回
     * @param userAccount: 账号
     * @return 返回查询到的用户的详细信息
     */
    @GetMapping("/userdata/{userAccount}")
    public Result userDetail(@PathVariable(value = "userAccount") String userAccount,
                             HttpServletRequest request) {
        // 获取更新的token
        String token = jwtTokenUtil.getNewToken(request);
        // 账号不能为空
        ApiAssert.notNull(userAccount,"用户名不能为空");
        // 根据账号在数据库中查询数据
        User user = userService.getByUserAccount(userAccount);
        // 该用户必须存在
        ApiAssert.notNull(user,"用户名不存在");
        // 根据出生日期计算年龄
        Date current_time = new Date();
        if (user.getBirthday() != null) {
            user.setAge((int)(((current_time.getTime() - user.getBirthday().getTime()) / (24 * 60 * 60 * 1000)) / 365));
        } else {
            user.setAge(null);
        }
        userService.updateById(user);
        return Result.success(user, token);
    }

    /**
     * 查询自己的数据
     * @return 返回查询到的用户的详细信息
     */
    @GetMapping("/userdata")
    public Result userDetail(HttpServletRequest request) {
        // 通过token获取用户账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        // 账号不能为空
        ApiAssert.notNull(userAccount,"用户名不能为空");
        // 根据账号在数据库中查询数据
        User user = userService.getByUserAccount(userAccount);
        // 该用户必须存在
        ApiAssert.notNull(user,"用户名不存在");
        // 根据出生日期计算年龄
        Date current_time = new Date();
        if (user.getBirthday() != null) {
            user.setAge((int)(((current_time.getTime() - user.getBirthday().getTime()) / (24 * 60 * 60 * 1000)) / 365));
        } else {
            user.setAge(null);
        }
        // 更新设置
        userService.updateById(user);
        return Result.success(user, token);
    }

    /**
     * 对用户自己进行基本信息的设置
     * @param user: 设置的基本信息
     * @return 返回设置完成后的详细信息
     */
    @PostMapping("/userset")
    public Result userSettings(@RequestBody User user,
                               HttpServletRequest request) {
        // 通过token获取用户账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        ApiAssert.notNull(userAccount,"用户名不能为空");
        // 根据账号查询用户
        User user_set = userService.getByUserAccount(userAccount);
        ApiAssert.notNull(user_set,"用户名不存在");
        // 设置用户昵称
        user_set.setNickname(user.getNickname());
        // 设置用户出生日期
        user_set.setBirthday(user.getBirthday());
        // 根据出生日期计算年龄
        Date current_time = new Date();
        if (user.getBirthday() != null) {
            user_set.setAge((int)(((current_time.getTime() - user.getBirthday().getTime()) / (24 * 60 * 60 * 1000)) / 365));
        } else {
            user_set.setAge(null);
        }
        // 设置用户性别
        user_set.setSex(user.getSex());
        // 设置用户QQ
        user_set.setQq(user.getQq());
        // 设置用户微信
        user_set.setWx(user.getWx());
        // 设置用户邮箱
        user_set.setEmail(user.getEmail());
        // 设置用户头像
        user_set.setAvatar(user.getAvatar());
        // 设置用户省份
        user_set.setRegion(user.getRegion());
        // 设置用户手机号码
        user_set.setPhoneNumber(user.getPhoneNumber());
        // 设置用户职业
        user_set.setVocation(user.getVocation());
        // 设置用户兴趣字符串
        user_set.setInterests(user.getInterests());
        // 设置用户自定义兴趣
        user_set.setDetailInterests(user.getDetailInterests());
        // 设置用户性格字符串
        user_set.setCharacters(user.getCharacters());
        // 设置用户自定义性格
        user_set.setDetailCharacters(user.getDetailCharacters());
        // 设置用户签名
        user_set.setSignature(user.getSignature());
        // 更新用户信息
        userService.updateById(user_set);
        // 返回更新后的用户信息
        user_set = userService.getByUserAccount(userAccount);
        return Result.success(user_set, token);
    }

    /**
     * 删除用户
     * @param userAccount 需要删除的用户账号
     * @param request 网页请求
     * @return 返回更新后的token
     */
    @GetMapping("/userdelete/{userAccount}")
    public Result deleteUser(@PathVariable("userAccount") String userAccount,
                             HttpServletRequest request) {
        // 通过token获取管理员账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userManagerAccount = jwtTokenUtil.getUserAccountFromToken(token);
        ApiAssert.notNull(userAccount,"用户名不能为空");
        ApiAssert.notNull(userManagerAccount,"管理员不存在");
        // 通过账号获取用户实体
        User user = userService.getByUserAccount(userAccount);
        User userManager = userService.getByUserAccount(userManagerAccount);
        ApiAssert.notNull(user,"用户不存在");
        // 非管理员不能删除
        ApiAssert.isTrue(userManager.getIsManager(),"非管理员");
        // 删除用户
        userService.removeById(user.getUserId());
        // 检测删除是否成功
        User user1 = userService.getByUserAccount(userAccount);
        ApiAssert.isNull(user1,"数据库错误");
        userService.setUserAutoIncrement();
        return Result.success(token);
    }
}
