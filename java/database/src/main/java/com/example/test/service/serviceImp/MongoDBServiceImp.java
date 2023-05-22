package com.example.test.service.serviceImp;

import com.example.test.service.MongoDBService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;


@Service
public class MongoDBServiceImp implements MongoDBService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Object createCollection() {
        String collectionName ="users";
        mongoTemplate.createCollection(collectionName);
        return mongoTemplate.collectionExists(collectionName) ? "创建成功":"创建失败";
    }

    @Override
    public Object collectionInsert(String collectionName, Document noSql) {
        return null;
    }

}
