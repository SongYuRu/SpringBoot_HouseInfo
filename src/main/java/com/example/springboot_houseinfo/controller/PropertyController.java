package com.example.springboot_houseinfo.controller;

import com.example.springboot_houseinfo.pojo.Property;
import com.example.springboot_houseinfo.service.PropertyService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    /*分页页面*/
    @RequestMapping(value = "/property", method = RequestMethod.GET)
    public ResponseEntity<PageInfo<Property>> findPropertyByPage(Integer pageNum, Integer pageSize) {
        try {
            PageInfo<Property> pageInfo = propertyService.findPropertyByPage(pageNum, pageSize);
            if (pageInfo.getList() == null || pageInfo.getList().size() == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(pageInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    /*添加简历信息*/
    @RequestMapping(value = "/property",method = RequestMethod.POST)
    public ResponseEntity<Void> insertProperty(Property property){
        try {
            propertyService.insertProperty(property);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    //   /* 更新修改简历信息*/
    @RequestMapping(value = "/property",method = RequestMethod.PUT)
    public ResponseEntity<Void> updateProperty(@RequestBody Property property){
        try {
           propertyService.updateProperty(property);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    //删除简历信息
    @RequestMapping(value = "/property/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteProperty(@PathVariable("id") Integer id){
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
