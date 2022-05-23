package com.exam.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.exam.entity.ApiResult;
import com.exam.entity.MultiQuestion;
import com.exam.entity.Student;
import com.exam.serviceimpl.MultiQuestionServiceImpl;
import com.exam.util.ApiResultHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MultiQuestionController {

    @Autowired
    private MultiQuestionServiceImpl multiQuestionService;

    @GetMapping("/multiQuestionId")
    public ApiResult findOnlyQuestion() {
        MultiQuestion res = multiQuestionService.findOnlyQuestionId();
        return ApiResultHandler.buildApiResult(200,"查询成功",res);
    }
    @GetMapping("/multiQuestion/{page}/{size}")
    @CrossOrigin
    public ApiResult findAll(@PathVariable Integer page, @PathVariable Integer size){
        Page<MultiQuestion> multiQuextionPage = new Page<>(page,size);
        IPage<MultiQuestion> res = multiQuestionService.findAll(multiQuextionPage);
        return  ApiResultHandler.buildApiResult(200,"分页查询所有选择题",res);
    }

    @PostMapping("/MultiQuestion")
    @CrossOrigin
    public ApiResult add( MultiQuestion multiQuestion) {
        int res = multiQuestionService.add(multiQuestion);
        if (res != 0) {

            return ApiResultHandler.buildApiResult(200,"添加成功",res);
        }
        return ApiResultHandler.buildApiResult(400,"添加失败",res);
    }

    @PutMapping("/updateMultiQuestion")
    @CrossOrigin
    public ApiResult updateQuestion( MultiQuestion multiQuestion) {
        int res = multiQuestionService.updateMultiQuestion(multiQuestion);
        return ApiResultHandler.buildApiResult(200,"更新成功",res);
    }

    @DeleteMapping("/deleteMultiQuestion/{questionId}")
    @CrossOrigin
    public ApiResult deleteJudgeQuestion(@PathVariable("questionId") Integer questionId) {
        int res = multiQuestionService.deleteMultiQuestionId(questionId);
        return  ApiResultHandler.buildApiResult(200,"删除成功",res);
    }
}
