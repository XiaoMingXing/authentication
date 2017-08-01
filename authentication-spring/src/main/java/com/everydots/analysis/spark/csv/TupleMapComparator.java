package com.everydots.analysis.spark.csv;

import scala.Tuple2;

import java.io.Serializable;
import java.util.Comparator;

public class TupleMapComparator implements Comparator<Tuple2<String, Integer>>, Serializable {
    @Override
    public int compare(Tuple2<String, Integer> tuple1, Tuple2<String, Integer> tuple2) {

        if (tuple1._2.compareTo(tuple2._2) == 0) {
            return tuple1._1.compareTo(tuple2._1);
        }
        return -tuple1._2.compareTo(tuple2._2);
    }
}