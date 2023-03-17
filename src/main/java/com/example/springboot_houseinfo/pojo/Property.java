package com.example.springboot_houseinfo.pojo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Property {
    private Integer id;
    private String name;
    private String address;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
   /* 1、LocalDate是日期对象，每次操作都会回到新的时间对象。
   2、可以直接分析日期字符串，生成LocalDate实例，和LocalTime操作一样简单。*/
    private LocalDate processingTime;
    private String number;
    private String cases;
    private String  stand;
    private String unitNumber;
    private String typeOfRight;
    private String natureOfRight;
    private Integer purpose;
    private String usableArea;
    private String coveredArea;
    private String structure;
    private Integer totalFloors;
    private Integer storyNumber;
    private String privateUseArea;
    private String exclusiveAcreage;
    private String mjft;
    private String exclusiveFloorSpace;
    private String apportionedFloorSpace;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate registrationTime;
    private String lifeSpan;
    private String abbreviation;

}
