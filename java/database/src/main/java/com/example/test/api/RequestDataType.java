package com.example.test.api;

import com.example.test.model.Device;
import com.example.test.model.Factory;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public class RequestDataType {
    @Autowired
    private Device device;
    @Autowired
    private Factory factory;
    private String property;
    private Object value;

}
