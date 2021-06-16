package com.fate.match.util;

import org.springframework.stereotype.Component;

import java.text.DecimalFormat;

@Component
public class MatchUtil {

    /**
     * 两个兴趣字符串进行严格匹配得到最终结果
     * @param client_interests 匹配字符串主串
     * @param server_interests 匹配字符串副串
     * @return 返回匹配的结果（二进制）
     */
    public String match_interests_strict(String client_interests, String server_interests) {
        StringBuilder result_interests_temp = new StringBuilder(84);
        String[] client_fraction = client_interests.split("a");
        String[] server_fraction = server_interests.split("a");
        for (int i = 0; i < 8; i++) {
            result_interests_temp.append((Integer.parseInt(client_fraction[i]) &
                    Integer.parseInt(server_fraction[i])));
            result_interests_temp.append("a");
        }
        return Interest_Change(result_interests_temp.toString());
    }

    /**
     * 查看兴趣字符串是否符合规范
     * @param interests 兴趣字符串
     * @return 是否符合规范的结果
     */
    public Boolean check_interests(String interests) {
        String[] fraction = interests.split("a");
        return fraction.length == 8;
    }

    /**
     * 两个兴趣字符串进行宽松匹配得到的结果
     * @param client_interests 匹配字符串主串
     * @param server_interests 匹配字符串副串
     * @return 匹配的结果（二进制表示）
     */
    public String match_interests_loose(String client_interests, String server_interests) {
        StringBuilder result_interests_temp = new StringBuilder(84);
        String[] client_fraction = client_interests.split("a");
        String[] server_fraction = server_interests.split("a");
        for (int i = 0; i < 8; i++) {
            result_interests_temp.append((Integer.parseInt(client_fraction[i]) ^
                    Integer.parseInt(server_fraction[i])));
            result_interests_temp.append("a");
        }
        return Interest_Change(result_interests_temp.toString());
    }

    /**
     * 计算匹配的到的字符串代表的匹配度
     * @param match_string 需要计算的匹配字符串
     * @param searchStr 需要进行计算的比重字符串（0或1）
     * @return 返回占比结果
     */
    public String compute_match(String match_string, String searchStr) {
        int count;
        int originalLength = match_string.length();
        String str_temp = match_string.replace(searchStr, "");
        int newLength = str_temp.length();
        count = originalLength - newLength;
        double result = (double)count / (double)originalLength * 100;
        DecimalFormat df = new DecimalFormat("#.00");
        return df.format(result);
    }

    /**
     * 将数据库中规定的兴趣字符串格式转换为二进制
     * @param inter_str 兴趣字符串
     * @return 返回转换的二进制结果
     */
    public String Interest_Change(String inter_str) {
        if (inter_str != null) {
            int[] inter_num = new int[8];
            inter_num[0] = 12;
            inter_num[1] = 11;
            inter_num[2] = 8;
            inter_num[3] = 13;
            inter_num[4] = 12;
            inter_num[5] = 11;
            inter_num[6] = 11;
            inter_num[7] = 6;
            int i = 0;
            StringBuilder final_inter = new StringBuilder(84);
            for(String fraction: inter_str.split("a")) {
                int fraction_num = Integer.parseInt(fraction);
                String fraction_num_binary = Integer.toBinaryString(fraction_num);
                if (fraction_num_binary.length() < inter_num[i]) {
                    // 添加0字符和有用信息
                    String fraction_inter = "0".repeat(inter_num[i] - fraction_num_binary.length()) +
                            fraction_num_binary;
                    final_inter.append(fraction_inter);
                } else {
                    final_inter.append(fraction_num_binary);
                }
                i++;
            }
            return final_inter.toString();
        } else {
            return null;
        }
    }

    /**
     * 计算性格的匹配加分
     * @param client_characters 性格主串
     * @param server_characters 性格副串
     * @return 加分结果
     */
    public Double Character_Bonus(String client_characters, String server_characters) {
        if (client_characters == null || server_characters == null) {
            return 0.00;
        }
        int client = Integer.parseInt(client_characters);
        int server = Integer.parseInt(server_characters);
        String result = Character_Change(client & server);
        int count;
        int original_length = result.length();
        String str_temp = result.replace("1","");
        int new_length = str_temp.length();
        count = original_length - new_length;
        switch (count) {
            case 0:
                return 0.00;
            case 1:
                return 2.00;
            case 2:
                return 5.00;
            case 3:
                return 11.00;
            default:
                return null;
        }
    }

    /**
     * 将性格字符串转换为二进制
     * @param character 性格字符串
     * @return 返回转换为二进制的结果
     */
    public String Character_Change(int character) {
        int total = 9;
        String chara_temp = Integer.toBinaryString(character);
        if(chara_temp.length() < total) {
            return "0".repeat(total - chara_temp.length()) + chara_temp;
        }
        return chara_temp;
    }
}
