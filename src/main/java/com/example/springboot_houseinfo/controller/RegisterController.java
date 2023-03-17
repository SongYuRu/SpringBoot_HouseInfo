package com.example.springboot_houseinfo.controller;
import com.example.springboot_houseinfo.pojo.Register;
import com.example.springboot_houseinfo.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.bind.annotation.SessionAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;





@Controller
@SessionAttributes("loginRegister")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @RequestMapping(value = "/sessions",method = RequestMethod.POST)
    public ResponseEntity<Void> registerLogin(String usernames, String passwords, Map<String,Object> map){
        try {
            System.out.println(usernames);
            System.out.println(passwords);
            Register register = registerService.registerLogin(usernames,passwords);

            if (register == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            map.put("loginRegister",register);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @RequestMapping(value="/sessions",method = RequestMethod.GET)
    public ResponseEntity<Register> checkLogin(HttpServletRequest request){
        try {
            HttpSession sessions = request.getSession();
            Register loginRegister =(Register)  sessions.getAttribute("loginRegister");

            if(loginRegister == null){
                return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(loginRegister);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @RequestMapping(value="/sessions",method = RequestMethod.DELETE)
    public ResponseEntity<Register> registerLoginOut(HttpServletRequest request,Map<String,Object> map) {
        try {
            map.remove("loginRegister");
            request.getSession().invalidate();
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


