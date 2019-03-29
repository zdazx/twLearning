package cn.school.thoughtworks.section3;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PracticeD {
    Map<String,Integer> createUpdatedCollection(List<String> collectionA, Map<String,List<String>> object) {
        HashMap<String, Integer> collection3 = new HashMap<>();
        collectionA.forEach(s -> {
            int step = 1;
            if (s.indexOf("-") != -1) {
                step = Integer.parseInt(s.substring(s.indexOf("-") + 1));
                s = s.substring(0, s.indexOf("-"));
            }
            if (collection3.containsKey(s))
                collection3.put(s, collection3.get(s) + step);
            else
                collection3.put(s, step);
        });
        List<String> value = object.get("value");
        value.forEach(s -> {
            if (collection3.containsKey(s))
                if (collection3.get(s) >= 3)
                    collection3.put(s, collection3.get(s) - collection3.get(s) / 3);
        });
        return collection3;
    }
}
