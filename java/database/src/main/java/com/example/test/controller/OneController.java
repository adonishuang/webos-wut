package com.example.test.controller;

import com.example.test.api.PostRequestBody;
import com.example.test.api.UpdateParams;
import com.example.test.common.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin(origins = {"*","null"})
public class OneController {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    @Qualifier("dataSourceMysql")
    private JdbcTemplate mysqlTemplate;
    @Autowired
    @Qualifier("dataSourceSqlite")
    private JdbcTemplate sqliteTemplate;

    @RequestMapping("/request")
    public Object requestDataBase(@RequestBody PostRequestBody postRequestBody) throws ClassNotFoundException {
        if (Objects.equals(postRequestBody.getDatabaseType(), "mongodb")) {
            System.out.println(postRequestBody);
            // 处理非关系型数据库
            String classPath = "com.example.test.model." + postRequestBody.getModel();
            Class RequestClass = Class.forName(classPath);
            Result result = new Result();
            switch (postRequestBody.getOperate()) {
                case "save":
                    Object obj = null;
                    switch (postRequestBody.getModel()) {
                        case "Device":
                            obj = postRequestBody.getDevice();
                            break;
                        case "Factory":
                            obj = postRequestBody.getFactory();
                            break;
                    }
                    assert obj != null;
                    mongoTemplate.save(obj);
                    return Result.success("执行成功");
                case "find":
                    Object list = null;
                    if (postRequestBody.getFindParams() == null) {
                        list = mongoTemplate.findAll(RequestClass);
                    } else {
                        Query query = Query.query(Criteria.where(postRequestBody.getFindParams().getProperty()).is(postRequestBody.getFindParams().getValue()));
                        list = mongoTemplate.findOne(query, RequestClass);
                    }
                    return Result.success(list);
                case "delete":
                    System.out.println(postRequestBody.getFindParams());
                    Query deleteQuery = Query.query(Criteria.where(postRequestBody.getFindParams().getProperty()).is(postRequestBody.getFindParams().getValue()));
                    mongoTemplate.remove(deleteQuery, RequestClass);
                    return Result.success("删除成功");
                case "update":
                    Query updateQuery = Query.query(Criteria.where(postRequestBody.getUpdateParams().getPrevProperty()).is(postRequestBody.getUpdateParams().getPrevValue()));
                    Update update = Update.update(postRequestBody.getUpdateParams().getNewProperty(), postRequestBody.getUpdateParams().getNewValue());
                    mongoTemplate.updateMulti(updateQuery, update, RequestClass);
                    return Result.success("更新成功");
            }
            return result;
        } else if (Objects.equals(postRequestBody.getDatabaseType(), "sqlite")) {
            //处理关系型数据库
            if (Objects.equals(postRequestBody.getOperate(), "find")) {
                Object list = mysqlTemplate.queryForList(postRequestBody.getSql());
                return Result.success(list);
            } else {
                mysqlTemplate.execute(postRequestBody.getSql());
                return Result.success("执行成功");
            }
//            if (Objects.equals(postRequestBody.getOperate(), "find")) {
//                Object list = sqliteTemplate.queryForList(postRequestBody.getSql());
//                return Result.success(list);
//            } else {
//                sqliteTemplate.execute(postRequestBody.getSql());
//                return Result.success("执行成功");
//            }
        } else if (Objects.equals(postRequestBody.getDatabaseType(), "mysql")) {
            if (Objects.equals(postRequestBody.getOperate(), "find")) {
                Object list = mysqlTemplate.queryForList(postRequestBody.getSql());
                return Result.success(list);
            } else {
                mysqlTemplate.execute(postRequestBody.getSql());
                return Result.success("执行成功");
            }
        }
        return Result.error("出错了");
    }

    ;


    private String executeSqlInsert(Object data) {
        return "insert into";
    }

    private String executeSqlDelete(Object data) {
        return "delete from ";
    }

    private String executeSqlUpdate(Object data) {
        return "update ";
    }

    private String executeSqlFind(Object data) {
        return "select from";
    }
}
