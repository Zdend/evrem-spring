package net.evrem.webapp.converter;


import net.evrem.webapp.enums.Period;
import net.evrem.webapp.form.PeriodForm;

public class PeriodEnumToPeriodFormConverter{

	public static PeriodForm convertFrom(Period s, PeriodForm t) {
		if (t == null) {
			t = new PeriodForm();
		}
		t.setName(s.name());
		t.setTitle(s.getTitle());
		return t;
	}

	public static Period convertTo(PeriodForm t, Period s) {
		return Period.valueOf(t.getName());
	}

}
