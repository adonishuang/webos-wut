package org.example.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.pojo.Device;
import org.example.pojo.Info;

import java.util.List;

public interface DeviceMapper extends BaseMapper<Device> {
    @Update("update device set status=#{s} where id=#{id}")
    public int updateStatus(String id,String s);
    @Update("update device set propertycodetype=#{propertycodetype},propertycode=#{propertycode},propertydesc=#{propertydesc},propertytype=#{propertytype},ip=#{ip} where id=#{id}")
    public int updateOne(String id,String propertycodetype,String propertycode,String propertydesc,String propertytype,String ip);
}
