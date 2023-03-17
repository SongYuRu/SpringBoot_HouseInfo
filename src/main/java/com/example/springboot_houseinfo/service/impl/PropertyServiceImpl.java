package com.example.springboot_houseinfo.service.impl;

import com.example.springboot_houseinfo.mapper.PropertyMapper;
import com.example.springboot_houseinfo.pojo.Property;
import com.example.springboot_houseinfo.service.PropertyService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.List;

@Service("propertyService")
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyMapper propertyMapper;

    @Override
    public PageInfo<Property> findPropertyByPage(Integer pageNum, Integer pageSize) {
        try {
            PageHelper.startPage(pageNum,pageSize);
            List<Property> resumeList = propertyMapper.findPropertys();
            PageInfo<Property> pageInfo = new PageInfo<Property>(resumeList,5);
            return pageInfo;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void insertProperty(Property property) {
     /*   //日期(获取property 创建时间)
        LocalDate singTime = property.getRegistrationTime();
        //切换年月日
        Period contractTerm = Period.ofYears(property.getPurpose());
        *//*Period contractTerm = Period.ofDays(property.getPurpose());*//*
        //日期相加用 plus
        //减 minus

        LocalDate lifeSpan = singTime.plus(contractTerm);
        property.setLifeSpan(lifeSpan);*/
        String lifSpan = property.getLifeSpan();
        property.setLifeSpan(lifSpan);
       propertyMapper.insertProperty(property);
    }
    //
    @Override
    public boolean updateProperty(Property property) {
        return propertyMapper.updateProperty(property);
    }
    //
    @Override
    public void deleteProperty(Integer id) {
        propertyMapper.deleteProperty(id);
    }
}


/*
  一、LocalDate的用法及作用：

          1、jdk8以后，多了许多的工具类，比较常见的就包括现在看到的LocalDate，一个日期处理类。

          1)java.time.LocalDate ——只能对年月日进行处理。                         2021-05-23

          2）java.time.LocalTime——只能对时分秒纳秒进行处理。               10:28:31.572

          　3)java.time.LocalDateTime——同时处理年月日时分秒纳秒。           2021-05-23T10:28:31.572

          2、LocalDate的用法：

          　　 1）获取当前的时间     LocalDate.now()。

          　　　2)   获取当前时间是当月的第几天   LocalDate.now().getDayOfMonth()。

          　　　3）获取当前时间是一周内的第几天   LocalDate.now().getDayOfWeek()。             Monday—Sunday

          　　　4)   获取当前时间是一年的第几天   LocalDate.now().getDayOfYear()。

          　　　5）获取本月的第一天      LocalDate.now().with(TemporalAdjusters.firstDayOfMonth)；  TemporalAdjusters——时间调节器         2021-05-01

          　　    6）获取本月的最后一天   LocalDate.now().with(TemporalAdjusters.lastDayOfMonth);  2021-05-31

          　  7) 获取到本月最后一天+1天      LocalDate.now().with(TemporalAdjusters.lastDayOfMonth).plusDays(1);

          　　 8) 获取2021年的第一个周一    LocalDate.parse("2021-01-01").with(TemporalAdjusters.firstInMonth(DayfOWeek.Monday));  2021年的第一个周一是：2021-01-04

          　3、LocalDate的格式化不需要SimpleDateFormate（）的方法：

          　　  1) 先设置要解析成的日期格式：  DateTimeFormate df=new DateTimeFormate.ofPattern("YYYY年MM月dd日");

          　　　2）将当前日期（只有年月日）解析成上述格式的字符串：  String today=LocalDate.now().formate(df)；

          　　　3）输出判断 ：System.out.println(“today=”+today。concat("天天天天"))； 　today=2021年05月23日天天天天*/
