package com.example.springboot_houseinfo.service;


import com.example.springboot_houseinfo.pojo.User;

public interface UserService {
    User userLogin(String username, String password);
}



