package net.evrem.webapp.form;

import java.util.Date;

public class RemindInfoForm {

	private Long remindInfoId;
	private Date remindDate;
	private String remindSubject;
	private String emails;
	private Date lastRemindTime;

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
