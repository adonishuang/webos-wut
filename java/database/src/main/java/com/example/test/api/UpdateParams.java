package com.example.test.api;

import lombok.Data;

@Data
public class UpdateParams {
    String prevProperty;
    String newValue;
    String newProperty;
    String prevValue;
}
