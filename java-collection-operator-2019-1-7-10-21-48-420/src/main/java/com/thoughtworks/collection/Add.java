package com.thoughtworks.collection;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Add {
    public int getSumOfEvens(int leftBorder, int rightBorder) {
        CollectionOperator collectionOperator = new CollectionOperator();
        List<Integer> list = collectionOperator.getEvenListByIntervals(leftBorder, rightBorder);
        return list.stream().mapToInt(Integer::intValue).sum();
    }

    public int getSumOfOdds(int leftBorder, int rightBorder) {
        CollectionOperator collectionOperator = new CollectionOperator();
        List<Integer> list = collectionOperator.getEvenListByIntervals(leftBorder, rightBorder);
        return list.stream().mapToInt(Integer::intValue).sum() - list.size();
    }

    public int getSumTripleAndAddTwo(List<Integer> arrayList) {
        List<Integer> list = arrayList.stream().map(i -> i*3+2).collect(Collectors.toList());
        return list.stream().mapToInt(Integer::intValue).sum();
    }

    public List<Integer> getTripleOfOddAndAddTwo(List<Integer> arrayList) {
        List<Integer> list = arrayList.stream().map(i -> {
            if (i%2 != 0){
                return  i*3 + 2;
            }else
                return i;
        }).collect(Collectors.toList());
        return list;
    }

    public int getSumOfProcessedOdds(List<Integer> arrayList) {
        List<Integer> list = arrayList.stream().filter(i -> i%2 != 0)
                .map(i -> i*3+5).collect(Collectors.toList());
        return list.stream().mapToInt(Integer::intValue).sum();

    }

    public double getMedianOfEven(List<Integer> arrayList) {
        List<Integer> list = arrayList.stream().filter(i -> i%2 == 0).collect(Collectors.toList());
        if (list.size() %2 == 0){
            return (double) (list.get(list.size()/2 - 1) + list.get(list.size()/2))/2;
        }else {
            return (double) list.get(list.size()/2);
        }
    }

    public double getAverageOfEven(List<Integer> arrayList) {
        List<Integer> list = arrayList.stream().filter(i -> i%2 ==0).collect(Collectors.toList());
        return list.stream().mapToDouble(Integer::doubleValue).average().getAsDouble();
    }

    public boolean isIncludedInEvenIndex(List<Integer> arrayList, Integer specialElment) {
        if(specialElment %2 != 0){
            return false;
        }
        return arrayList.stream().filter(i -> i%2==0).collect(Collectors.toList()).contains(specialElment);
    }

    public List<Integer> getUnrepeatedFromEvenIndex(List<Integer> arrayList) {
        return arrayList.stream().filter(i -> i%2 == 0).distinct().collect(Collectors.toList());
    }

    public List<Integer> sortByEvenAndOdd(List<Integer> arrayList) {
        List<Integer> list1 = arrayList.stream().filter(i -> i%2 == 0).collect(Collectors.toList());
        List<Integer> list2 = arrayList.stream().filter(i -> i%2 != 0).collect(Collectors.toList());
        list1.sort(Comparator.comparingInt(x -> x));
        list2.sort(Comparator.comparingInt(x -> -x));
        return new ArrayList<Integer>(){{
            addAll(list1);
            addAll(list2);
        }};
    }

    public List<Integer> getProcessedList(List<Integer> arrayList) {
        List<Integer> list = new ArrayList<>();
        for (int i = 1; i < arrayList.size(); i++) {
            list.add((arrayList.get(i-1)+arrayList.get(i))*3);
        }
        return list;
    }
}
