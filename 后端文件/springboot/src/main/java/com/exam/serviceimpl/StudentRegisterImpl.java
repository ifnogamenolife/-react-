package com.exam.serviceimpl;

import com.exam.entity.Registers;
import com.exam.entity.Student;
import com.exam.service.StudentRegister;
import com.exam.mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentRegisterImpl implements StudentRegister {
    @Autowired
    private  StudentMapper studentMapper;
    @Override
    public int register_student(Registers registers) {
         return studentMapper.register(registers);
    }

}
