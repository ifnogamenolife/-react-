package com.exam.service;

import com.exam.entity.Admin;

import java.util.List;

public interface AdminService{

    public List<Admin> findAll();

    public Admin findById(String adminId);

    public int deleteById(String adminId);

    public int update(Admin admin);

    public int add(Admin admin);
}
