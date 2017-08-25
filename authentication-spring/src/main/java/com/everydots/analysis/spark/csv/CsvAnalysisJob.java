package com.everydots.analysis.spark.csv;

import com.everydots.analysis.spark.SparkFactory;
import com.everydots.cost.common.Constants;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;
import org.apache.commons.lang3.StringUtils;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import scala.Tuple2;

import java.io.FileReader;
import java.util.List;

class CsvAnalysisJob {

    List parseData(String filePath, HeaderColumnNameTranslateMappingStrategy strategy) throws Exception {
        CSVReader reader = new CSVReader(new FileReader(filePath));
        CsvToBean<RepairRecord> csvToBean = new CsvToBean<>();
        return csvToBean.parse(strategy, reader);
    }

    List topNRepairMobiles(List<RepairRecord> repairRecords, int n) {
        JavaSparkContext sc = SparkFactory.getLocalEnv(Constants.Lenove);
        List<KeyValueRecord> statistics = sc.parallelize(repairRecords)
                .mapToPair((PairFunction<RepairRecord, String, Integer>) repairRecord -> new Tuple2<String, Integer>(repairRecord.getProduct(), 1))
                .reduceByKey((Function2<Integer, Integer, Integer>) (integer, integer2) -> integer + integer2)
                .map((Function<Tuple2<String, Integer>, KeyValueRecord>) tuple2 -> new KeyValueRecord()
                        .withKey(tuple2._1)
                        .withNumericValue((double) tuple2._2))
                .sortBy((Function<KeyValueRecord, Double>) v1 -> v1.getNumericValue(), true, 1)
                .collect();
        return n > 0 ? statistics.subList(0, n) : statistics;
    }

    List stationRepairTime(List<RepairRecord> repairRecords, String problemCode) {
        JavaSparkContext sc = SparkFactory.getLocalEnv(Constants.Lenove);
        return sc
                .parallelize(repairRecords)
                .filter((Function<RepairRecord, Boolean>) repairRecord -> problemCode.equals(repairRecord.getRepairPart()))
                .mapToPair((PairFunction<RepairRecord, Integer, String>) repairRecord ->
                        new Tuple2<Integer, String>(repairRecord.getRepairTime(), repairRecord.getRepairStation()))
                .reduceByKey((Function2<String, String, String>) (v1, v2) -> v1 + "," + v2)
                .sortByKey(true)
                .map((Function<Tuple2<Integer, String>, KeyValueRecord>) tuple2 -> new KeyValueRecord()
                        .withKey(tuple2._1.toString())
                        .withStringValue(tuple2._2))
                .collect();


    }


    List repairStationTimeLine(List<RepairRecord> repairRecords,
                               SearchCondition searchCondition) {
        JavaSparkContext sc = SparkFactory.getLocalEnv(Constants.Lenove);
        JavaRDD<RepairRecord> parallelize = sc.parallelize(repairRecords);
        if (StringUtils.isNotBlank(searchCondition.getProductModel())) {
            parallelize = parallelize.filter((Function<RepairRecord, Boolean>)
                    repairRecord -> repairRecord.getProduct().equals(searchCondition.getProductModel()));
        }
        if (StringUtils.isNotBlank(searchCondition.getProblemCode())) {
            parallelize = parallelize.filter((Function<RepairRecord, Boolean>)
                    repairRecord -> StringUtils.isNotBlank(repairRecord.getRepairPart()) &&
                            repairRecord.getRepairPart().equals(searchCondition.getProblemCode()));
        }
        return parallelize
                .filter((Function<RepairRecord, Boolean>) v1 ->
                        StringUtils.isNotBlank(v1.getRepairStation())
                                && v1.getRepairTime() != -1
                                && v1.getSo().startsWith("SO"))
                .mapToPair((PairFunction<RepairRecord, String, Integer>)
                        repairRecord -> new Tuple2<String, Integer>(repairRecord.getRepairStation(), repairRecord.getRepairTime()))
                .mapValues((Function<Integer, Tuple2<Integer, Integer>>) v1 -> new Tuple2<>(v1, 1))
                .reduceByKey((tuple1, tuple2) -> new Tuple2<>(tuple1._1 + tuple2._1, tuple1._2 + tuple2._2))
                .mapToPair(getAverageByKey)
                .filter((Function<Tuple2<String, Double>, Boolean>) v1 -> v1._2 >= 0)
                .map((Function<Tuple2<String, Double>, KeyValueRecord>) tuple2 -> new KeyValueRecord()
                        .withKey(tuple2._1)
                        .withNumericValue(tuple2._2))
                .sortBy((Function<KeyValueRecord, Double>) KeyValueRecord::getNumericValue, true, 1)
                .collect();
    }

    private static PairFunction<Tuple2<String, Tuple2<Integer, Integer>>, String, Double> getAverageByKey = (tuple) -> {
        Tuple2<Integer, Integer> val = tuple._2;
        int total = val._1;
        int count = val._2;
        double average = Math.round((double) total / (double) count * 100) / 100.0d;
        if (count < 200) {
            average = -2d;
        }
        return new Tuple2<String, Double>(tuple._1, average);
    };

}
