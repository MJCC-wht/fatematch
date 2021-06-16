package com.fate.match.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fate.match.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据用户名查询用户
     * @param account: 用户名
     * @return
     */
    User selectByAccount(@Param("account") String account);

    List<User> selectByAge(@Param("minAge") int minAge,
                           @Param("maxAge") int maxAge);

    List<User> selectByAgeSex(@Param("minAge") int minAge,
                              @Param("maxAge") int maxAge,
                              @Param("sex") String sex);

    void setUserAutoIncrement();
}
