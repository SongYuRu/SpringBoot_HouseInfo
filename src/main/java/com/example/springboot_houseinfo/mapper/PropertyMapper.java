package com.example.springboot_houseinfo.mapper;

import com.example.springboot_houseinfo.pojo.Property;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PropertyMapper {

    List<Property> findPropertys();

    void insertProperty(Property property);

    boolean updateProperty(Property property);

    void deleteProperty(Integer id);
}
