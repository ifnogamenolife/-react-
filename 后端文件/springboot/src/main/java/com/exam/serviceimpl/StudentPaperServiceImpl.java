package com.exam.serviceimpl;

import com.exam.entity.StudentPaper;
import com.exam.mapper.StudentPaperMapper;
import com.exam.service.StudentPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentPaperServiceImpl implements StudentPaperService {

    @Autowired
    private StudentPaperMapper studentPaperMapper;
    @Override
    public int addOne(StudentPaper studentPaper) {
        return studentPaperMapper.addOne(studentPaper);
    }

    @Override
    public int lastScore(Integer studentId,Integer examCode) {
        return studentPaperMapper.lastScore(studentId,examCode);
    }

    @Override
    public int fingTags(Integer questionId, Integer questionType, Integer examCode) {
        return studentPaperMapper.findTags(questionId,questionType,examCode);
    }

    @Override
    public int paperMultiInsert(Integer paperId) {
        return studentPaperMapper.paperMultiInsert(paperId);
    }

    @Override
    public int paperMultiUpdate(Integer paperId, Integer examCode, Integer studentId) {
        return studentPaperMapper.paperMultiUpdate(paperId,examCode,studentId);
    }

    @Override
    public int paperJudgeInsert(Integer paperId) {
        return studentPaperMapper.paperJudgeInsert(paperId);
    }

    @Override
    public int paperJudgeUpdate(Integer paperId,Integer examCode,Integer studentId) {
        return studentPaperMapper.paperJudgeUpdate(paperId,examCode,studentId);
    }

    @Override
    public int paperFillInsert(Integer paperId) {
        return studentPaperMapper.paperFillInsert(paperId);
    }

    @Override
    public int paperFillUpdate(Integer paperId,Integer examCode,Integer studentId) {
        return studentPaperMapper.paperFillUpdate(paperId,examCode,studentId);
    }

    @Override
    public List<StudentPaper> paperMessage(Integer examCode,Integer studentId) {
        return studentPaperMapper.papaerMessage(examCode,studentId);
    }

    @Override
    public int tatalScore(Integer examCode) {
        return studentPaperMapper.totalScore(examCode);
    }

    @Override
    public int deleteCard(Integer examCode,Integer studentId) {
        return studentPaperMapper.deleteCard(examCode,studentId);
    }
}
