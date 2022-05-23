package com.exam.service;

import com.exam.entity.StudentPaper;

import java.util.List;

public interface StudentPaperService {
    int addOne(StudentPaper studentPaper);

    int lastScore(Integer studentId,Integer examCode);

    int fingTags(Integer questionId,Integer questionType,Integer examCode);

    int paperMultiInsert(Integer paperId);
    int paperMultiUpdate(Integer paperId,Integer examCOde,Integer studentId);

    int paperJudgeInsert(Integer paperId);
    int paperJudgeUpdate(Integer paperId,Integer examCOde,Integer studentId);

    int paperFillInsert(Integer paperId);
    int paperFillUpdate(Integer paperId,Integer examCOde,Integer studentId);

    int tatalScore(Integer examCode);

    int deleteCard(Integer examCode,Integer studentId);

    List<StudentPaper> paperMessage(Integer examCode,Integer studentId);
}
