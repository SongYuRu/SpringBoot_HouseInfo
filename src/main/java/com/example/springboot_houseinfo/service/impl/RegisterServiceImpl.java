package com.example.springboot_houseinfo.service.impl;

import com.example.springboot_houseinfo.mapper.RegisterMapper;
import com.example.springboot_houseinfo.pojo.Register;
import com.example.springboot_houseinfo.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("registerService")
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private RegisterMapper registerMapper;



    @Override
    public Register registerLogin(String usernames, String passwords) {
        return registerMapper.findUserByNameAndWord(usernames,passwords);
    }
}

