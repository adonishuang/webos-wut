package com.example.test.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.mysql")
    @Qualifier("dataSourceMysql")
    DataSource dsOne (){
        return DataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.sqlite")
    @Qualifier("dataSourceSqlite")
    DataSource dsTwo (){
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "dataSourceMysql")
    public JdbcTemplate primaryJdbcTemplate(
            @Qualifier("dataSourceMysql") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name = "dataSourceSqlite")
    public JdbcTemplate secondaryJdbcTemplate(
            @Qualifier("dataSourceSqlite") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

}
