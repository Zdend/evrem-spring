package net.evrem.webapp.converter;


import net.evrem.webapp.enums.Color;
import net.evrem.webapp.form.ColorForm;

public class ColorEnumToColorFormConverter{

	public static ColorForm convertFrom(Color s, ColorForm t) {
		if (t == null) {
			t = new ColorForm();
		}
		t.setName(s.name());
		t.setColorWithHash(s.getColorWithHash());
		return t;
	}

	public static Color convertTo(ColorForm t, Color s) {
		return Color.valueOf(s.name());
	}

}
