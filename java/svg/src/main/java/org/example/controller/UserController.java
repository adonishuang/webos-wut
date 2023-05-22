package org.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import org.example.mapper.UserMapper;
import org.example.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;

@RestController
@SuppressWarnings("all")
@CrossOrigin(origins = {"*","null"})
public class UserController {
    @Autowired
    private UserMapper userMapper;
    private Gson gson=new Gson();
    @GetMapping("/test1")
    public String test1(){
        List<User> users = userMapper.selectList(null);
        return gson.toJson(users);
    }
    @PostMapping("/test2")
    public void test2(@RequestBody User user){
        userMapper.insert(user);
    }
    @PostMapping("/test3")
    public void test3(@RequestBody User user){
        userMapper.deleteById(user);
    }
    @PostMapping("/test4")
    public void test4(@RequestBody User user){
        userMapper.updateById(user);
    }
    @PostMapping("/login")
    public int loginUser(@RequestBody User user){
          String uname=user.getName();
          User user_selected = userMapper.queryUser(uname);
          if(user_selected==null){
              return -1;
           }
        return 1;
    }
    @PostMapping("/register")
    public void registerUser(@RequestBody User user){
        userMapper.insert(user);
    }
}
