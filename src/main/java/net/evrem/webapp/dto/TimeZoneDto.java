package net.evrem.webapp.dto;

public class TimeZoneDto {
	private String timeZoneId;
	private String offsetTitle;
	private Integer offset;

	public String getOffsetTitle() {
		return offsetTitle;
	}

	public void setOffsetTitle(String offsetTitle) {
		this.offsetTitle = offsetTitle;
	}

	public String getTimeZoneId() {
		return timeZoneId;
	}

	public void setTimeZoneId(String timeZoneId) {
		this.timeZoneId = timeZoneId;
	}

	public Integer getOffset() {
		return offset;
	}

	public void setOffset(Integer offset) {
		this.offset = offset;
	}

}
