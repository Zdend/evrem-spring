package net.evrem.webapp.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by T945051 on 31.5.2015.
 */
@Entity
@Table(name = "REMIND_INFO")
public class RemindInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REMIND_INFO_ID", unique = true, nullable = false)
    private Long remindInfoId;

    @Column(name = "REMIND_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date remindDate;

    @Column(name = "REMIND_SUBJECT")
    private String remindSubject;

    @Column(name = "EMAILS")
    private String emails;

    @Column(name = "LAST_REMIND_TIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastRemindTime;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_ID")
    private Note note;

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public Long getRemindInfoId() {
        return remindInfoId;
    }

    public void setRemindInfoId(Long remindInfoId) {
        this.remindInfoId = remindInfoId;
    }

    public Date getRemindDate() {
        return remindDate;
    }

    public void setRemindDate(Date remindDate) {
        this.remindDate = remindDate;
    }

    public String getRemindSubject() {
        return remindSubject;
    }

    public void setRemindSubject(String remindSubject) {
        this.remindSubject = remindSubject;
    }

    public String getEmails() {
        return emails;
    }

    public void setEmails(String emails) {
        this.emails = emails;
    }

    public Date getLastRemindTime() {
        return lastRemindTime;
    }

    public void setLastRemindTime(Date lastRemindTime) {
        this.lastRemindTime = lastRemindTime;
    }
}
