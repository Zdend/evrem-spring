package net.evrem.webapp.util;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Default json serialization settings for psp project
 * 
 * 
 */
public class JsonSerializer {

	private static ObjectMapper jsonSerializer;

	static {
		jsonSerializer = new ObjectMapper();
		jsonSerializer.configure(MapperFeature.USE_WRAPPER_NAME_AS_PROPERTY_NAME, false);
		jsonSerializer.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
		jsonSerializer.configure(SerializationFeature.WRITE_ENUMS_USING_TO_STRING, true);
		jsonSerializer.setDateFormat(new SimpleDateFormat(GlobalConstants.DATE_TIME_FORMAT));
	}

	/**
	 * Returns the serializer.
	 * 
	 * @return
	 */
	public static ObjectMapper getInstance() {
		return jsonSerializer;
	}

	/**
	 * Converts given object to JSON.
	 * 
	 * @param object
	 *            an object to convert
	 * @return JSON representation
	 * @throws RuntimeException
	 *             if serialization fails
	 */
	public static String toJson(Object object) throws RuntimeException {
		try {
			return getInstance().writeValueAsString(object);
		} catch (IOException e) {
			throw new RuntimeException("Exception occured when converting object to JSON.", e);
		}
	}
}
