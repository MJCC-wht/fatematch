package com.fate.match.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fate.match.bean.Result;
import com.fate.match.config.JwtConfig;
import com.fate.match.exception.ApiAssert;
import com.fate.match.mapper.UserMapper;
import com.fate.match.model.User;
import com.fate.match.service.AccessTokenService;
import com.fate.match.service.UserService;
import com.fate.match.util.JwtTokenUtil;
import com.fate.match.util.MatchUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.DecimalFormat;
import java.util.*;

/**
 * 用户缘分匹配控制器
 */
@RestController
public class MatchController {

    @Autowired
    UserService userService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    MatchUtil matchUtil;
    @Autowired
    JwtConfig jwtConfig;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    AccessTokenService accessTokenService;

    /**
     * 用于用户自身的缘分匹配
     * @param user: 用户信息，用于存储最小年龄minAge和最大年龄maxAge
     * @return 返回缘分匹配的结果排名
     */
    @PostMapping("/usermatch")
    public Result MatchUser(@RequestBody User user,
                            HttpServletRequest request) {
        // 通过token获取用户账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        ApiAssert.notNull(userAccount,"用户名不能为空");
        // 根据用户名获取用户
        User user_client = userService.getByUserAccount(userAccount);
        ApiAssert.isTrue(matchUtil.check_interests(user_client.getInterests()),"兴趣设置错误");
        ApiAssert.notNull(user_client,"用户名不存在");
        // 获取年龄段的上下限
        int minAge = user.getMinAge();
        int maxAge = user.getMaxAge();
        String sex = user.getSex();
        String client_characters = user.getCharacters();
        // 根据年龄段和性别进行用户筛选
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.ge("age", minAge);
        wrapper.le("age", maxAge);
        wrapper.isNotNull("interests");
        if (sex != null && (sex.equals("男") || sex.equals("女"))) {
            wrapper.eq("sex", sex);
        }
        List<User> userList = userMapper.selectList(wrapper);
        HashMap<String, Double> interest_map = new HashMap<>();
        HashMap<String, List<Double>> temp_map = new HashMap<>();
        // 对筛选出来的用户进行逐个的性格匹配和排序
        for (User user_server: userList) {
            // 不和自己进行匹配
            if (!user_client.getUserId().equals(user_server.getUserId())) {
                // 检查兴趣字符串是否符合规范，如果不符合规范，跳过该人
                if (!matchUtil.check_interests(user_server.getInterests())) {
                    continue;
                }
                // 获取宽松匹配的结果
                String result_loose = matchUtil.compute_match(matchUtil.match_interests_loose(user_client.getInterests(),
                        user_server.getInterests()), "0");
                // 获取严格匹配的结果
                String result_strict = matchUtil.compute_match(matchUtil.match_interests_strict(user_client.getInterests(),
                        user_server.getInterests()), "1");
                // 将结果转换为Double型
                double loose = Double.parseDouble(result_loose);
                double strict = Double.parseDouble(result_strict);
                // 获取性格的加分值
                double bonus = matchUtil.Character_Bonus(client_characters, user_server.getCharacters());
                // 取两位小数
                DecimalFormat df = new DecimalFormat("#.00");
                // 获取最终计算结果
                double result = Double.parseDouble(df.format(strict*1.5 + loose*0.8 + bonus));
                // 将结果放到哈希表中方便进行排序比较
                interest_map.put(user_server.getAccount(), result);
                temp_map.put(user_server.getAccount(), Arrays.asList(loose, strict, bonus));
            }
        }
        // 将哈希表转换为列表进行排序
        List<Map.Entry<String, Double>> list = new ArrayList<>(interest_map.entrySet());
        // 将哈希表中的键值(result)大的排在前面
        list.sort((o1, o2) -> o2.getValue().compareTo(o1.getValue()));
        // 存放最终排序的结果和相关信息
        ArrayList<HashMap<String, String>> result_list = new ArrayList<>();
        // 用于计数，只取排名前8的人
        int count = 0;
        for (Map.Entry<String, Double> entry: list) {
            result_list.add(new HashMap<>() {{
                // 存放所有相关信息，包括账号、昵称、年龄、性别、性格、匹配的最终结果、宽松匹配的结果、严格匹配的结果和性格加分
                put("account", entry.getKey());
                put("nickname", userService.getByUserAccount(entry.getKey()).getNickname());
                put("age", String.valueOf(userService.getByUserAccount(entry.getKey()).getAge()));
                put("gender", userService.getByUserAccount(entry.getKey()).getSex());
                put("characters", userService.getByUserAccount(entry.getKey()).getCharacters());
                put("result", String.valueOf(entry.getValue()));
                put("loose", String.valueOf(temp_map.get(entry.getKey()).get(0)));
                put("strict", String.valueOf(temp_map.get(entry.getKey()).get(1)));
                put("bonus", String.valueOf(temp_map.get(entry.getKey()).get(2)));
            }});
            // 控制在8个人以内
            if (++count == 8) {
                break;
            }
        }
        return Result.success(result_list, token);
    }
}
