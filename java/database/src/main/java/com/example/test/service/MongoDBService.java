package com.example.test.service;

import org.bson.Document;

public interface MongoDBService {
    public Object createCollection();
    public Object collectionInsert(String collectionName, Document noSql);


}
