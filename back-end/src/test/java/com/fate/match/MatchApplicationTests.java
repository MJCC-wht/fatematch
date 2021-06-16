package com.fate.match;

import com.fate.match.mapper.UserMapper;
import com.fate.match.util.MatchUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class MatchApplicationTests {

    @Autowired
    UserMapper userMapper;
    @Autowired
    MatchUtil matchUtil;

    @Test
    void contextLoads() {
    }

//    @Test
//    void testUserMapper() {
//        User user = userMapper.selectByAccount("wht");
//        log.info("用户信息:{}", user);
//    }
//
//    @Test
//    void TestString() {
//        List<User> users = userMapper.selectByAgeSex(20, 21, "男");
//        System.out.println(users);
//    }
}
