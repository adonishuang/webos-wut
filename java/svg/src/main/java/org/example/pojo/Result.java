package org.example.pojo;



import org.example.pojo.HttpStatus;
import org.springframework.util.StringUtils;

import java.util.HashMap;

public class Result extends HashMap<String, Object>
{
    private static final long serialVersionUID = 1L;

    /** 状态码 */
    public static final String CODE_TAG = "code";

    /** 返回内容 */
    public static final String MSG_TAG = "msg";

    /** 数据对象 */
    public static final String DATA_TAG = "data";

    /**
     * 初始化一个新创建的 ResultBean 对象，使其表示一个空消息。
     */
    public Result()
    {
    }

    /**
     * 初始化一个新创建的 ResultBean 对象
     *
     * @param code 状态码
     * @param msg 返回内容
     */
    public Result(int code, String msg)
    {
        super.put(CODE_TAG, code);
        super.put(MSG_TAG, msg);
    }

    /**
     * 初始化一个新创建的 ResultBean 对象
     *
     * @param code 状态码
     * @param msg 返回内容
     * @param data 数据对象
     */
    public Result(int code, String msg, Object data)
    {
        super.put(CODE_TAG, code);
        super.put(MSG_TAG, msg);
        if (!StringUtils.isEmpty(data))
        {
            super.put(DATA_TAG, data);
        }
    }

    /**
     * 返回成功消息
     *
     * @return 成功消息
     */
    public static org.example.pojo.Result success()
    {
        return org.example.pojo.Result.success("操作成功");
    }

    /**
     * 返回成功数据
     *
     * @return 成功消息
     */
    public static org.example.pojo.Result success(Object data)
    {
        return org.example.pojo.Result.success("操作成功", data);
    }

    /**
     * 返回成功消息
     *
     * @param msg 返回内容
     * @return 成功消息
     */
    public static org.example.pojo.Result success(String msg)
    {
        return org.example.pojo.Result.success(msg, null);
    }

    /**
     * 返回成功消息
     *
     * @param msg 返回内容
     * @param data 数据对象
     * @return 成功消息
     */
    public static org.example.pojo.Result success(String msg, Object data)
    {
        return new org.example.pojo.Result(HttpStatus.SUCCESS, msg, data);
    }

    /**
     * 返回错误消息
     *
     * @return
     */
    public static org.example.pojo.Result error()
    {
        return org.example.pojo.Result.error("操作失败");
    }

    /**
     * 返回错误消息
     *
     * @param msg 返回内容
     * @return 警告消息
     */
    public static org.example.pojo.Result error(String msg)
    {
        return org.example.pojo.Result.error(msg, null);
    }

    /**
     * 返回错误消息
     *
     * @param msg 返回内容
     * @param data 数据对象
     * @return 警告消息
     */
    public static org.example.pojo.Result error(String msg, Object data)
    {
        return new org.example.pojo.Result(HttpStatus.ERROR, msg, data);
    }

    /**
     * 返回错误消息
     *
     * @param code 状态码
     * @param msg 返回内容
     * @return 警告消息
     */
    public static org.example.pojo.Result error(int code, String msg)
    {
        return new org.example.pojo.Result(code, msg, null);
    }
}

