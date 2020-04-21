package net.evrem.webapp.converter;


import net.evrem.webapp.domain.TodoNote;
import net.evrem.webapp.form.TodoNoteForm;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TodoNoteFormToTodoNoteConverter {

	public static TodoNote convertToTodoNote(TodoNoteForm form, TodoNote todoNote) {
		if(todoNote == null){
			todoNote = new TodoNote();
		}

		todoNote.setIsDone(form.getIsDone());
		todoNote.setModifiedDate(new Date());
		todoNote.setText(form.getText());
		todoNote.setSortNo(form.getSortNo());

		return todoNote;
	}

	public static TodoNoteForm convertToForm(TodoNote todoNote, TodoNoteForm form) {
		if (form == null) {
			form = new TodoNoteForm();
		}

		form.setIsDone(todoNote.getIsDone());
		form.setModifiedDate(todoNote.getModifiedDate());
		form.setTodoNoteId(todoNote.getTodoNoteId());
		form.setText(todoNote.getText());
		form.setSortNo(todoNote.getSortNo());

		return form;
	}

	public static List<TodoNoteForm> convertToForms(List<TodoNote> todoNotes) {
		List<TodoNoteForm> forms = new ArrayList<TodoNoteForm>();
		for(TodoNote todoNote : todoNotes){
			forms.add(convertToForm(todoNote,null));
		}
		return forms;
	}

}
