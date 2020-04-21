package net.evrem.webapp.service;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.TodoNote;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.TodoNoteForm;

import java.util.List;

/**
 * Created by T945051 on 20.6.2015.
 */
public interface TodoNoteService {
    List<TodoNote> saveTodoNotes(String text, Note note, Boolean updateNotes, Boolean checkState) throws Exception;
    NoteFormModel checkTodoNote(Long todoNoteId) throws Exception;
    void checkAllTodoNotes(Note note, Boolean checkState) throws Exception;
    void deleteByNote(Note note) throws Exception;
}
