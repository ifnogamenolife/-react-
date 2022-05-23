package com.exam.service;

import com.exam.entity.Admin;
import com.exam.entity.Student;
import com.exam.entity.Teacher;

public interface LoginService {

    public Admin adminLogin(String username, String password);

    public Teacher teacherLogin(String username, String password);

    public Student studentLogin(String username, String password);
}
