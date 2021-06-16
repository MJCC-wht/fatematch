package com.fate.match.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Data
@ConfigurationProperties(prefix = "site")
public class SiteConfig {

    private List<String> corsDomain;
    private Integer pageSize;
    private Integer createTopicScore;
    private Integer createCommentScore;
    private Integer goodTopicScore;
    private List<String> admin;
    private List<String> ban;

}
