package com.exam.mapper;

import com.exam.entity.StudentPaper;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudentPaperMapper {

    /**
     * 暂未完成
     * */
    @Update("UPDATE exam.answer_paper\n" +
            "SET   studentId=#{studentId}, studentName=#{studentName}, studentAnswer=#{studentAnswer},  flag=#{flag},  examCode=#{examCode}\n" +
            "WHERE questionId=#{questionId} AND questionType=#{questionType} ;")
    int addOne(StudentPaper studentPaper);



    @Select("select ifnull((select sum(score) from answer_paper where flag =1 and studentId=#{studentId} and examCode=#{examCode}),0) as lastScore")
    int lastScore(Integer studentId,Integer examCode);
    @Select("select sum(score) from answer_paper where  examCode=#{examCode}")
    int totalScore(Integer examCode);


    @Select("select  ifnull((select exist from answer_paper where questionId=#{questionId} and questionType=#{questionType} and examCode = #{examCode}),0) as exist ")
    int findTags(Integer questionId,Integer questionType,Integer examCode);

    /**
     * 交卷后删除答题卡
     * */
    @Delete("delete from answer_paper where examCode =#{examCode} AND studentId=#{studentId}")
    int deleteCard(Integer examCode,Integer studentId);


    /**
     *将试题信息插入试卷表中,插入之前会经过判断是否存在
     * 防止多次插入
     *
     */
    @Insert("insert  into answer_paper (questionId,answer,score,questionType)\n" +
            " select questionId ,answer ,score ,questionType \n" +
            "from multi_question \n" +
            "where questionId in (select questionId from paper_manage where questionType =1 and paperId = #{paperId})\n")
    int paperMultiInsert(Integer paperId);

    @Update("update answer_paper \n" +
            "set examCode =#{examCode},studentId=#{studentId}\n " +
            "where questionId in (select questionId from paper_manage where questionType = 1 and paperId = #{paperId})")
    int paperMultiUpdate(Integer paperId,Integer examCode,Integer studentId);



    /**
     *将试题信息插入试卷表中,插入之前会经过判断是否存在
     * 防止多次插入
     *判断题的类型是3333333333333333333333333333
     */
    @Insert("insert  into answer_paper (questionId,answer,score,questionType)\n" +
            " select questionId ,answer ,score ,questionType \n" +
            "from judge_question \n" +
            "where questionId in (select questionId from paper_manage where questionType =3 and paperId = #{paperid})")
    int paperJudgeInsert(Integer paperId);

    @Update("update answer_paper \n" +
            "set examCode =#{examCode},studentId=#{studentId}\n " +
            "where questionId in (select questionId from paper_manage where questionType = 3 and paperId = #{paperId})")
    int paperJudgeUpdate(Integer paperId,Integer examCode,Integer studentId);


    /**
     * 填空题的类型是2222222222222222222222222222222222222
     *将试题信息插入试卷表中,插入之前会经过判断是否存在
     * 防止多次插入
     *
     */
    @Insert("insert  into answer_paper (questionId,answer,score,questionType)\n" +
            " select questionId ,answer ,score ,questionType \n" +
            "from fill_question \n" +
            "where questionId in (select questionId from paper_manage where questionType =2 and paperId = #{paperId})")
    int paperFillInsert(Integer paperId);
    @Update("update answer_paper \n" +
            "set examCode =#{examCode},studentId=#{studentId}\n " +
            "where questionId in (select questionId from paper_manage where questionType = 2 and paperId = #{paperId})")
    int paperFillUpdate(Integer paperId,Integer examCode,Integer studentId);

    /**
     * 查询卷面信息,用来做标签的
     * */
    @Select("select * from answer_paper ap ")
    List<StudentPaper> papaerMessage(Integer examCode,Integer studentId);
}

