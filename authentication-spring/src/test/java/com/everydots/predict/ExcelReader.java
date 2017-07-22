package com.everydots.predict;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.Iterator;

public class ExcelReader {

    private static final String FILE_NAME = "DD Delivery.xlsx";

    public static void main(String[] args) {
        try {

            InputStream resourceAsStream = ExcelReader.class.getClassLoader().getResourceAsStream(FILE_NAME);
            Workbook workbook = new XSSFWorkbook(resourceAsStream);
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();

            int index = 0;

            while (iterator.hasNext()) {
                if (index > 5) {
                    break;
                }

                Row currentRow = iterator.next();

                for (Cell currentCell : currentRow) {

                    //getCellTypeEnum shown as deprecated for version 3.15
                    //getCellTypeEnum ill be renamed to getCellType starting from version 4.0
                    if (currentCell.getCellTypeEnum() == CellType.STRING) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                    } else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                    }

                }
                index++;
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
