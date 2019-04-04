package com.thoughtworks.collection;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class MyMap {

    List<Integer> array;
    private String[] letters = new String[]{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
            "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"};
    private List<String> letterList = Arrays.asList(letters);

    public MyMap(List<Integer> array) {
        this.array = array;
    }

    public List<Integer> getTriple() {
        return array.stream().map(i -> i*3).collect(Collectors.toList());
    }

    public List<String> mapLetter() {
        return array.stream().map(i -> letters[i - 1]).collect(Collectors.toList());
    }

    public List<String> mapLetters() {
        return array.stream().map(integer ->
                {
                    String s = "";
                    if(integer <= 26){
                        s = letters[integer - 1];
                    }else {
                        int repeat = integer / 26;
                        if (integer % 26 != 0){
                            s += letters[repeat - 1];
                            s += letters[integer % 26 -1];
                        }else{
                            s += letters[repeat - 2];
                            s += "z";
                        }
                    }
                    return s;
                }
        ).collect(Collectors.toList());
    }

    public List<Integer> sortFromBig() {
        array.sort(Comparator.comparingInt(i -> -i));
        return array;
    }

    public List<Integer> sortFromSmall() {
        array.sort(Comparator.comparingInt(i -> i));
        return array;
    }
}
