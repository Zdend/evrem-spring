package net.evrem.webapp.service;

import net.evrem.webapp.dto.HeaderDto;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;

import java.util.Date;

/**
 * Created by t945051 on 5.7.2015.
 */
public abstract class AbstractExportService {
    protected void createHeader(Workbook wb, Sheet sheet, HeaderDto[] headerTitles) {
        Row row = sheet.createRow(0);
        XSSFCellStyle style = (XSSFCellStyle) wb.createCellStyle();
        style.setFillForegroundColor(new XSSFColor(new java.awt.Color(51, 72, 93)));
        style.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);

        Font font = wb.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        style.setFont(font);

        for (int i = 0; i < headerTitles.length; i++) {
            HeaderDto header = headerTitles[i];
            CellUtil.createCell(row, i, header.getTitle(), style);
            sheet.setColumnWidth(i, header.getWidth() * 1000);
        }
    }

    protected void createDateCell(Row row, Integer column, Date date, CellStyle style) {
        Cell cell = row.createCell(column);
        if (date != null) {
            cell.setCellValue(date);
            cell.setCellStyle(style);
        } else {
            cell.setCellValue("");
        }
    }



}
