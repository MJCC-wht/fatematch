package com.fate.match.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fate.match.bean.Result;
import com.fate.match.exception.ApiAssert;
import com.fate.match.mapper.FeedbackMapper;
import com.fate.match.model.Feedback;
import com.fate.match.model.User;
import com.fate.match.service.FeedbackService;
import com.fate.match.service.UserService;
import com.fate.match.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class ReportController {

    @Autowired
    UserService userService;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    FeedbackService feedbackService;
    @Autowired
    FeedbackMapper feedbackMapper;

    /**
     * 举报功能
     * @param map 包含被举报者的账号，举报理由
     * @param request 网页请求
     * @return 返回举报后的举报表和更新后的token
     */
    @PostMapping("/report")
    public Result ReportUser(@RequestBody Map<String, String> map,
                             HttpServletRequest request) {
        // 获取举报者账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userClientAccount = jwtTokenUtil.getUserAccountFromToken(token);
        // 获取被举报者账号
        String userServerAccount = map.get("userServerAccount");
        // 获取举报理由
        String reason = map.get("reason");
        ApiAssert.notNull(userClientAccount,"举报人账号不能为空");
        ApiAssert.notNull(userServerAccount,"被举报人账号不能为空");
        ApiAssert.notTrue(userClientAccount.equals(userServerAccount),"不能举报自己");
        ApiAssert.notNull(reason,"理由不能为空");
        ApiAssert.notEmpty(reason,"理由不能为空");
        // 获取举报者和被举报者的用户实体
        User user_client = userService.getByUserAccount(userClientAccount);
        User user_server = userService.getByUserAccount(userServerAccount);
        // 将此次举报存放到一个新的举报表中
        Feedback feedback = new Feedback();
        feedback.setUserClientId(user_client.getUserId());
        feedback.setUserServerId(user_server.getUserId());
        feedback.setReason(reason);
        feedback.setCreateDate(new Date());
        // 查询该举报关系是否已存在
        QueryWrapper<Feedback> wrapper = new QueryWrapper<>();
        wrapper.eq("user_client_id", user_client.getUserId())
                .eq("user_server_id", user_server.getUserId());
        Feedback feedback1 = feedbackService.getOne(wrapper);
        if (feedback1 != null) {
            // 如果该举报关系已存在，将此次的理由添加空格后再次添加上去
            if(!feedback1.getReason().equals(feedback.getReason())) {
                feedback1.setReason(feedback1.getReason() + " " + feedback.getReason());
                feedbackService.updateById(feedback1);
            }
        } else {
            // 如果举报关系不存在，将其存放进去
            feedbackService.save(feedback);
        }
        // 获得举报关系并返回
        feedback = feedbackService.getOne(wrapper);
        return Result.success(feedback, token);
    }

    /**
     * 获取所有未审核过的举报关系
     * @param request 网页请求
     * @return 返回所有未审核过的举报关系
     */
    @GetMapping("/getReports")
    public Result getAllReports(HttpServletRequest request) {
        // 获取查询者的账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        ApiAssert.isTrue(user.getIsManager(),"非管理员");
        // 获取所有举报关系并转换成Map
        QueryWrapper<Feedback> wrapper = new QueryWrapper<>();
        wrapper.eq("is_check", false);
        List<Feedback> reports = feedbackMapper.selectList(wrapper);
        ApiAssert.notTrue(reports.size()==0,"没有需要审核的举报");
        return Result.success(reports, token);
    }

    /**
     * 获取某个特定举报关系的信息
     * @param reportId 举报关系ID
     * @param request 网页请求
     * @return 返回该举报关系的详细信息
     */
    @GetMapping("/getReport/{reportId}")
    public Result getReport(@PathVariable("reportId") Integer reportId,
                            HttpServletRequest request) {
        // 获取查询者账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        ApiAssert.isTrue(user.getIsManager(),"非管理员");
        // 通过举报关系ID获取举报关系并返回
        Feedback feedback = feedbackService.getById(reportId);
        ApiAssert.notNull(feedback,"举报ID错误");
        return Result.success(feedback, token);
    }

    /**
     * 对举报进行审核
     * @param reportId 审核的举报关系的ID
     * @param map 包含举报结果和审核该举报的用户的账号
     * @param request 网页请求
     * @return 返回举报结果
     */
    @PostMapping("/checkReport/{reportId}")
    public Result checkReport(@PathVariable("reportId") Integer reportId,
                              @RequestBody Map<String, Object> map,
                              HttpServletRequest request) {
        // 获取该举报关系
        Feedback feedback = feedbackService.getById(reportId);
        ApiAssert.notNull(feedback,"举报ID错误");
        // 获取审核后的结果和审核者的账号
        Boolean result = (Boolean) map.get("result");
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        ApiAssert.isTrue(user.getIsManager(),"非管理员");
        if (result) {
            // 如果举报通过，更新举报表，并封禁被举报人的账号
            feedback.setResult(true);
            Integer userServerId = feedback.getUserServerId();
            User user_server = userService.getById(userServerId);
            user_server.setIsBlock(true);
        } else {
            // 否则驳回举报
            feedback.setResult(false);
        }
        // 设置已审核过
        feedback.setIsCheck(true);
        // 更新该举报关系
        feedbackService.updateById(feedback);
        return Result.success(feedback, token);
    }

    /**
     * 删除举报关系
     * @param reportId 举报关系ID
     * @param request 网页请求
     * @return 返回更新的token
     */
    @PostMapping("/deleteReport/{reportId}")
    public Result deleteReport(@PathVariable("reportId") Integer reportId,
                               HttpServletRequest request) {
        // 获取举报关系
        Feedback feedback = feedbackService.getById(reportId);
        ApiAssert.notNull(feedback,"举报ID错误");
        // 获取删除举报者账号
        String token = jwtTokenUtil.getNewToken(request);
        ApiAssert.notNull(token,"token不能为空");
        String userAccount = jwtTokenUtil.getUserAccountFromToken(token);
        User user = userService.getByUserAccount(userAccount);
        ApiAssert.isTrue(user.getIsManager(),"非管理员");
        // 删除举报并恢复自增
        feedbackService.removeById(reportId);
        feedbackService.setAutoIncrement();
        return Result.success(token);
    }
}
