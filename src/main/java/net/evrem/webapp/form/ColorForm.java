package net.evrem.webapp.form;

public class ColorForm {

	private String name;
	private String colorWithHash;

	public ColorForm() {

	}

	public ColorForm(String name, String colorWitHash) {
		this.name = name;
		this.colorWithHash = colorWitHash;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColorWithHash() {
		return colorWithHash;
	}

	public void setColorWithHash(String colorWithHash) {
		this.colorWithHash = colorWithHash;
	}
}
