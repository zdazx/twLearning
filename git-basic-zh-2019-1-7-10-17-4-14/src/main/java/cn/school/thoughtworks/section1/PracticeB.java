package cn.school.thoughtworks.section1;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PracticeB {
    List<String> collectSameElements(List<String> collection1, List<List<String>> collection2) {
        //先一次扁平化后再判断，不然每次都要来一下
        List<String> flat = Arrays.stream(collection2
                .stream()
                .map(list -> list
                        .stream()
                        .collect(Collectors.joining(",")))
                .collect(Collectors.joining(","))
                .split(","))
                .collect(Collectors.toList());
        return collection1.stream().filter(s -> flat.contains(s))
                .collect(Collectors.toList());
    }
}
