package net.evrem.webapp.service;

import java.io.File;
import java.io.OutputStream;

import org.apache.poi.ss.usermodel.Workbook;

public interface FileService {

	String saveFileToTemp(Workbook wb, String fileName) throws Exception;

	void getFileFromTemp(String fileName, OutputStream out) throws Exception;

	void deleteFileFromTemp(String fileName) throws Exception;

}
