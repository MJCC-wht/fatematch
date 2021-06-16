package com.fate.match.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fate.match.mapper.UserMapper;
import com.fate.match.model.User;
import com.fate.match.service.UserService;
import com.fate.match.util.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getByUserAccount(String userAccount) {
        return userMapper.selectByAccount(userAccount);
    }

    @Override
    public List<User> getByAge(int minAge, int maxAge) {
        return userMapper.selectByAge(minAge, maxAge);
    }

    @Override
    public List<User> getByAgeSex(int minAge, int maxAge, String sex) {
        return userMapper.selectByAgeSex(minAge, maxAge, sex);
    }

    @Override
    public User create(String userAccount, String password) {
        User user = new User();
        user.setAccount(userAccount);
        user.setPassword(new BCryptPasswordEncoder().encode(password));
        user.setAvatar("http://pic1.win4000.com/cover/2020-04-20/20200420152013_44623_250_300.jpg");
        user.setLevel(1);
        user.setIsBlock(false);
        user.setIsManager(false);
        user.setCreateDate(new Date());
        user.setInterests("0a0a0a0a0a0a0a0a");
        userMapper.insert(user);
        return user;
    }

    @Override
    public void setUserAutoIncrement() {
        userMapper.setUserAutoIncrement();
    }
}
