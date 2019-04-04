package com.thoughtworks.collection;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;

public class CollectionOperator {
    public List<Integer> getListByInterval(int left, int right) {
        List<Integer> res = new ArrayList<>();
        if (left > right) {
            for (int i = left; i >= right; i--) {
                res.add(i);
            }
        } else {
            for (int i = left; i <= right; i++) {
                res.add(i);
            }
        }
        return res;
    }

    public List<Integer> getEvenListByIntervals(int left, int right) {
        List<Integer> res = getListByInterval(left, right);
        return res.stream()
                .filter(i -> i%2 == 0)
                .collect(toList());
    }

    public List<Integer> popEvenElments(int[] array) {
        List<Integer> res = new ArrayList<>();
        for (int i = 0 ; i < array.length; i++) {
            if (array[i] %2 == 0){
                res.add(array[i]);
            }
        }
        return res;
    }

    public int popLastElment(int[] array) {
        if (array.length > 0)
            return array[array.length - 1];
        else
            return Integer.MAX_VALUE;
    }

    public List<Integer> popCommonElement(int[] firstArray, int[] secondArray) {
        List<Integer> list1 = IntStream.of(firstArray).boxed().collect(Collectors.toList());
        List<Integer> list2 = IntStream.of(secondArray).boxed().collect(Collectors.toList());
        return list1.stream().filter(i -> list2.contains(i)).collect(Collectors.toList());
    }

    public List<Integer> addUncommonElement(Integer[] firstArray, Integer[] secondArray) {
        List<Integer> list1 = Arrays.asList(firstArray).stream().collect(Collectors.toList());
        List<Integer> list2 = Arrays.asList(secondArray).stream().collect(Collectors.toList());
        for (Integer i: list2) {
            if (!list1.contains(i)){
                list1.add(i);
            }
        }
        return list1;
    }
}
