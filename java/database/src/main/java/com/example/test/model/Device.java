package com.example.test.model;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.*;

import java.io.Serializable;

@Data
@Accessors(chain = true)
@Document("device_collection")
public class Device implements Serializable {
    @MongoId
    private String id;
    @Field("device_name")
    private String deviceName;
    @Field("device_code")
    private String deviceCode;
    @Field("device_Id")
    private String deviceId;
}
