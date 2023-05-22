package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.User;

import java.util.List;

public interface UserMapper extends BaseMapper<User> {
    @Select("select name,psd from user where name=#{name}")
    public User queryUser(String name);
}
