package com.example.test.common;

import com.alibaba.druid.sql.ast.SQLStatement;
import com.alibaba.druid.sql.parser.ParserException;
import com.alibaba.druid.sql.parser.SQLParserUtils;
import com.alibaba.druid.sql.parser.SQLStatementParser;
import sun.reflect.generics.tree.ReturnType;

import java.util.List;

public class SqlFormatUtil {
    /**
     * 判断Sql语句是否合法 可能后续还需要继续优化
     * @param sql 输入的sql语句
     * @return
     */
    public static void sqlFormat(String sql){
        /*List<SQLStatement> statementList = null;
        SQLStatementParser parser = null;
        ReturnType returnType = new ReturnType();
        try {
            parser = SQLParserUtils.createSQLStatementParser(sql, "mysql");
            statementList = parser.parseStatementList();
        } catch (ParserException e) {
            System.out.println("SQL转换中发生了错误：" + e.getMessage());
            returnType.setCode(0);
            returnType.setMessage("SQL转换中发生了错误：" + e.getMessage());
            return returnType;
        }
        returnType.setCode(1);
        returnType.setMessage("SQL语句无误");
        return returnType;*/
    }

}

