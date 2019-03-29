package cn.school.thoughtworks.section3;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PracticeC {
    Map<String,Integer> createUpdatedCollection(List<String> collectionA, Map<String,List<String>> object) {
        HashMap<String, Integer> collection3 = new HashMap<>();
        collectionA.forEach(s -> {
            if (collection3.containsKey(s))
                collection3.put(s, collection3.get(s) + 1);
            else
                collection3.put(s, 1);
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
