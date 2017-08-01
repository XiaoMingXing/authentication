package com.everydots.analysis.spark.csv;

import com.everydots.analysis.spark.SparkFactory;
import com.everydots.cost.common.Constants;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import java.io.FileReader;
import java.util.List;

class CsvAnalysisJob {

    List parseData(String filePath, HeaderColumnNameTranslateMappingStrategy strategy) throws Exception {
        CSVReader reader = new CSVReader(new FileReader(filePath));
        CsvToBean<SaleRecord> csvToBean = new CsvToBean<>();
        return csvToBean.parse(strategy, reader);
    }

    List topNRepairMobiles(int n, List<SaleRecord> repairRecords) {
        JavaSparkContext sc = SparkFactory.getLocalEnv(Constants.Lenove);
        JavaPairRDD<String, Integer> pairRDD = sc.parallelize(repairRecords)
                .mapToPair((PairFunction<SaleRecord, String, Integer>) saleRecord -> new Tuple2<>(saleRecord.getProduct(), 1))
                .reduceByKey((Function2<Integer, Integer, Integer>) (integer, integer2) -> integer + integer2);
        List<Tuple2<String, Integer>> topNList = pairRDD.collect().subList(0, n);
        topNList.stream()
                .sorted((tuple1, tuple2) -> Integer.compare(Integer.parseInt(tuple1._2().toString()),
                        Integer.parseInt(tuple2._2().toString())));
        return topNList;
    }

}
