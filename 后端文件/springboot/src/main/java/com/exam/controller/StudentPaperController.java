package com.exam.controller;

import com.exam.entity.ApiResult;
import com.exam.entity.Score;
import com.exam.entity.StudentPaper;
import com.exam.serviceimpl.StudentPaperServiceImpl;
import com.exam.util.ApiResultHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentPaperController {
    @Autowired
    private StudentPaperServiceImpl studentPaperService;
    //增加学生答题数据，等会改为更新
    @PutMapping("/studentPaper")
    @CrossOrigin
    public ApiResult addOne(StudentPaper studentPaper){
        int res =  studentPaperService.addOne(studentPaper);
        if (res==1){
            return ApiResultHandler.buildApiResult(200,"添加成功",null);
        }else{
            return ApiResultHandler.buildApiResult(400,"添加失败",null);
        }
    }
    //查分数的
    @GetMapping("/lastScore/{studentId}/{examCode}")
    @CrossOrigin
    public ApiResult lastScore(@PathVariable("studentId") Integer studentId,@PathVariable("examCode") Integer examCode) {
        int scores = studentPaperService.lastScore(studentId,examCode);
        return ApiResultHandler.buildApiResult(200,"查询成功",scores);
    }
    //查总分
    @GetMapping("/paperTatalScore/{examCode}")
    @CrossOrigin
    public ApiResult paperTatalScore(@PathVariable("examCode") Integer examCode) {
        int scores = studentPaperService.tatalScore(examCode);
        return ApiResultHandler.buildApiResult(200,"查询成功",scores);
    }
    //交卷后删除答题卡
    @DeleteMapping("/deleteCard/{examCode}/{studentId}")
    @CrossOrigin
    public ApiResult deleteCard(@PathVariable("examCode") Integer examCode,@PathVariable("studentId") Integer studentId) {
        int scores = studentPaperService.deleteCard(examCode,studentId);
        return ApiResultHandler.buildApiResult(200,"delete成功",scores);
    }





    //查询是否作答，但感觉没什么用
    @GetMapping("/findTags/{questionId}/{questionType}/{examCode}")
    @CrossOrigin
    public ApiResult findTags(@PathVariable("questionId") Integer questionId,@PathVariable("questionType") Integer questionType,@PathVariable("examCode") Integer examCode){
        int res = studentPaperService.fingTags(questionId,questionType,examCode);

        if (res==1){
            return ApiResultHandler.buildApiResult(1,"已作答",questionId);
        }else {
            return ApiResultHandler.buildApiResult(0,"未作答",questionId);
        }
    }
    //找一处不起眼的角落执行一下就可以，用来生成答题卡的东西
    @GetMapping("/createPaper/{paperId}/{questionId}/{questionType}/{examCode}/{studentId}")
    @CrossOrigin
    public  ApiResult insertPaper(@PathVariable("paperId") Integer paperId,@PathVariable("questionId") Integer questionId,@PathVariable("questionType") Integer questionType,@PathVariable("examCode") Integer examCode,@PathVariable("studentId") Integer studentId){

        int resM = studentPaperService.fingTags(questionId,questionType,examCode);
        int resJ = studentPaperService.fingTags(questionId,questionType+2,examCode);
        int resF = studentPaperService.fingTags(questionId,questionType+1,examCode);
        System.out.println(resM);
        System.out.println(resJ);
        System.out.println(resF);
        if (resM==0&&resJ==0&&resF==0){
            int resMultiIn = studentPaperService.paperMultiInsert(paperId);
            int resMultiUp = studentPaperService.paperMultiUpdate(paperId,examCode,studentId);
            int resJudgeIn = studentPaperService.paperJudgeInsert(paperId);
            int resJudgeUp = studentPaperService.paperJudgeUpdate(paperId,examCode,studentId);
            int resFillIn  = studentPaperService.paperFillInsert(paperId);
            int resFillUp =  studentPaperService.paperFillUpdate(paperId,examCode,studentId);
            return ApiResultHandler.buildApiResult(200,"生成",resM);
        }else{
            return ApiResultHandler.buildApiResult(200,"未生成",0);
        }
    }

    @GetMapping("/paperMessage/{examCode}/{studentID}")
    @CrossOrigin
    public ApiResult findByExamCode(@PathVariable("examCode") Integer examCode,@PathVariable("studentID") Integer studentID) {
        List<StudentPaper> paperMessage = studentPaperService.paperMessage(examCode,studentID);
        return ApiResultHandler.buildApiResult(200,"查询成功",paperMessage);
    }


}
