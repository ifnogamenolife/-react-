package com.exam.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.exam.entity.ApiResult;
import com.exam.entity.FillQuestion;
import com.exam.entity.MultiQuestion;
import com.exam.serviceimpl.FillQuestionServiceImpl;
import com.exam.util.ApiResultHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class FillQuestionController {

    @Autowired
    private FillQuestionServiceImpl fillQuestionService;

    @PostMapping("/fillQuestion")
    @CrossOrigin
    public ApiResult add( FillQuestion fillQuestion) {
        int res = fillQuestionService.add(fillQuestion);
        if (res != 0) {
            return ApiResultHandler.buildApiResult(200,"添加成功",res);
        }
        return ApiResultHandler.buildApiResult(400,"添加失败",res);
    }

    @GetMapping("/fillQuestion/{page}/{size}")
    @CrossOrigin
    public ApiResult findAll(@PathVariable Integer page, @PathVariable Integer size){
        Page<FillQuestion> fillQuextionPage = new Page<>(page,size);
        IPage<FillQuestion> res = fillQuestionService.findAll(fillQuextionPage);
        return  ApiResultHandler.buildApiResult(200,"分页查询所有填空题",res);
    }

    @GetMapping("/fillQuestionId")
    public ApiResult findOnlyQuestionId() {
        FillQuestion res = fillQuestionService.findOnlyQuestionId();
        return ApiResultHandler.buildApiResult(200,"查询成功",res);
    }
    @PutMapping("/updateFillQuestion")
    @CrossOrigin
    public ApiResult updateQuestion( FillQuestion fillQuestion) {
        int res = fillQuestionService.UpdateFillQuestion(fillQuestion);
        return ApiResultHandler.buildApiResult(200,"更新成功",res);
    }

    @DeleteMapping("/deleteFillQuestion/{questionId}")
    @CrossOrigin
    public ApiResult deleteJudgeQuestion(@PathVariable("questionId") Integer questionId) {
        int res = fillQuestionService.deleteMultiQuestion(questionId);
        return  ApiResultHandler.buildApiResult(200,"删除成功",res);
    }
}
