package net.evrem.webapp.dto;

public class HeaderDto {

	private String title;
	private Integer width;

	public HeaderDto(String title, Integer width) {
		this.title = title;
		this.width = width;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

}
