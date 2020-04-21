package net.evrem.webapp.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by T945051 on 31.5.2015.
 */
@Entity
@Table(name = "TODO_NOTE")
public class TodoNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TODO_NOTE_ID", unique = true, nullable = false)
    private Long todoNoteId;

    @Column(name = "IS_DONE")
    private Boolean isDone;

    @Column(name = "TEXT")
    private String text;

    @Column(name = "MODIFIED_DATE")
    private Date modifiedDate;

    @Column(name = "SORT_NO")
    private Integer sortNo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_ID")
    private Note note;

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public Long getTodoNoteId() {
        return todoNoteId;
    }

    public void setTodoNoteId(Long todoNoteId) {
        this.todoNoteId = todoNoteId;
    }

    public Boolean getIsDone() {
        return isDone;
    }

    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Integer getSortNo() {
        return sortNo;
    }

    public void setSortNo(Integer sortNo) {
        this.sortNo = sortNo;
    }
}
