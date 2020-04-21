package net.evrem.webapp.enums;

public enum Period {

	YEARLY("Yearly"), HALFYEARLY("Half a year"), MONTHLY("Monthly"), WEEKLY("Weekly"), DAILY("Daily");

	private String title;

	private Period(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
