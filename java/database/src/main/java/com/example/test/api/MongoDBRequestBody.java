package com.example.test.api;

import com.example.test.model.Device;
import com.example.test.model.Factory;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Data
public class MongoDBRequestBody{
    @Autowired
    private Device device;
    @Autowired
    private Factory factory;
    private String model;
    private String operate;

    private String property;
    private String value;
    private String newValue;
}

