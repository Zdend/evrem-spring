package net.evrem.webapp.form;

public class PeriodForm {

	private String name;
	private String title;

	public PeriodForm() {
	}

	public PeriodForm(String name) {
		this.name = name;
	}

	public PeriodForm(String name, String title) {
		this.name = name;
		this.title = title;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
