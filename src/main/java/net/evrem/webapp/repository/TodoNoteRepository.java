package net.evrem.webapp.repository;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.TodoNote;

import java.util.List;

/**
 * Created by T945051 on 20.6.2015.
 */
public interface TodoNoteRepository  extends BaseRepository<TodoNote, Long> {
    List<TodoNote> findByNote(Note note);
    TodoNote findByNoteAndSortNo(Note note, Integer sortNo);
}
