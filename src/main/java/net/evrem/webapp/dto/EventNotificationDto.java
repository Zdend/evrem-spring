package net.evrem.webapp.dto;

import net.evrem.webapp.form.TodoNoteForm;

import java.util.List;


public class EventNotificationDto {

	private String text;
	private String remindTime;
	private String createdDate;
	private String eventTime;
	private String color;
	private String subject;

	private List<TodoNoteForm> todos;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getRemindTime() {
		return remindTime;
	}

	public void setRemindTime(String remindTime) {
		this.remindTime = remindTime;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getEventTime() {
		return eventTime;
	}

	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public List<TodoNoteForm> getTodos() {
		return todos;
	}

	public void setTodos(List<TodoNoteForm> todos) {
		this.todos = todos;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

}
