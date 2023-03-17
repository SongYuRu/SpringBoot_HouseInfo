package com.example.springboot_houseinfo.service.impl;

import com.example.springboot_houseinfo.mapper.UserMapper;
import com.example.springboot_houseinfo.pojo.User;
import com.example.springboot_houseinfo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {


    @Autowired
    private UserMapper userMapper;

    @Override
    public User userLogin(String username, String password) {
        return userMapper.findUserByNameAndPass(username,password);
    }
}