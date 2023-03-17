package com.example.springboot_houseinfo.service;

import com.example.springboot_houseinfo.pojo.Register;

public interface RegisterService {
    Register registerLogin(String usernames, String passwords);
}
