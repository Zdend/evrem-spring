package net.evrem.webapp.converter;


import net.evrem.webapp.domain.User;
import net.evrem.webapp.form.UserForm;

public class UserToUserFormConverter {

	public UserForm convertToUserForm(User user, UserForm form) {
		if (form == null) {
			form = new UserForm();
		}

		form.setUserId(user.getUserId());
		form.setTimeZoneId(user.getTimeZoneId());
		form.setEmail(user.getEmail());

		return form;
	}

}
