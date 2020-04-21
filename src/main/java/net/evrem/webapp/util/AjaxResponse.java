package net.evrem.webapp.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import net.evrem.webapp.error.Error;


import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AjaxResponse<T> {

	public static final String ERROR_WRITE = "Error during serialization to json";
	private static ObjectMapper jsonSerializer = new ObjectMapper();

	static {
		jsonSerializer = new ObjectMapper();
		jsonSerializer.configure(MapperFeature.USE_WRAPPER_NAME_AS_PROPERTY_NAME, false);
		jsonSerializer.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
		jsonSerializer.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
		jsonSerializer.setDateFormat(new SimpleDateFormat(GlobalConstants.DATE_TIME_FORMAT));
	}

	private final Logger logger = LoggerFactory.getLogger(getClass());

	private int version;

	private List<Error> errors;

	private List<Error> warnings;

	private T payload;

	public boolean addError(String errorCode, String errorMessage) {
		Error error = new Error(errorCode, errorMessage);
		if (getErrors() == null) {
			setErrors(new ArrayList<Error>());
		}
		return getErrors().add(error);
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public List<Error> getErrors() {
		return errors;
	}

	public void setErrors(List<Error> errors) {
		this.errors = errors;
	}

	public AjaxResponse() {
		this(0);
	}

	public AjaxResponse(T payload) {
		this(0, payload);
	}

	/**
	 * Constructor method for error response.
	 * 
	 * @param errorCode
	 */
	public AjaxResponse(int errorCode) {
		this(errorCode, null);
	}

	public AjaxResponse(int errorCode, T payload) {
		this.payload = payload;
	}

	/**
	 * Serializes the object to JSON format.
	 * 
	 * @return this serialized as JSON
	 */
	public String toJson() {
		try {
			return jsonSerializer.writeValueAsString(this);
		} catch (Exception e) {
			logger.error(ERROR_WRITE, e);
			return null;
		}
	}

	/**
	 * Serializes payload to JSON format.
	 * 
	 * @return payload serialized as JSON
	 */
	public String payloadToJson() {
		try {
			return jsonSerializer.writeValueAsString(payload);
		} catch (Exception e) {
			logger.error(ERROR_WRITE, e);
			return null;
		}
	}

	public T getPayload() {
		return payload;
	}

	public void setPayload(T payload) {
		this.payload = payload;
	}

	public List<Error> getWarnings() {
		return warnings;
	}

	public void setWarnings(List<Error> warnings) {
		this.warnings = warnings;
	}
}
