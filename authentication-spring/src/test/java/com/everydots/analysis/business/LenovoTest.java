package com.everydots.analysis.business;

import com.everydots.analysis.spark.SparkFactory;
import org.apache.spark.api.java.function.ForeachFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.junit.Test;

import java.util.Arrays;

/**
 * Created by mxxiao on 8/10/17.
 */
public class LenovoTest {

    private final Lenovo lenovo = new Lenovo();

    @Test
    public void stationOpenCase() throws Exception {
        //lenovo.preProcess2();

        lenovo.statisticRRR();
        //lenovo.verify();
    }


    @Test
    public void stationPerformance() throws Exception {

        //lenovo.rankStations();
        lenovo.rankStationsVerify();
    }

    @Test
    public void test() throws Exception {

        SparkSession sparkSession = SparkFactory.getLocalSQLEnv("Lenovo");

        String path = this.getClass().getClassLoader().getResource("reports/data_collection.csv").getPath();
        Dataset<Row> df = sparkSession.read()
                .format("csv")
                .option("header", "true")
                .option("inferSchema", "true")
                .load(path);
        String[] colNames = Arrays.stream(df.columns())
                .map(column -> column.replaceAll("[ ()-]", "")).toArray(String[]::new);
        df.toDF(colNames)
                .foreach((ForeachFunction<Row>) row -> {
                    String format = String.format("['%s','%s','%s','%s','%s','%s','%s']",
                            row.getString(0),
                            row.getInt(1), row.getInt(2), row.getInt(3),
                            row.getDouble(4), row.getInt(5), row.getInt(6)
                    );
                    System.out.println(format);
                });

        /**
         * .select("Service_Order", "Vendor", "Country", "Station_Code", "Station_Name",
         "Model","IMEI1","IMEI2","SN","New_IMEI1","New_IMEI2","New_SN","Service_Order_Status","Warranty_Status","Parts_Status",
         "DOA_Status","CID_Status","Carry_In_Time","SO_Submitted_Time","Start_Repair_Time","Apply_for_Parts_Time",
         "Finish_Repair_Time","Customer_Pickup_Time","SO_Close_Time","Parts_Available_in_Country_Time","Parts_in_CCI_Time",
         "Complaint_Code","Complaint_Description","Problem_Code","Problem_Code_Description","Repair_Code",
         "calculateRTAT","Secondary_Repair_Code","Repair_Code_Description","Secondary_Repair_Code_Description","Repair_Type","Repair_Level",
         "R_TAT_BD_","Product_Model","Defect_Part_1","Defective_Part_1_Category",
         "Defective_Part_1_Name","Replace_Part_1","Replacement_Part_1_Name","Replace_Part_1_Status"
         )
         */

    }

    @Test
    public void name() throws Exception {

        double result = Lenovo.computePerformance("383", "1.15", "45.0", "10.81", "41.67");

        System.out.printf(result + "");

    }
}