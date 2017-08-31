package com.everydots

/**
  * Created by mxxiao on 8/8/17.
  */

import org.apache.spark.sql.SparkSession

class Analysis {
  def process(): Unit = {

    val path = "reports/BasicReport_20170718_034034_66359.csv"

    val spark = SparkSession
      .builder()
      .appName("Spark SQL basic example")
      .getOrCreate()

    spark.read.format("csv")
      .option("header", "true")
      .option("inferSchema", "true")
      .load(this.getClass.getClassLoader.getResource(path).getPath)
      .createGlobalTempView("mobileRepairs")


    spark.sql("select count(*) from mobileRepairs").show()
  }

  def main(args: Array[String]): Unit = {
    this.process()
  }
}


