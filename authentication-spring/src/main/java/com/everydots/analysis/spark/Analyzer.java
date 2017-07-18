package com.everydots.analysis.spark;

import com.everydots.analysis.spark.bean.CostRecord;
import com.everydots.analysis.spark.formatter.ZipFileInputFormat;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.BytesWritable;
import org.apache.hadoop.io.Text;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.List;

public class Analyzer {


    public static void main(String[] args) throws FileNotFoundException {
        SparkConf config = new SparkConf()
                .setMaster("local")
                .setAppName("Cost");
        JavaSparkContext sc = new JavaSparkContext(config);
        String fileName = "reports/141924789642-aws-billing-detailed-line-items-with-resources-and-tags-ACTS-2014-11.csv.zip";
        String filePath = Analyzer.class.getClassLoader().getResource(fileName).getPath();
        JavaPairRDD<Text, BytesWritable> javaPairRDD = sc.newAPIHadoopFile(filePath, ZipFileInputFormat.class,
                Text.class, BytesWritable.class, new Configuration());

        String first = sc.textFile(filePath, 0).first();
        CSVReader reader = new CSVReader(new FileReader(filePath));
        HeaderColumnNameMappingStrategy strategy = new HeaderColumnNameMappingStrategy();
        strategy.setType(CostRecord.class);
        CsvToBean<CostRecord> csvToBean = new CsvToBean<>();
        List beanList = csvToBean.parse(strategy, reader);
        System.out.println(first);
    }

}
