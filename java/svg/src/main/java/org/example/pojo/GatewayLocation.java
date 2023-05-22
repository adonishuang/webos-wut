package org.example.pojo;

import lombok.Data;

@Data
public class GatewayLocation {
    private int id;
    private String name;
    private String location;
    private String latitude;
    private String longitude;
}
