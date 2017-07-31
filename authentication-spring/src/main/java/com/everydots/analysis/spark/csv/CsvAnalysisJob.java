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

public class CsvAnalysisJob {

    public List parseData(String filePath, HeaderColumnNameTranslateMappingStrategy strategy) throws Exception {
        JavaSparkContext sc = SparkFactory.getLocalEnv(Constants.Lenove);
        CSVReader reader = new CSVReader(new FileReader(filePath));
        CsvToBean<SaleRecord> csvToBean = new CsvToBean<>();
        List<SaleRecord> beanList = csvToBean.parse(strategy, reader);

        JavaPairRDD<String, Integer> counts = sc.parallelize(beanList)
                .mapToPair((PairFunction<SaleRecord, String, Integer>) saleRecord ->
                        new Tuple2<>(saleRecord.getProduct(), 1))
                .reduceByKey((Function2<Integer, Integer, Integer>) (integer, integer2) -> integer + integer2);
        return counts.collect();
    }

}
