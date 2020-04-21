package net.evrem.webapp.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

import net.evrem.webapp.service.FileService;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("fileService")
public class FileServiceImpl implements FileService {

	@Value("${evrem.export.folder}")
	private String exportFolder;

	public String saveFileToTemp(Workbook wb, String fileName) throws Exception {
		String fullPath = exportFolder + fileName;
		File tempDirectory = new File(exportFolder);
		FileUtils.forceMkdir(tempDirectory);

		FileOutputStream fileOut = new FileOutputStream(fullPath);

		wb.write(fileOut);
		fileOut.close();
		return fileName;
	}

	public void getFileFromTemp(String fileName, OutputStream out) throws Exception {
		InputStream is = new FileInputStream(exportFolder + fileName);
		IOUtils.copy(is, out);
		is.close();
	}

	public void deleteFileFromTemp(String fileName) throws Exception {
		File file = new File(exportFolder + fileName);
		file.delete();
	}

}
