package net.evrem.webapp.domain;

import net.evrem.webapp.enums.Color;
import net.evrem.webapp.enums.Icon;
import net.evrem.webapp.enums.Period;
import net.evrem.webapp.domain.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by T945051 on 30.5.2015.
 */
@Entity
@Table(name = "NOTE")
public class Note implements Serializable {

    public Note(){}
    public Note(Long noteId){
        this.noteId = noteId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTE_ID", unique = true, nullable = false)
    private Long noteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "HAS_CHECK")
    private Boolean hasCheck;

    @Column(name = "HAS_TIME")
    private Boolean hasTime;

    @Column(name = "HAS_REMINDER")
    private Boolean hasReminder;

    @Column(name = "HAS_TODO")
    private Boolean hasTodo;

    @Column(name = "HAS_REPEAT")
    private Boolean hasRepeat;

    @Column(name = "HAS_COLOR")
    private Boolean hasColor;

    @Column(name = "HAS_WALL")
    private Boolean hasWall;

    @Column(name = "HAS_ICON")
    private Boolean hasIcon;

    @Column(name="TEXT", length = 4000)
    private String text;

    @Column(name = "IS_DONE")
    private Boolean isDone;

    @Enumerated(EnumType.STRING)
    @Column(name = "PERIOD")
    private Period period;

    @Enumerated(EnumType.STRING)
    @Column(name = "COLOR")
    private Color color;

    @Enumerated(EnumType.STRING)
    @Column(name = "ICON")
    private Icon icon;

    @Column(name = "EVENT_TIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventTime;

    @Column(name = "CREATED_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(name = "MODIFIED_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date modifiedDate;

    @Column(name = "IS_DELETED")
    private Boolean isDeleted;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "note", cascade = CascadeType.ALL)
    private RemindInfo remindInfo;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "note", cascade = CascadeType.ALL)
    private List<TodoNote> todoNotes;

    @OneToOne(fetch = FetchType.EAGER, mappedBy = "note", cascade = CascadeType.ALL)
    private GridItem gridItem;

    public Boolean getHasIcon() {
        return hasIcon;
    }

    public void setHasIcon(Boolean hasIcon) {
        this.hasIcon = hasIcon;
    }

    public Icon getIcon() {
        return icon;
    }

    public void setIcon(Icon icon) {
        this.icon = icon;
    }

    public RemindInfo getRemindInfo() {
        return remindInfo;
    }

    public void setRemindInfo(RemindInfo remindInfo) {
        this.remindInfo = remindInfo;
    }

    public List<TodoNote> getTodoNotes() {
        return todoNotes;
    }

    public void setTodoNotes(List<TodoNote> todoNotes) {
        this.todoNotes = todoNotes;
    }

    public GridItem getGridItem() {
        return gridItem;
    }

    public void setGridItem(GridItem gridItem) {
        this.gridItem = gridItem;
    }

    public Long getNoteId() {
        return noteId;
    }

    public void setNoteId(Long noteId) {
        this.noteId = noteId;
    }

    public Boolean getHasCheck() {
        return hasCheck;
    }

    public void setHasCheck(Boolean hasCheck) {
        this.hasCheck = hasCheck;
    }

    public Boolean getHasTime() {
        return hasTime;
    }

    public void setHasTime(Boolean hasTime) {
        this.hasTime = hasTime;
    }

    public Boolean getHasReminder() {
        return hasReminder;
    }

    public void setHasReminder(Boolean hasReminder) {
        this.hasReminder = hasReminder;
    }

    public Boolean getHasTodo() {
        return hasTodo;
    }

    public void setHasTodo(Boolean hasTodo) {
        this.hasTodo = hasTodo;
    }

    public Boolean getHasRepeat() {
        return hasRepeat;
    }

    public void setHasRepeat(Boolean hasRepeat) {
        this.hasRepeat = hasRepeat;
    }

    public Boolean getHasColor() {
        return hasColor;
    }

    public void setHasColor(Boolean hasColor) {
        this.hasColor = hasColor;
    }

    public Boolean getHasWall() {
        return hasWall;
    }

    public void setHasWall(Boolean hasWall) {
        this.hasWall = hasWall;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getIsDone() {
        return isDone;
    }

    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public Period getPeriod() {
        return period;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Date getEventTime() {
        return eventTime;
    }

    public void setEventTime(Date eventTime) {
        this.eventTime = eventTime;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
