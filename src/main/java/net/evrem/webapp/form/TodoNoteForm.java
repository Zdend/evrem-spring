package net.evrem.webapp.form;

import java.util.Date;

public class TodoNoteForm {

	private Long todoNoteId;
	private Boolean isDone;
	private String text;
	private Date modifiedDate;
	private Integer sortNo;

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
