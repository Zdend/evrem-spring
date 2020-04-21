package net.evrem.webapp.service;

import net.evrem.webapp.form.NoteFormModel;

import java.util.List;

public interface ExportService {

	String getExportAllFile(List<NoteFormModel> noteForms, Long userId) throws Exception;

}
