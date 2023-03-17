package com.example.springboot_houseinfo.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Register {
    private Integer id;
    private String usernames;
    private String passwords;
}
