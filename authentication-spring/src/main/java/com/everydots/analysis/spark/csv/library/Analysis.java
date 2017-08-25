package com.everydots.analysis.spark.csv.library;

import com.everydots.analysis.spark.SparkFactory;
import com.everydots.analysis.spark.common.Printer;
import com.everydots.analysis.spark.enums.Project;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SQLContext;
import org.apache.spark.sql.SparkSession;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

class Analysis implements Serializable {

    private static final String MOBILE_REPAIRS_TABLE = "mobileRepairs";

    private SparkSession sparkSession;

    private SQLContext sqlContext;

    private Project project = Project.LENOVO;

    private String xAxis = "StationName";

    private String yAxis = "RTATBD";

    Analysis() {
        this.sparkSession = SparkFactory.getLocalSQLEnv(project.getAppName());
    }

    public Analysis(Project project) {
        this();
        this.project = project;
    }

    public SparkSession getSparkSession() {
        return sparkSession;
    }

    public String getxAxis() {
        return xAxis;
    }

    public void setxAxis(String xAxis) {
        this.xAxis = xAxis;
    }

    void process() {
        String path = this.getClass().getClassLoader().getResource(project.getDataPath()).getPath();
        Dataset<Row> df = sparkSession.read()
                .format("csv")
                .option("header", "true")
                .option("inferSchema", "true")
                .load(path);
        String[] colNames = Arrays.stream(df.columns())
                .map(column -> column.replaceAll("[ ()-]", "")).toArray(String[]::new);
        Dataset<Row> toDF = df.toDF(colNames);
        toDF
                .select(toDF.col(this.getxAxis()),
                        toDF.col(this.yAxis).cast("integer"))
                .filter(toDF.col(this.yAxis).$greater$eq(0))
                .createOrReplaceTempView(MOBILE_REPAIRS_TABLE);
    }

    void count() {
        List<Row> rows = sparkSession
                .sql("select count(*) from " + MOBILE_REPAIRS_TABLE)
                .collectAsList();
        Printer.printRow(rows);
    }

    void stationCommonStatistics(Map<String, String> conditions) {
        String sql = "select " + this.getxAxis() + ", COUNT(*) total, AVG(" + this.yAxis + ") average " +
                "from %s ";
        if (conditions != null && conditions.keySet().size() != 0) {
            sql += " where ";
            for (String condition : conditions.keySet()) {
                sql += (condition + " " + conditions.get(condition));
            }
        }
        sql += "GROUP BY " + this.getxAxis() + " ORDER BY average desc";
        List<Row> rows = sparkSession
                .sql(formatSql(sql))
                .select(this.getxAxis(), "average")
                .collectAsList();
        Printer.printRow(rows);
    }

    void mobileSpecifiecStatistics() {
        List<Row> rows = sparkSession
                .sql(formatSql("select " + this.getxAxis() + ", COUNT(*) total, AVG(" + this.yAxis + ") average" +
                        " from %s GROUP BY " + this.getxAxis() + " ORDER BY average"))
                .select(this.getxAxis(), "average")
                .collectAsList();
        Printer.printRow(rows);
    }

    void stationOpenCase(int openCaseNums) {
        List<Row> rows = sparkSession.sql(formatSql("select " + this.getxAxis() + ", count(*) total" +
                " from %s where " + this.yAxis + " >= " + openCaseNums + " GROUP BY " + this.getxAxis()))
                .collectAsList();
        Printer.printRow(rows);
    }

    void checkMetadata() {
        List<Row> rows = sparkSession.sql("describe " + MOBILE_REPAIRS_TABLE)
                .collectAsList();
        rows.forEach(row -> {
            System.out.println(row.getString(0));
        });
        sparkSession.close();
    }

    String formatSql(String sql) {
        return sql.replace("%s", MOBILE_REPAIRS_TABLE);
    }
}




