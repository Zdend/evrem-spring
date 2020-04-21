package net.evrem.webapp.service.impl;

import net.evrem.webapp.converter.NoteFormModelToNoteConverter;
import net.evrem.webapp.converter.TodoNoteFormToTodoNoteConverter;
import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.TodoNote;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.TodoNoteForm;
import net.evrem.webapp.repository.NoteRepository;
import net.evrem.webapp.repository.TodoNoteRepository;
import net.evrem.webapp.service.TodoNoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by T945051 on 20.6.2015.
 */
@Service("todoNoteService")
@Transactional
public class TodoNoteServiceImpl implements TodoNoteService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private TodoNoteRepository todoNoteRepository;
    @Autowired
    private NoteRepository noteRepository;

    @Override
    public List<TodoNote> saveTodoNotes(String text, Note note, Boolean updateNotes, Boolean checkState) throws Exception {
        String[] lines = text.split("[\r\n]+");

        Boolean rowCountChange = false;
        if (updateNotes) {

            if (note.getTodoNotes().size() != lines.length) {
                deleteByNote(note);
                rowCountChange = true;
            }
        }

        List<TodoNote> todoNotes = new ArrayList<TodoNote>();

        for (int i = 0; i < lines.length; i++) {
            TodoNoteForm form = new TodoNoteForm();

            if (updateNotes && !rowCountChange) {
                form = getTodoNoteByNoteIdAndSortNo(note, i);
            } else {
                form.setSortNo(i);
            }
            form.setIsDone(checkState != null ? checkState : false);
            form.setText(lines[i]);

            TodoNote todoNote = saveTodoNote(form, note);
            todoNotes.add(todoNote);
        }
        return todoNotes;
    }

    public void saveTodoNotes(List<TodoNoteForm> forms, Note note) throws Exception {
        for (TodoNoteForm form : forms) {
            saveTodoNote(form, note);
        }
    }

    public TodoNote saveTodoNote(TodoNoteForm form, Note note) throws Exception {
        TodoNote todoNote = null;
        if (form != null && form.getTodoNoteId() != null) {
            todoNote = todoNoteRepository.findOne(form.getTodoNoteId());
        } else {
            todoNote = new TodoNote();
            todoNote.setNote(note);
        }

        TodoNoteFormToTodoNoteConverter.convertToTodoNote(form, todoNote);

        return todoNoteRepository.save(todoNote);
    }

    public TodoNoteForm getTodoNoteByNoteIdAndSortNo(Note note, Integer sortNo) throws Exception {
        for(TodoNote todoNote: note.getTodoNotes()){
            if(todoNote.getSortNo().equals(sortNo)){
                return TodoNoteFormToTodoNoteConverter.convertToForm(todoNote, null);
            }
        }
        return null;
    }

    public List<TodoNoteForm> getTodoNotesByNoteId(Long noteId) throws Exception {
        List<TodoNote> todoNotes = todoNoteRepository.findByNote(new Note(noteId));
        List<TodoNoteForm> todoNoteForms = new ArrayList<TodoNoteForm>();

        for (TodoNote todoNote : todoNotes) {
            todoNoteForms.add(TodoNoteFormToTodoNoteConverter.convertToForm(todoNote, null));
        }

        return todoNoteForms;
    }

    public void deleteByNote(Note note) throws Exception {
        for (TodoNote todoNote : note.getTodoNotes()) {
            todoNoteRepository.delete(todoNote);
        }
    }

    public NoteFormModel checkTodoNote(Long todoNoteId) throws Exception {
        TodoNote todoNote = todoNoteRepository.findOne(todoNoteId);
//        if (!Long.valueOf(todoNote.getNote().getNoteId()).equals(noteId)) {
//            throw new Exception("You are trying to check todoNote that doesn't belong to this note.");
//        }
        todoNote.setIsDone(!todoNote.getIsDone());

        todoNote.setModifiedDate(new Date());

        todoNoteRepository.save(todoNote);
        return NoteFormModelToNoteConverter.convertToForm(todoNote.getNote(), null);
    }

    public void checkAllTodoNotes(Note note, Boolean checkState) throws Exception {
        List<TodoNote> todos = note.getTodoNotes();
        for (TodoNote todoNote : todos) {
            todoNote.setIsDone(checkState);
            todoNote.setModifiedDate(new Date());
            todoNoteRepository.save(todoNote);
        }
    }


}
