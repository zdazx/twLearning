package cn.school.thoughtworks.section2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PracticeA {
    Map<String,Integer> countSameElements(List<String> collection1) {
        HashMap<String, Integer> value = new HashMap<>();
        collection1.forEach(s -> {
            if (value.containsKey(s))
                value.put(s, value.get(s) + 1);
            else
                value.put(s, 1);
        });
        return value;
    }
}
