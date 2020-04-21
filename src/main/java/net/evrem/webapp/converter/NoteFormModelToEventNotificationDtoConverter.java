package net.evrem.webapp.converter;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.dto.EventNotificationDto;
import net.evrem.webapp.enums.Color;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.util.GlobalConstants;

import java.text.SimpleDateFormat;


public class NoteFormModelToEventNotificationDtoConverter {

	public static EventNotificationDto convertToEventNotification(Note note, EventNotificationDto dto) {
		if (dto == null) {
			dto = new EventNotificationDto();
		}
		SimpleDateFormat format = new SimpleDateFormat(GlobalConstants.DATE_TIME_FORMAT);
		dto.setText(note.getText());
		if (note.getCreatedDate() != null) {
			dto.setCreatedDate(format.format(note.getCreatedDate()));
		}
		if (note.getRemindInfo() != null) {
			if (note.getRemindInfo().getRemindDate() != null) {
				dto.setRemindTime(format.format(note.getRemindInfo().getRemindDate()));
			}
			dto.setSubject(note.getRemindInfo().getRemindSubject());
		}
		if (note.getEventTime() != null) {
			dto.setEventTime(format.format(note.getEventTime()));
		}
		dto.setColor(note.getColor().getColorWithHash());
		dto.setTodos(TodoNoteFormToTodoNoteConverter.convertToForms(note.getTodoNotes()));

		return dto;
	}

}
