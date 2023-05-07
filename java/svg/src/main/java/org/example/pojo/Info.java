package org.example.pojo;

import lombok.Data;

import java.io.Serializable;
@Data
public class Info implements Serializable {
    private static final long serialVersionUID = -28208826483755870L;

    private Integer id;
    /**
     * 网关标识编码
     */
    private String code;
    /**
     * 网关名称

     */
    private String name;
    /**
     * 网关所处位置
     */
    private String location;
    private String latitude;
    private String longitude;
    /**
     * 网关运行状态
     */
    private Integer status;
    /**
     * 总内存大小
     */
    private Integer totalmemory;
    /**
     * 当前使用内存大小
     */
    private Integer realmemory;
    /**
     * 当前使用网关版本
     */
    private String version;
    /**
     * 当前cpu使用率
     */
    private String cpurate;
    /**
     * 操作系统信息
     */
    private String systeminfo;
    /**
     * cpu核心数
     */
    private Integer cpucores;
    /**
     * 硬盘总容量
     */
    private Integer totalstorage;
    /**
     * 当前使用的硬盘容量
     */
    private Integer realstorage;
    /**
     * ip地址
     */
    private String ip;
    /**
     * 所属用户
     */
    private String uname;
}
