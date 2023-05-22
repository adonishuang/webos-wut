package org.example.pojo;

import lombok.Data;

import java.lang.reflect.Array;

@Data
public class Gateways {
    private int id;
    private String name;
    private double value[];
    private String ip;
    public double[] getValue() {
        return value;
    }

    public void setValue(double[] value) {
        this.value = value;
    }
}
