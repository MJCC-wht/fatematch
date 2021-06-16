package com.fate.match.util;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class StringUtil {

    // email正则
    public String emailRegex = "\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}";
    // url正则
    public String urlRegex = "^((https|http)?:\\/\\/)[^\\s]+";
    // 用户名正则
    public String userAccountRegex = "[a-z0-9A-Z]{3,16}";
    // 密码正则
    public String passwordRegex = "[a-z0-9A-Z]{6,32}";

    public boolean check(String text, String regex) {
        if (!StringUtils.hasLength(text)) {
            return false;
        } else {
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(text);
            return matcher.matches();
        }
    }

    public String listToString(List<String> list, String sep) {
        if (list == null || list.size() == 0) return null;
        StringBuilder str = new StringBuilder();
        for (String s: list) {
            str.append(s).append(sep);
        }
        str.deleteCharAt(str.length() - 1);
        return str.toString();
    }

}


