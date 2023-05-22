package org.example.controller;

import com.google.gson.Gson;
import org.example.mapper.InfoMapper;
import org.example.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.*;

@RestController
@SuppressWarnings("all")
@CrossOrigin(origins = {"*","null"})
public class GatewayController {
    @Autowired
    InfoMapper infoMapper;

    private Gson gson =new Gson();


    @GetMapping("/test11")
    public String test1(){
        List<Info> users = infoMapper.selectList(null);
        return gson.toJson(users);
    }
    @GetMapping("/test12")
    public String test12(){
        Info users = infoMapper.selectById(1);
        System.out.println(1);
        return gson.toJson(users);
    }
    /*
    获取每个省网关数量
     */
    @GetMapping("/gateway/getNum")
    public Result getNum(){
        List<Info> gatewayList = infoMapper.selectList(null);
        HashMap<String,Integer> hsm=new HashMap<String, Integer>();
        List<Map<String,String>> str=null;
        String [] provinces = {"北京","天津","上海","重庆get","河北","河南","云南","辽宁","黑龙江","湖南","安徽","山东","新疆","江苏","浙江","江西",
                "湖北","广西","甘肃","山西","内蒙古","陕西","吉林","福建","贵州","广东","青海","西藏","四川","宁夏","海南","台湾","香港","澳门"};
        //全部信息存入中间件，后期添加
        for (int i=0;i<provinces.length;i++){
            hsm.put(provinces[i],0);
        }
        for (int j=0;j<gatewayList.size();j++){
            hsm.put(gatewayList.get(j).getLocation(),hsm.get(gatewayList.get(j).getLocation())+1);
        }
        //只给前端返回网关id、网关名称、网关地址
        return Result.success(hsm);
    }
    /*
    获取某个省的网关列表
     */
    @PostMapping("/gateway/getList")
    public Result getList(@RequestBody String province){
        Map <String,String> location = gson.fromJson(province,Map.class);
        String l=location.get("province");
        List<Info> gatewayList=infoMapper.queryLocation(l);
        List <Gateways> result = new ArrayList<>();
        for (int i=0;i<gatewayList.size();i++){
            Gateways gateway = new Gateways();
            gateway.setId(gatewayList.get(i).getId());
            double temp[]=new double[2];
            temp[0]=Double.parseDouble(gatewayList.get(i).getLongitude());
            temp[1]=Double.parseDouble(gatewayList.get(i).getLatitude());
            gateway.setValue(temp);
            gateway.setName(gatewayList.get(i).getName());
            gateway.setIp(gatewayList.get(i).getIp());
            result.add(gateway);
            System.out.println(gateway);
        }
        return Result.success(result);
    }

    /*
    获取某个网关的详细信息
     */
    @PostMapping("/gateway/selectOne")
    public Result getLocationList(@RequestBody String id){
        Map <String,String> gatewayID = gson.fromJson(id,Map.class);
        System.out.println(gatewayID);
        Info gateway = infoMapper.selectById(Integer.parseInt(gatewayID.get("id"))); //数据库查询，后期可改为从中间件查询
        return  Result.success(gateway);
    }

}

