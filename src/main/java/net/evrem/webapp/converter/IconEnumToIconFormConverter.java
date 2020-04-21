package net.evrem.webapp.converter;

import net.evrem.webapp.enums.Color;
import net.evrem.webapp.enums.Icon;
import net.evrem.webapp.form.ColorForm;
import net.evrem.webapp.form.IconForm;

/**
 * Created by t945051 on 6.7.2015.
 */
public class IconEnumToIconFormConverter {
    public static IconForm convertFrom(Icon s, IconForm t) {
        if (t == null) {
            t = new IconForm();
        }
        t.setName(s.name());
        t.setType(s.getType());
        return t;
    }

    public static Icon convertTo(IconForm t, Icon s) {
        return Icon.valueOf(s.name());
    }


}
