package net.evrem.webapp.repository;

import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.User;

import java.util.List;

/**
 * Created by T945051 on 31.5.2015.
 */
public interface NoteRepository extends BaseRepository<Note, Long> {
    List<Note> findByUserAndIsDeleted(User user, Boolean isDeleted);
    List<Note> findByUserAndHasWall(User user, Boolean hasWall);
    List<Note> findByUser(User user);
    List<Note> findByUserAndIsDeletedAndHasReminder(User user, Boolean isDeleted, Boolean hasReminder);
}
