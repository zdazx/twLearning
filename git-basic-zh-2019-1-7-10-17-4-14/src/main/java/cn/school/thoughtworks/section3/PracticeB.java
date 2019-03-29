package cn.school.thoughtworks.section3;

import java.util.List;
import java.util.Map;

public class PracticeB {
    Map<String,Integer> createUpdatedCollection(Map<String,Integer> collectionA, Map<String,List<String>> object) {
        List<String> value = object.get("value");
        value.forEach(s -> {
            if (collectionA.containsKey(s))
                if (collectionA.get(s) >= 3)
                    collectionA.put(s, collectionA.get(s) - collectionA.get(s) / 3);
        });
        return collectionA;
    }
}
