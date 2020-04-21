package net.evrem.webapp.service.impl;

import net.evrem.webapp.converter.NoteFormModelToNoteConverter;
import net.evrem.webapp.converter.RemindInfoFormToRemindInfoConverter;
import net.evrem.webapp.domain.*;
import net.evrem.webapp.form.GridItemForm;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.RemindInfoForm;
import net.evrem.webapp.form.TodoNoteForm;
import net.evrem.webapp.repository.NoteRepository;
import net.evrem.webapp.repository.UserRepository;
import net.evrem.webapp.service.GridItemService;
import net.evrem.webapp.service.NoteService;
import net.evrem.webapp.service.RemindInfoService;
import net.evrem.webapp.service.TodoNoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by T945051 on 31.5.2015.
 */
@Service("noteService")
@Transactional
public class NoteServiceImpl implements NoteService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    NoteRepository noteRepository;
    @Autowired
    TodoNoteService todoNoteService;
    @Autowired
    GridItemService gridItemService;
    @Autowired
    RemindInfoService remindInfoService;

    @Override
    public NoteFormModel save(NoteFormModel noteForm, User user) throws Exception {
        Note note = null;
        try {
            if (noteForm.getNoteId() != null) {
                note = noteRepository.findOne(noteForm.getNoteId());

//                if (!userId.equals(note.getUserId())) {
//                    throw new Exception("You are trying to save note that is not yours. NoteId: " + note.getNoteId() + ", userId: " + userId);
//                }
            } else {
                note = new Note();
                note.setUser(user);
            }

            NoteFormModelToNoteConverter.convertToNote(noteForm, note);

            if(noteForm.getHasReminder()){
                RemindInfo remindInfo = RemindInfoFormToRemindInfoConverter.convertToRemindInfo(noteForm.getRemindInfo(), note.getRemindInfo());
                remindInfo.setNote(note);
                note.setRemindInfo(remindInfo);
            }
            if(noteForm.getHasTodo()){
                List<TodoNote> todoNotes = todoNoteService.saveTodoNotes(noteForm.getText(), note, noteForm.getNoteId() != null, noteForm.getIsDone());
                note.setTodoNotes(todoNotes);
            }
            if(noteForm.getHasWall()){
                GridItem gridItem = gridItemService.saveGridItem(noteForm.getGridItem());
                gridItem.setNote(note);
                note.setGridItem(gridItem);
            }


            if (noteForm.getNoteId() != null) {
                note.setModifiedDate(new Date());
                checkAndDeleteNoteDependentEntities(note);
            }
            noteRepository.save(note);
        } catch (Exception e) {
            logger.error("Error during saving or converting note.", e);
        }
        return NoteFormModelToNoteConverter.convertToForm(note, null);
    }

    private void checkAndDeleteNoteDependentEntities(Note note) throws Exception {
        if (!note.getHasReminder()) {
           remindInfoService.deleteByNote(note);
            note.setRemindInfo(null);
        }
        if (!note.getHasTodo()) {
            todoNoteService.deleteByNote(note);
            note.setTodoNotes(null);
        }
        if (!note.getHasWall()) {
            gridItemService.deleteByNote(note);
            note.setGridItem(null);
        }
    }

    public void deletePermanentlyNote(Long noteId) throws Exception {
        Note note = noteRepository.findOne(noteId);
//        if (!userId.equals(note.getUser().getUserId())) {
//            throw new Exception("You are trying to delete permanently note that is not yours. NoteId: " + noteId + ", userId: " + userId);
//        }
//        checkAndDeleteNoteDependentEntities(noteId);
        noteRepository.delete(note);
    }


    public NoteFormModel delete(Long noteId) throws Exception {
        Note note = noteRepository.findOne(noteId);
//        if (!userId.equals(note.getUser().getUserId())) {
//
//            throw new Exception("You are trying to delete note that is not yours. NoteId: " + noteId + ", userId: " + userId);
//        }
        note.setModifiedDate(new Date());
        note.setIsDeleted(true);
        noteRepository.save(note);
        return NoteFormModelToNoteConverter.convertToForm(note,null);
    }

    @Override
    public List<NoteFormModel> getAllNotes(User user) {
        List<NoteFormModel> noteForms = new ArrayList<NoteFormModel>();

        List<Note> notes = noteRepository.findByUser(user);

        for (Note note : notes) {
            NoteFormModel form = new NoteFormModel();
            NoteFormModelToNoteConverter.convertToForm(note, form);

            noteForms.add(form);
        }

        return noteForms;
    }

    @Override
    public List<Long> deleteNotesPemanently(User user) throws Exception{
        List<Note> notes = noteRepository.findByUserAndIsDeleted(user, true);
        List<Long> deletedNoteIds = new ArrayList<Long>();
        for (Note note : notes) {
            deletedNoteIds.add(note.getNoteId());
            deletePermanentlyNote(note.getNoteId());
        }
        return deletedNoteIds;
    }


    @Override
    public NoteFormModel checkNote(Long noteId) throws Exception {
        Note note = noteRepository.findOne(noteId);

        Boolean checkState = !note.getIsDone();
        todoNoteService.checkAllTodoNotes(note, checkState);

        note.setIsDone(checkState);
        noteRepository.save(note);
        return NoteFormModelToNoteConverter.convertToForm(note, null);
    }

    @Override
    public List<Note> getNotesForReminding(User user){
        return noteRepository.findByUserAndIsDeletedAndHasReminder(user, false, true);
    }

}
