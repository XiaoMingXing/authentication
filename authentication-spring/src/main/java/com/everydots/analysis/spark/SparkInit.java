package com.everydots.analysis.spark;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import java.util.Arrays;

/**
 * Created by xiaomingxing on 17/1/8.
 */
public class SparkInit {

    static final String INPUT_FILE = "sparkData.txt";
    static final String OUTPUT_FOLDER = "cost-analysis/spartOutputFolder";

    public static void main(String[] args) {

        SparkConf sparkConf = new SparkConf()
                .setMaster("local")
                .setAppName("Spark Demo")
                .set("spark.ui.port", "8081");

        JavaSparkContext sc = new JavaSparkContext(sparkConf);

        JavaRDD<String> input = sc.textFile(SparkInit.class.getClassLoader().getResource(INPUT_FILE).getPath());

        JavaRDD<String> words = input.flatMap((FlatMapFunction<String, String>) s -> Arrays.asList(s.split(" ")).iterator());

        JavaPairRDD<String, Integer> counts = words
                .mapToPair((PairFunction<String, String, Integer>) s -> new Tuple2<String, Integer>(s, 1))
                .reduceByKey((Function2<Integer, Integer, Integer>) (integer, integer2) -> integer + integer2);

        counts.saveAsTextFile(OUTPUT_FOLDER);
    }

}
