package com.everydots.analysis.business;

import com.everydots.analysis.spark.SparkFactory;
import com.everydots.analysis.spark.enums.Project;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.api.java.UDF2;
import org.apache.spark.sql.api.java.UDF3;
import org.apache.spark.sql.types.DataTypes;
import org.joda.time.DateTime;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import static org.apache.spark.sql.functions.*;

class Lenovo implements Serializable {

    private static final String MOBILE_REPAIRS_TABLE = "mobileRepairs";

    private SparkSession sparkSession;

    private Project project = Project.LENOVO;

    private static Calendar startCal = Calendar.getInstance();
    private static final Calendar endCal = Calendar.getInstance();

    public List<Row> rows;

    Lenovo() {
        this.sparkSession = SparkFactory.getLocalSQLEnv(project.getAppName());
    }

    public Lenovo(Project project) {
        this();
        this.project = project;
    }

    public SparkSession getSparkSession() {
        return sparkSession;
    }


    void dataPreProcess() {
        String path = this.getClass().getClassLoader().getResource(project.getDataPath()).getPath();
        Dataset<Row> df = sparkSession.read()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .option("inferSchema", "true")
                .load(path);

        sparkSession.udf().register("computeBusinessDays", (UDF2<String, String, Integer>)
                Lenovo::getWorkingDaysBetweenTwoDates, DataTypes.IntegerType);

        String[] colNames = Arrays.stream(df.columns())
                .map(column -> column.replaceAll("[ ()-]", "_")).toArray(String[]::new);
        Dataset<Row> toDF = df.toDF(colNames);

        toDF
                .filter(col("Service_Order").startsWith("SO")
                        .and(col("Country").$eq$eq$eq("IN"))
                        .and(col("Service_Order_Status").notEqual("Canceled"))
                        .and(year(col("Carry_In_Time")).equalTo(2017)
                                .and(month(col("Carry_In_Time")).$greater$eq(5))))
                .withColumn("calculateRTAT", callUDF("computeBusinessDays",
                        col("Finish_Repair_Time"), col("Carry_In_Time")))

                .withColumn("CarryInTimeWeek", weekofyear(col("Carry_In_Time")))
                .withColumn("FinishRepairTimeWeek", weekofyear(col("Finish_Repair_Time")))
                .withColumn("SOCloseTimeWeek", weekofyear(col("SO_Close_Time")))

                .withColumn("partsCCITime", callUDF("computeBusinessDays",
                        col("Parts_in_CCI_Time"), col("Apply_For_Parts_Time")))
                .withColumn("partsCountryTime", callUDF("computeBusinessDays",
                        col("Parts_Available_in_Country_Time"), col("Apply_For_Parts_Time")))

                .withColumn("HVPNumber", callUDF("computeHVPNumber",
                        col("Defective_Part_1_Category"), col("Defective_Part_2_Category"),
                        col("Defective_Part_3_Category")))

                .withColumn("WeekOfMonth", date_format(to_date(col("Carry_In_Time")), "W"))
                .write()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .save("data_pre_process");
    }

    void statisticRRR() {

        Dataset<Row> df1 = sparkSession.read()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .load("data_pre_process3")
                .select("SOCloseTimeWeek", "IMEI1", "Carry_In_Time", "Problem_Code_Description")
                .filter(col("Carry_In_Time").isNotNull())
                .as("m1")
                .toDF();

        Dataset<Row> df2 = sparkSession.read()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .load("data_pre_process3")
                .select("Station_Name", "New_IMEI1", "IMEI1", "SO_Close_Time")
                .filter(col("SO_Close_Time").isNotNull())
                .as("m2")
                .toDF();


        df1.join(df2).where(df2.col("IMEI1").equalTo(df1.col("m1.IMEI1")))
                .filter(datediff(df1.col("Carry_In_Time"), df2.col("SO_Close_Time")).$less$eq(30))
                .select(df1.col("SOCloseTimeWeek"), df2.col("Station_Name"), df1.col("Problem_Code_Description"),
                        df2.col("IMEI1").as("originIMEI1"), df2.col("New_IMEI1").as("originNewIMEI1"),
                        df1.col("IMEI1").as("currentIMEI1"))
                .write()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .save("data_pre_process4");
    }


    void preProcess2() {

        sparkSession.udf().register("computeHVPNumber", (UDF3<String, String, String, Integer>)
                Lenovo::getHVPNumber, DataTypes.IntegerType);

        sparkSession.read()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .load("data_pre_process2")
                .withColumn("HVPNumber", callUDF("computeHVPNumber",
                        col("Defective_Part_1_Category"), col("Defective_Part_2_Category"),
                        col("Defective_Part_3_Category")))
                .write()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .save("data_pre_process3");
    }

    private static Integer getHVPNumber(String part1, String part2, String part3) {
        int number = 0;
        if (isHVPPart(part1)) {
            number++;
        }
        if (isHVPPart(part2)) {
            number++;
        }
        if (isHVPPart(part3)) {
            number++;
        }
        return number;
    }

    private static boolean isHVPPart(String part) {
        return "Main Board".equals(part) || "LCD Module/LCM".equals(part) || "PLANAR, PCBA".equals(part)
                || "TP".equals(part) || "TP LCM Ass'y".equals(part);
    }


    void verify() {
        long count = sparkSession.read()
                .format("com.databricks.spark.csv")
                .option("header", "true")
                .load("data_pre_process")
                .select("Station_Name", "Finish_Repair_Time", "Carry_In_Time", "calculateRTAT")
                .filter(month(col("Carry_In_Time")).equalTo(6))
                .count();
        System.out.println(count);

    }

    void stationOpenCase() {
        sparkSession
                .sql("select StationName, TO_DATE(CAST(UNIX_TIMESTAMP(CarryInTime, 'MM/dd/yyyy') AS TIMESTAMP)) " +
                        "from mobileRepairs")
                .show();
    }

    private static int getWorkingDaysBetweenTwoDates(String startDate, String endDate) {
        if (startDate == null || endDate == null) {
            return -1;
        }

        startCal.setTime(DateTime.parse(startDate).toDate());
        endCal.setTime(DateTime.parse(endDate).toDate());
        int workDays = -1;

        //Return 0 if start and end are the same
        if (startCal.getTimeInMillis() == endCal.getTimeInMillis()) {
            return 0;
        }

        if (startCal.getTimeInMillis() > endCal.getTimeInMillis()) {
            startCal.setTime(DateTime.parse(endDate).toDate());
            endCal.setTime(DateTime.parse(startDate).toDate());
        }

        do {
            //excluding start date
            startCal.add(Calendar.DAY_OF_MONTH, 1);
            if (startCal.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY && startCal.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY) {
                ++workDays;
            }
        } while (startCal.getTimeInMillis() < endCal.getTimeInMillis()); //excluding end date

        return workDays;
    }
}



