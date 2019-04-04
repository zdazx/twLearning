package com.thoughtworks.collection;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Reduce {

    List<Integer> arrayList;

    public Reduce(List<Integer> arrayList) {
        this.arrayList = arrayList;
    }

    public int getMaximum() {
        return arrayList.stream().max(Comparator.comparingInt(x -> x)).get();
    }

    public double getMinimum() {
        return arrayList.stream().min(Comparator.comparingInt(x -> x)).get();
    }

    public double getAverage() {
        return arrayList.stream().mapToInt(Integer::intValue).average().getAsDouble();
    }

    public double getOrderedMedian() {
        if (arrayList.size() %2 == 0){
            return (double) (arrayList.get(arrayList.size()/2 - 1) + arrayList.get(arrayList.size()/2))/2;
        }else {
            return (double) arrayList.get(arrayList.size()/2);
        }
    }

    public int getFirstEven() {
        return arrayList.stream().filter(i -> i%2 ==0).findFirst().get();
    }

    public int getIndexOfFirstEven() {
        for (int i = 0; i < arrayList.size(); i++) {
            if (arrayList.get(i) % 2 == 0) {
                return i;
            }
        }
        return -1;
    }

    public boolean isEqual(List<Integer> arrayList) {
        if (this.arrayList.size() != arrayList.size()) {
            return false;
        }
        for (int i = 0; i < this.arrayList.size(); i++) {
            if (this.arrayList.get(i) != arrayList.get(i)) {
                return false;
            }
        }
        return true;
    }

    public Double getMedianInLinkList(SingleLink singleLink) {
        if (arrayList.size() %2 == 0){
            return (double) (arrayList.get(arrayList.size()/2 - 1) + arrayList.get(arrayList.size()/2))/2;
        }else {
            return (double) arrayList.get(arrayList.size()/2);
        }
    }

    public int getLastOdd() {
        List<Integer> list = arrayList.stream().filter(i -> i%2 !=0).collect(Collectors.toList());
        return list.get(list.size() - 1);
    }

    public int getIndexOfLastOdd() {
        for (int i = arrayList.size() - 1; i >= 0; i--) {
            if (arrayList.get(i) % 2 == 1) {
                return i;
            }
        }
        return -1;
    }
}
