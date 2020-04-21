package net.evrem.webapp.converter;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.RemindInfo;
import net.evrem.webapp.enums.Color;
import net.evrem.webapp.enums.Icon;
import net.evrem.webapp.enums.Period;
import net.evrem.webapp.form.ColorForm;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.PeriodForm;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;

public class NoteFormModelToNoteConverter {

	public static Note convertToNote(NoteFormModel form, Note note) {
		if(note == null){
			note = new Note();
		}
		note.setCreatedDate(new Date());
		note.setIsDeleted(false);

		note.setHasCheck(form.getHasCheck());
		note.setHasReminder(form.getHasReminder());
		note.setHasRepeat(form.getHasRepeat());
		note.setHasTime(form.getHasTime());
		note.setHasTodo(form.getHasTodo());
		note.setHasColor(form.getHasColor());
		note.setHasWall(form.getHasWall());
		note.setHasIcon(form.getHasIcon());

		if(form.getHasIcon()){
			note.setIcon(Icon.valueOf(form.getIcon()));
		}
		if (form.getHasRepeat()) {
			note.setPeriod(Period.valueOf(form.getPeriod()));
		}


		note.setEventTime(form.getEventTime());
		note.setIsDone(form.getIsDone());
		note.setColor(Color.valueOf(form.getColor()));

		String[] lines = form.getText().split("[\r\n]+");

		note.setText(StringUtils.join(lines, "\r\n"));



		return note;
	}

	public static NoteFormModel convertToForm(Note note, NoteFormModel form) {
		if (form == null) {
			form = new NoteFormModel();
		}
		form.setNoteId(note.getNoteId());

		form.setColor(note.getColor().name());
		form.setCreatedDate(note.getCreatedDate());
		form.setEventTime(note.getEventTime());
		form.setIsDone(note.getIsDone());
		form.setModifiedDate(note.getModifiedDate());

		if (note.getHasRepeat()) {
			form.setPeriod(note.getPeriod().name());
		}
        if(note.getHasReminder()){
            form.setRemindInfo(RemindInfoFormToRemindInfoConverter.convertToForm(note.getRemindInfo(),null));
        }
		if(note.getHasTodo()){
			form.setTodos(TodoNoteFormToTodoNoteConverter.convertToForms(note.getTodoNotes()));
		}
		if(note.getHasWall()){
			form.setGridItem(GridItemFormToGridItemConverter.convertToForm(note.getGridItem(),null));
		}
        if(note.getHasIcon()){
            form.setIcon(note.getIcon().name());
        }

		form.setHasCheck(note.getHasCheck());
		form.setHasColor(note.getHasColor());
		form.setHasReminder(note.getHasReminder());
		form.setHasRepeat(note.getHasRepeat());
		form.setHasTime(note.getHasTime());
		form.setHasTodo(note.getHasTodo());
		form.setHasWall(note.getHasWall());
		form.setHasIcon(note.getHasIcon());

		form.setText(note.getText());
		form.setIsDeleted(note.getIsDeleted());

		return form;
	}

}
