package net.evrem.webapp.service;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.User;
import net.evrem.webapp.form.NoteFormModel;

import java.util.List;

/**
 * Created by T945051 on 31.5.2015.
 */
public interface NoteService {
    NoteFormModel save(NoteFormModel noteForm, User user) throws Exception;
    NoteFormModel delete(Long noteId)throws Exception;
    List<NoteFormModel> getAllNotes(User user)throws Exception;
    NoteFormModel checkNote(Long noteId)throws Exception;
    List<Long> deleteNotesPemanently(User user)throws Exception;
    List<Note> getNotesForReminding(User user);
}
