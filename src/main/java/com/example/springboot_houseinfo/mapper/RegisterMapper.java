package com.example.springboot_houseinfo.mapper;

import com.example.springboot_houseinfo.pojo.Register;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RegisterMapper {
    Register findUserByNameAndWord(@Param("usernames") String usernames,
                                   @Param("passwords") String passwords);

}

