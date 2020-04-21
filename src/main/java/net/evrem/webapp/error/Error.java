package net.evrem.webapp.error;


import org.apache.commons.lang3.builder.ToStringBuilder;

public class Error {

	/**
	 * Error code
	 */
	private final String code;

	/**
	 * Error message
	 */
	private final String message;

	public Error(String code, String message) {
		this.code = code;
		this.message = message;
	}

	public String getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}