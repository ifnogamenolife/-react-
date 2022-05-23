package com.exam.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.exam.entity.ApiResult;
import com.exam.entity.FillQuestion;
import com.exam.entity.JudgeQuestion;
import com.exam.serviceimpl.JudgeQuestionServiceImpl;
import com.exam.util.ApiResultHandler;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class JudgeQuestionController {

    @Autowired
    private JudgeQuestionServiceImpl judgeQuestionService;

    @PostMapping("/judgeQuestion")
    @CrossOrigin
    public ApiResult add(JudgeQuestion judgeQuestion) {
        int res = judgeQuestionService.add(judgeQuestion);
        if (res != 0) {
            return ApiResultHandler.buildApiResult(200,"添加成功",res);
        }
        return ApiResultHandler.buildApiResult(400,"添加失败",res);
    }

    @GetMapping("/judgeQuestion/{page}/{size}")
    @CrossOrigin
    public ApiResult findAll(@PathVariable Integer page, @PathVariable Integer size){
        Page<JudgeQuestion> judgeQuextionPage = new Page<>(page,size);
        IPage<JudgeQuestion> res = judgeQuestionService.findAll(judgeQuextionPage);
        return  ApiResultHandler.buildApiResult(200,"分页查询所有判断题",res);
    }

    @GetMapping("/judgeQuestionId")
    public ApiResult findOnlyQuestionId() {
        JudgeQuestion res = judgeQuestionService.findOnlyQuestionId();
        return  ApiResultHandler.buildApiResult(200,"查询成功",res);
    }

    @PutMapping("/updateJudgeQuestion")
    @CrossOrigin
    public ApiResult update(JudgeQuestion judgeQuestion) {
        int res = judgeQuestionService.updateJudgeQuestion(judgeQuestion);
        if (res != 0) {
            return ApiResultHandler.buildApiResult(200,"更新成功",res);
        }
        return ApiResultHandler.buildApiResult(400,"更新失败",res);
    }

    @DeleteMapping("/deleteJudgeQuestion/{questionId}")
    @CrossOrigin
    public ApiResult deleteJudgeQuestion(@PathVariable("questionId") Integer questionId) {
        int res = judgeQuestionService.deleteJudgeQuestion(questionId);
        return  ApiResultHandler.buildApiResult(200,"删除成功",res);
    }

}
