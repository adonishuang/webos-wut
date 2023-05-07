package com.example.test.controller;

import com.example.test.service.MongoDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = {"*","null"})
public class JDBCController {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    @Qualifier("dataSourceMysql")
    private JdbcTemplate mysqlTemplate;
    @Autowired
    @Qualifier("dataSourceSqlite")
    private JdbcTemplate sqliteTemplate;

    @Autowired
    MongoDBService mongoDBService;
    /**
     * 用于查询
     * @param type
     * @param sql
     * @return
     */
    @ResponseBody
    @GetMapping("/query")
    public Object query(@RequestParam(value = "type",required = true) String type, @RequestParam(value = "sql", required = false)String sql){
        List<Map<String, Object>> list;
       if(Objects.equals(type, "mysql")){
            list = mysqlTemplate.queryForList(sql);
       }else{
            list = sqliteTemplate.queryForList(sql);
       }
       return list;
    }
    // 获取Mysql的数据表
    @ResponseBody
    @GetMapping("/getMysqlTableName")
    public Object getMysqlTableName(){
        List<Map<String, Object>> list;
        String sql = "select TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA=(select database())";
        list = mysqlTemplate.queryForList(sql);
        return list;
    }
    @ResponseBody
    @GetMapping("/getMysqlTableIndexName")
    public Object getMysqlIndexName(@RequestParam(value = "tableName", required = false)String tableName){
        List<Map<String, Object>> list;
        String sql = "select COLUMN_NAME from information_schema.COLUMNS where TABLE_SCHEMA = (select database()) and TABLE_NAME='"+tableName+"';";
        list = mysqlTemplate.queryForList(sql);
        return list;
    }

    //获取Sqlite的数据表
    @ResponseBody
    @GetMapping("/getSqliteTableName")
    public Object getSqliteTableName(){
        List<Map<String, Object>> list;
        String sql = "SELECT name _id FROM sqlite_master WHERE type ='table'";
        list = sqliteTemplate.queryForList(sql);
        return list;
    }
    /**
     * 用于查询
     * @param type
     * @param sql
     * @return
     */
    @ResponseBody
    @GetMapping("/operate")
    public String otherOperation(@RequestParam(value = "type",required = true) String type, @RequestParam(value = "sql", required = false)String sql){
        if(Objects.equals(type, "mysql")){
            mysqlTemplate.execute(sql);
        }else{
            sqliteTemplate.update(sql);
        }
        return  "执行成功";
    }
}
