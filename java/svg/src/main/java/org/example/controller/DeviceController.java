package org.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.google.gson.Gson;
import org.example.mapper.DeviceMapper;
import org.example.pojo.Device;
import org.example.pojo.Info;
import org.example.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@SuppressWarnings("all")
@CrossOrigin(origins = {"*","null"})
public class DeviceController {
    @Autowired
    DeviceMapper deviceMapper;
    private Gson gson=new Gson();
    @GetMapping("/test13")
    public String test13(){
        Device users = deviceMapper.selectById(1);
        System.out.println(1);
        return gson.toJson(users);
    }
    @PostMapping("/device/getList")
    public Result getLocationList(@RequestBody String id){
        Map<String,String> gatewayID = gson.fromJson(id,Map.class);
        System.out.println(gatewayID);
        System.out.println(id);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("gid",gatewayID.get("id"));//按网关id查询
        List<Device> deviceList = deviceMapper.selectList(wrapper);
//        if(deviceList.isEmpty()){
//            return Result.success("未连接设备");
//        }
        return  Result.success(deviceList);
    }
    @PostMapping("/device/add")
    public Result add(@RequestBody String deviceData){
        Device device = gson.fromJson(deviceData,Device.class); //前端数据转化为设备实体类
        deviceMapper.insert(device);
        return Result.success("添加成功");
    }
    @PostMapping("/device/delete")
    public Result delete(@RequestBody String id){
        Map<String,String> deviceID = gson.fromJson(id,Map.class);
        System.out.println(deviceID);
        QueryWrapper wrapper = new QueryWrapper();
        wrapper.eq("id",deviceID.get("id"));//按设备id查询
        deviceMapper.delete(wrapper); //按id删除
        return Result.success("删除成功");
    }
    @PostMapping("/device/updateOne")
    public void updateOne(@RequestBody String res){
        Map<String,String> deviceData = gson.fromJson(res,Map.class);
        String id=deviceData.get("id");
        String propertycodetype=deviceData.get("propertycodetype");
        String propertycode=deviceData.get("propertycode");
        String propertydesc=deviceData.get("propertydesc");
        String propertytype=deviceData.get("propertytype");
        String ip=deviceData.get("ip");
        deviceMapper.updateOne(id,propertycodetype,propertycode,propertydesc,propertytype,ip);
    }
    @PostMapping("/device/changeStatus")
    public void changeStatus(@RequestBody String res){
        Map<String,String> deviceID = gson.fromJson(res,Map.class);
        String id=deviceID.get("id");
        String s;
        if(String.valueOf(deviceID.get("status")).equals("false")){
            s="0";
        }
        else{
            s="1";
        }
        int result=deviceMapper.updateStatus(id,s);
    }
}
