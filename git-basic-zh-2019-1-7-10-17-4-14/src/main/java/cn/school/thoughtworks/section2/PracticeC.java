package cn.school.thoughtworks.section2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PracticeC {
    Map<String, Integer> countSameElements(List<String> collection1) {
        HashMap<String, Integer> value = new HashMap<>();
        collection1.forEach(s -> {
            int step = 1;
            if (s.indexOf("-") != -1) {
                step = Integer.parseInt(s.substring(s.indexOf("-") + 1));
                s = s.substring(0, s.indexOf("-"));
            }
            if (s.indexOf(":") != -1) {
                step = Integer.parseInt(s.substring(s.indexOf(":") + 1));
                s = s.substring(0, s.indexOf(":"));
            }
            if (s.indexOf("[") != -1) {
                step = Integer.parseInt(s.substring(s.indexOf("[") + 1, s.length() - 1));
                s = s.substring(0, s.indexOf("["));
            }
            if (value.containsKey(s))
                value.put(s, value.get(s) + step);
            else
                value.put(s, step);
        });
        return value;
    }
}
