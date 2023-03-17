package com.example.springboot_houseinfo.service;

import com.example.springboot_houseinfo.pojo.Property;
import com.github.pagehelper.PageInfo;

public interface PropertyService {
    PageInfo<Property> findPropertyByPage(Integer pageNum, Integer pageSize);

    void insertProperty(Property property);

    boolean updateProperty(Property property);

    void deleteProperty(Integer id);
}
