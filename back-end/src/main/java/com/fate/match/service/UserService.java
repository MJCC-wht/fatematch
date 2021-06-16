package com.fate.match.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.fate.match.model.User;

import java.util.List;

public interface UserService extends IService<User> {

    /**
     * 根据用户名查询用户
     * @param userAccount: 用户名
     */
    User getByUserAccount(String userAccount);

    /**
     * 创建新用户
     * @param userAccount
     * @param password
     * @return
     */
    User create(String userAccount, String password);

    /**
     * 根据年龄段查询用户
     * @param minAge
     * @param maxAge
     * @return
     */
    List<User> getByAge(int minAge, int maxAge);

    List<User> getByAgeSex(int minAge, int maxAge, String sex);

    void setUserAutoIncrement();
}

