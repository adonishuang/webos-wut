package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.example.pojo.Info;
import org.example.pojo.User;

import java.util.List;

public interface InfoMapper extends BaseMapper<Info> {
    @Select("select * from info where location=#{location}")
    public List<Info> queryLocation(String location);
}
