package com.example.test.model;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.mapping.*;

import java.io.Serializable;

@Data
@Accessors(chain = true)
@Document("factory_collection")
public class Factory implements Serializable {
    @MongoId
    private String id;
    @Field("factory_name")
    private String factoryName;
    @Field("factory_code")
    private String factoryCode;
    @Field("factory_Id")
    private String factoryId;
}
