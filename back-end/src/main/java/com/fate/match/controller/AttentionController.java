package com.fate.match.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fate.match.bean.Result;
import com.fate.match.exception.ApiAssert;
import com.fate.match.mapper.AttentionMapper;
import com.fate.match.mapper.PostMapper;
import com.fate.match.model.Attention;
import com.fate.match.model.Post;
import com.fate.match.model.User;
import com.fate.match.service.AttentionService;
import com.fate.match.service.UserService;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 关注功能的控制器
 */
@RestController
public class AttentionController {

    @Autowired
    UserService userService;
    @Autowired
    AttentionService attentionService;
    @Autowired
    AttentionMapper attentionMapper;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    PostMapper postMapper;

    /**
     * 添加关注
     * @param map 请求的数据，其中包含关注者，被关注者的账号
     * @param request 网页请求的request
     * @return 返回添加关注后的实体和更新的token
     */
    @PostMapping("/addAttention")
    public Result addAttention(@RequestBody Map<String, String> map,
                               HttpServletRequest request) {
        // 通过token获取关注者账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userClientAccount = jwtTokenUtil.getUserAccountFromToken(token);
        // 获取被关注者账号
        String userServerAccount = map.get("userServerAccount");
        ApiAssert.notNull(userClientAccount,"关注者账号不能为空");
        ApiAssert.notNull(userServerAccount,"被关注者账号不能为空");
        // 得到关注者的用户实体
        User user_client = userService.getByUserAccount(userClientAccount);
        ApiAssert.notNull(user_client, "关注者不能为空");
        Attention attention = new Attention();
        // 更新关注表中的关注者
        attention.setUserClientId(user_client.getUserId());
        ApiAssert.notTrue(userClientAccount.equals(userServerAccount), "不能关注自己");
        User user_server = userService.getByUserAccount(userServerAccount);
        ApiAssert.notNull(user_server, "被关注者不能为空");
        // 更新关注表中的被关注者
        attention.setUserServerId(user_server.getUserId());
        // 更新关注表的创建日期
        attention.setCreateDate(new Date());
        // 查询是否已存在该关注关系
        QueryWrapper<Attention> wrapper = new QueryWrapper<>();
        wrapper.eq("user_client_id", user_client.getUserId())
                .eq("user_server_id", user_server.getUserId());
        Attention attention1 = attentionService.getOne(wrapper);
        ApiAssert.isNull(attention1,"已经关注过");
        // 如果没有关注过，保存关系
        attentionService.save(attention);
        return Result.success(attention, token);
    }

    /**
     * 取消关注
     * @param map 保存取消关注者和被取关者的账号
     * @param request 网页请求
     * @return 返回更新的token
     */
    @PostMapping("/cancelAttention")
    public Result cancelAttention(@RequestBody Map<String, String> map,
                                  HttpServletRequest request) {
        // 获取取关者账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userClientAccount = jwtTokenUtil.getUserAccountFromToken(token);
        String userServerAccount = map.get("userServerAccount");
        ApiAssert.notNull(userClientAccount,"取关者账号不能为空");
        ApiAssert.notNull(userServerAccount,"被取关者账号不能为空");
        // 获取取关者和被取关者
        User user_client = userService.getByUserAccount(userClientAccount);
        User user_server = userService.getByUserAccount(userServerAccount);
        // 查询是否存在该关注关系，如果不存在不能进行取关操作
        QueryWrapper<Attention> wrapper = new QueryWrapper<>();
        wrapper.eq("user_client_id", user_client.getUserId())
                .eq("user_server_id", user_server.getUserId());
        Attention attention = attentionService.getOne(wrapper);
        ApiAssert.notNull(attention,"没有关注过不能取关");
        // 如果存在，从数据库中移除该关系
        attentionService.removeById(attention.getAttentionId());
        // 重置自增
        attentionService.setAutoIncrement();
        return Result.success(token);
    }

    /**
     * 获取一个用户的所有关注关系，包括所有他关注的人及数量，关注他的人及数量
     * @param userAccount 需要进行查询的用户账号
     * @param request 网页请求
     * @return 返回用户的所有关注关系和更新后的token
     */
    @GetMapping("/attentionData/{userAccount}")
    public Result getAttentionData(@PathVariable("userAccount") String userAccount,
                                   HttpServletRequest request) {
        ApiAssert.notNull(userAccount,"查询账号不能为空");
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        QueryWrapper<Attention> wrapper1 = new QueryWrapper<>();
        User user = userService.getByUserAccount(userAccount);
        // 将该用户作为关注者进行查询得到所有他关注的人
        wrapper1.eq("user_client_id", user.getUserId());
        List<Attention> attentions = attentionMapper.selectList(wrapper1);
        // 表示该账号关注的人
        ArrayList<String> idols = new ArrayList<>();
        // 将所有他关注的人保存到数组中
        for (Attention attention : attentions) {
            User user_temp = userService.getById(attention.getUserServerId());
            idols.add(user_temp.getAccount());
        }
        // 将该用户作为被关注者进行查询得到所有关注他的人
        QueryWrapper<Attention> wrapper2 = new QueryWrapper<>();
        wrapper2.eq("user_server_id", user.getUserId());
        ArrayList<String> fans = new ArrayList<>();
        List<Attention> beAttentions = attentionMapper.selectList(wrapper2);
        // 将所有关注他的人保存到数组中
        for (Attention beAttention : beAttentions) {
            User user_temp = userService.getById(beAttention.getUserClientId());
            fans.add(user_temp.getAccount());
        }
        // 将上述所有关系及关注者和被关注者的数量存放到哈希表中并返回
        HashMap<String, Object> map = new HashMap<>();
        map.put("idols", idols);
        map.put("idolsNumber", idols.size());
        map.put("fans", fans);
        map.put("fansNumber", fans.size());
        // 动态数量
        QueryWrapper<Post> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", user.getUserId());
        Integer postNumber = postMapper.selectCount(wrapper);
        map.put("postNumber", postNumber);
        return Result.success(map, token);
    }

}
