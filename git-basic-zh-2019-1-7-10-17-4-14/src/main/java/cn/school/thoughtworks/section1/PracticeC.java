package cn.school.thoughtworks.section1;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public class PracticeC {
    List<String> collectSameElements(List<String> collection1, Map<String,List<String>> collection2) {
        List<String> value = collection2.get("value");
        return collection1.stream()
                .filter(s -> value.contains(s))
                .collect(Collectors.toList());
    }
}
