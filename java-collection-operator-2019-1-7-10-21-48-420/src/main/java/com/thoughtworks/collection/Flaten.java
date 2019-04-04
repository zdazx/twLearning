package com.thoughtworks.collection;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Flaten {

    Integer[][] array;
    public Flaten(Integer[][] array) {
        this.array = array;
    }

    public List<Integer> transformToOneDimesional() {
        List<Integer[]> list = Arrays.asList(array);
        List<Integer> res = new ArrayList<>();
        for (Integer[] i : list) {
            res.addAll(Arrays.asList(i));
        }
        return res;
    }

    public List<Integer> transformToUnrepeatedOneDimesional() {
        List<Integer> list = transformToOneDimesional();
        return list.stream().distinct().collect(Collectors.toList());
    }
}
