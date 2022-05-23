package com.exam.controller;

import com.exam.entity.ApiResult;
import com.exam.entity.Login;
import com.exam.entity.Registers;
import com.exam.entity.Student;
import com.exam.serviceimpl.StudentRegisterImpl;
import com.exam.util.ApiResultHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;

@RestController
public class RegisterController {

    @Autowired
    private StudentRegisterImpl studentRegister;

    @PostMapping("/register")
    @ResponseBody
    @CrossOrigin
    public ApiResult<Student> login(Registers student){
        String username = student.getStudentName();
        String password = student.getPwd();
        System.out.println(username+"  register测试controller"+password);
        int res;
        res = studentRegister.register_student(student);
        System.out.println(res);
        if (res == 1) {
            return ApiResultHandler.buildApiResult(200,"添加成功",null);
        }else {
            return ApiResultHandler.buildApiResult(400,"添加失败",null);
        }

    }
}
