package com.fate.match.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fate.match.bean.Result;
import com.fate.match.exception.ApiAssert;
import com.fate.match.mapper.AttentionMapper;
import com.fate.match.mapper.PostMapper;
import com.fate.match.model.Attention;
import com.fate.match.model.Post;
import com.fate.match.model.User;
import com.fate.match.service.PostService;
import com.fate.match.service.UserService;
import com.fate.match.util.FileUtil;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 发布动态的控制器
 */
@RestController
public class PostController {

    @Autowired
    FileUtil fileUtil;
    @Autowired
    PostService postService;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserService userService;
    @Autowired
    PostMapper postMapper;
    @Autowired
    AttentionMapper attentionMapper;

    /**
     * 发布动态
     * @param post_temp 动态信息
     * @param request 网页请求
     * @return 返回发布的动态和用户token
     */
    @PostMapping("/post")
    public Result post(@RequestBody Post post_temp,
                       HttpServletRequest request) {
        // 通过token获取用户名
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        Post post = new Post();
        // 设置创建日期和更新日期为发布动态的时间
        post.setCreateDate(new Date());
        post.setUpdateDate(new Date());
        // 设置标题
        post.setTitle(post_temp.getTitle());
        // 设置正文
        post.setContent(post_temp.getContent());
        // 设置封面URL地址
        post.setCover(post_temp.getCover());
        // 设置发动态者ID
        post.setUserId(user.getUserId());
        // 设置初始踩数为0
        post.setBadCount(0);
        // 设置初始赞数为0
        post.setGoodCount(0);
        // 设置初始访问量为0
        post.setViewCount(0);
        // 设置初始回复量为0
        post.setReplyCount(0);
        // 设置动态的面向对象
        if (post_temp.getIsPrivate() != null) {
            post.setIsPrivate(post_temp.getIsPrivate());
        }
        if (post_temp.getIsAttention() != null) {
            post.setIsAttention(post_temp.getIsAttention());
        }
        if (post_temp.getIsPublic() != null) {
            post.setIsPublic(post_temp.getIsPublic());
        }
        // 保存动态并返回
        postService.save(post);
        Integer postId = post.getPostId();
        post = postService.getById(postId);
        return Result.success(post, token);
    }

    /**
     * 获取动态数据，并视为浏览该动态一次
     * @param postId 动态ID
     * @param request 网页请求
     * @return 返回获得的动态数据和token
     */
    @GetMapping("/postData/{postId}")
    public Result getPost(@PathVariable("postId") Integer postId,
                          HttpServletRequest request) {
        // 通过token获取用户名
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        ApiAssert.notNull(postId,"查询动态ID不能为空");
        Post post = postService.getById(postId);
        ApiAssert.notNull(post,"查询动态为空");
        // 如果为私密状态，非本人不能查看
        if (post.getIsPrivate()) {
            ApiAssert.isTrue(post.getUserId().equals(user.getUserId()),"非本人不能查看");
        }
        // 如果为互关可以查看，则进入筛选
        if (post.getIsAttention()) {
            // 筛选出所有该用户关注的人的关注关系
            QueryWrapper<Attention> wrapper_1 = new QueryWrapper<>();
            wrapper_1.eq("user_client_id", post.getUserId());
            List<Attention> attentions_1 = attentionMapper.selectList(wrapper_1);
            // 筛选出所有关注该用户的人的关注关系
            QueryWrapper<Attention> wrapper_2 = new QueryWrapper<>();
            wrapper_2.eq("user_server_id", post.getUserId());
            List<Attention> attentions_2 = attentionMapper.selectList(wrapper_2);
            ArrayList<Integer> userId_1 = new ArrayList<>();
            ArrayList<Integer> userId_2 = new ArrayList<>();
            // 获取所有关注该用户的人和关注该用户的人的ID，分为两个列表
            for (Attention attention : attentions_1) {
                userId_1.add(attention.getUserServerId());
            }
            for (Attention attention : attentions_2) {
                userId_2.add(attention.getUserClientId());
            }
            // 对这两个列表寻找相同元素
            ArrayList<Integer> common = new ArrayList<>(userId_1);
            ArrayList<Integer> notCommon = new ArrayList<>(userId_1);
            notCommon.removeAll(userId_2);
            common.removeAll(notCommon);
            // 最后加上该用户自己，保证他自己可以查看
            common.add(post.getUserId());
            ApiAssert.isTrue(common.contains(user.getUserId()),"非互关不能查看");
        }
        // 浏览量加一
        post.setViewCount(post.getViewCount() + 1);
        // 更新动态
        postService.updateById(post);
        post = postService.getById(postId);
        return Result.success(post, token);
    }

    /**
     * 获取所有动态的相关信息
     * @param request 网页请求
     * @return 返回所有动态的列表和token
     */
    @GetMapping("/postsData")
    public Result getAttentions(HttpServletRequest request) {
        // 获取新token
        String token = jwtTokenUtil.getNewToken(request);
        // 获取所有动态内容
        List<Post> posts = postService.list();
        // 用于存储结果的列表
        ArrayList<HashMap<String, Object>> result = new ArrayList<>();
        // 遍历所有动态
        for (Post post : posts) {
            User user = userService.getById(post.getUserId());
            result.add(new HashMap<>() {{
                // 添加用户账号
                put("account", user.getAccount());
                // 添加动态
                put("post", post);
                // 添加用户昵称
                put("nickname", user.getNickname());
                // 添加用户手机号
                put("phoneNumber", user.getPhoneNumber());
                // 添加用户QQ
                put("QQ", user.getQq());
                // 添加用户微信
                put("wx", user.getWx());
                // 添加用户邮箱
                put("email", user.getEmail());
            }});
        }
        return Result.success(result, token);
    }

    /**
     * 更改动态详情
     * @param postId 动态ID
     * @param post_temp 动态内容
     * @param request 网页请求
     * @return 返回更新后的动态和token
     */
    @PostMapping("/postSet/{postId}")
    public Result changePost(@PathVariable("postId") Integer postId,
                             @RequestBody Post post_temp,
                             HttpServletRequest request) {
        // 通过token获取用户名
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        // 获取用户和动态
        User user = userService.getByUserAccount(userAccount);
        Post post = postService.getById(postId);
        ApiAssert.notNull(post,"修改的帖子不存在");
        ApiAssert.isTrue(user.getUserId().equals(post.getUserId()),"非本人不能修改");
        // 更改标题
        post.setTitle(post_temp.getTitle());
        // 更改正文
        post.setContent(post_temp.getContent());
        // 更改封面
        post.setCover(post_temp.getCover());
        // 更改更新日期
        post.setUpdateDate(new Date());
        // 设置动态面向人群
        int count = 0;
        if (post_temp.getIsPublic() != null && post_temp.getIsPublic()) {
            count++;
            post.setIsPublic(true);
            post.setIsPrivate(false);
            post.setIsAttention(false);
        }
        if (post_temp.getIsAttention() != null && post_temp.getIsAttention()) {
            count++;
            ApiAssert.notTrue(count > 1,"设置错误");
            post.setIsAttention(true);
            post.setIsPublic(false);
            post.setIsPrivate(false);
        }
        if (post_temp.getIsPrivate() != null && post_temp.getIsPrivate()) {
            count++;
            ApiAssert.notTrue(count > 1,"设置错误");
            post.setIsPrivate(true);
            post.setIsPublic(false);
            post.setIsAttention(false);
        }
        // 更新动态
        postService.updateById(post);
        post = postService.getById(post.getPostId());
        return Result.success(post, token);
    }

    /**
     * 给动态点赞或者点踩
     * @param postId 动态ID
     * @param map 赞或者踩
     * @param request 网页请求
     * @return 返回动态内容和token
     */
    @PostMapping("/postLikeHate/{postId}")
    public Result likeHatePost(@PathVariable("postId") Integer postId,
                               @RequestBody Map<String ,Boolean> map,
                               HttpServletRequest request) {
        // 获取动态和token
        String token = jwtTokenUtil.getNewToken(request);
        Post post = postService.getById(postId);
        ApiAssert.notNull(map.get("state"),"赞踩状态不能为空");
        // 如果为赞，赞加一；反之，踩加一
        if (map.get("state")) {
            post.setGoodCount(post.getGoodCount() + 1);
        } else {
            post.setBadCount(post.getBadCount() + 1);
        }
        // 更新动态
        postService.updateById(post);
        post = postService.getById(postId);
        return Result.success(post, token);
    }

    /**
     * 设置动态面向人群
     * @param postId 动态ID
     * @param map 包含面向人群状态
     * @param request 网页请求
     * @return 返回动态和token
     */
    @PostMapping("/setPostState/{postId}")
    public Result setPostState(@PathVariable("postId") Integer postId,
                               @RequestBody Map<String, Boolean> map,
                               HttpServletRequest request) {
        // 获取token和动态
        String token = jwtTokenUtil.getNewToken(request);
        Post post = postService.getById(postId);
        // 设置动态面向人群
        int count = 0;
        if (map.get("isPublic") != null && map.get("isPublic")) {
            count++;
            post.setIsPublic(true);
            post.setIsPrivate(false);
            post.setIsAttention(false);
        }
        if (map.get("isAttention") != null && map.get("isAttention")) {
            count++;
            ApiAssert.notTrue(count > 1,"设置错误");
            post.setIsAttention(true);
            post.setIsPublic(false);
            post.setIsPrivate(false);
        }
        if (map.get("isPrivate") != null && map.get("isPrivate")) {
            count++;
            ApiAssert.notTrue(count > 1,"设置错误");
            post.setIsPrivate(true);
            post.setIsPublic(false);
            post.setIsAttention(false);
        }
        // 更新动态
        postService.updateById(post);
        post = postService.getById(postId);
        return Result.success(post, token);
    }

    /**
     * 删除动态
     * @param postId 动态ID
     * @param request 网页请求
     * @return 返回动态和token
     */
    @GetMapping("/postDelete/{postId}")
    public Result deletePost(@PathVariable("postId") Integer postId,
                             HttpServletRequest request) {
        // 获取token和用户和动态
        String token = jwtTokenUtil.getNewToken(request);
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        Post post = postService.getById(postId);
        ApiAssert.notNull(post,"要删除的动态不存在");
        // 除了管理员，只有本人可以删除
        if (!user.getIsManager()) {
            ApiAssert.isTrue(user.getUserId().equals(post.getUserId()),"非本人不能操作");
        }
        // 从数据库中删除
        postService.removeById(postId);
        post = postService.getById(postId);
        postMapper.setAutoIncrement();
        // 检测数据库是否错误
        ApiAssert.isNull(post,"数据库错误");
        return Result.success(token);
    }
}
