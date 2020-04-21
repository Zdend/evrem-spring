package net.evrem.webapp.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


import net.evrem.webapp.dto.HeaderDto;
import net.evrem.webapp.enums.Color;
import net.evrem.webapp.enums.Period;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.service.AbstractExportService;
import net.evrem.webapp.service.ExportService;
import net.evrem.webapp.service.FileService;
import net.evrem.webapp.util.GlobalConstants;
import net.evrem.webapp.util.MixedUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("exportService")
public class ExportServiceImpl extends AbstractExportService implements ExportService {
    @Autowired
    private FileService fileService;

    public String getExportAllFile(List<NoteFormModel> noteForms, Long userId) throws Exception {
        Workbook wb = exportAll(noteForms);

        SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");
        String fileName = "Evrem_data_" + userId + "_" + format.format(new Date()) + ".xlsx";

        return fileService.saveFileToTemp(wb, fileName);
    }

	private Workbook exportAll(List<NoteFormModel> noteForms) throws Exception {
		Workbook wb = new XSSFWorkbook();
		Sheet sheet1 = wb.createSheet("All data");
		CreationHelper createHelper = wb.getCreationHelper();

		HeaderDto[] headerTitles = { new HeaderDto("Color", 3), new HeaderDto("Note text", 20), new HeaderDto("Event time", 4),
				new HeaderDto("Remind time", 4), new HeaderDto("Repeat period", 4), new HeaderDto("Done", 2), new HeaderDto("Deleted", 2),
				new HeaderDto("Creation date", 4), new HeaderDto("Last modified", 4), };
		createHeader(wb, sheet1, headerTitles);

		CellStyle dateStyle = wb.createCellStyle();
		dateStyle.setDataFormat(createHelper.createDataFormat().getFormat(GlobalConstants.DATE_TIME_FORMAT));

		int rowNum = 1;
		for (NoteFormModel form : noteForms) {
			Row row = sheet1.createRow(rowNum);

			XSSFCellStyle colorStyle = (XSSFCellStyle) wb.createCellStyle();
			colorStyle.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);
			colorStyle.setFillForegroundColor(new XSSFColor(MixedUtil.hex2Rgb(Color.valueOf(form.getColor()).getColorWithHash())));
			XSSFCell cell = (XSSFCell) row.createCell(0);
			cell.setCellStyle(colorStyle);

			CellUtil.createCell(row, 1, form.getText());
			createDateCell(row, 2, form.getEventTime(), dateStyle);
			createDateCell(row, 3, form.getRemindInfo() != null ? form.getRemindInfo().getRemindDate() : null, dateStyle);
			CellUtil.createCell(row, 4, form.getPeriod() != null ? Period.valueOf(form.getPeriod()).getTitle() : null);
			CellUtil.createCell(row, 5, form.getHasCheck() ? form.getIsDone().toString() : "");
			CellUtil.createCell(row, 6, form.getIsDeleted().toString());
			createDateCell(row, 7, form.getCreatedDate(), dateStyle);
			createDateCell(row, 8, form.getModifiedDate(), dateStyle);

			rowNum++;
		}

		return wb;
	}


}
