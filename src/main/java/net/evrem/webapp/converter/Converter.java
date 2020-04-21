package net.evrem.webapp.converter;

public interface Converter<S, T> {

	/**
	 * Converts from S to T. First param is source entity and second is target
	 * entity.
	 * 
	 * @param s
	 * @param t
	 * @return
	 */
	T convertFrom(S s, T t);

	/**
	 * Converts from S to T. First param is target entity and second is source
	 * entity.
	 * 
	 * @param t
	 * @param s
	 * @return
	 */
	S convertTo(T t, S s);

}
