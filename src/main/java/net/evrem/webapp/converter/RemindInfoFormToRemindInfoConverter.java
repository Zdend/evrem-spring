package net.evrem.webapp.converter;


import net.evrem.webapp.domain.RemindInfo;
import net.evrem.webapp.form.RemindInfoForm;
import net.evrem.webapp.util.FormDataUtil;

public class RemindInfoFormToRemindInfoConverter {

	public static RemindInfo convertToRemindInfo(RemindInfoForm form, RemindInfo remindInfo) {
		if(remindInfo == null){
			remindInfo = new RemindInfo();
		}
		remindInfo.setRemindDate(form.getRemindDate());
		remindInfo.setRemindSubject(FormDataUtil.escape(form.getRemindSubject()));

		return remindInfo;
	}

	public static RemindInfoForm convertToForm(RemindInfo remindInfo, RemindInfoForm form) {
		if (form == null) {
			form = new RemindInfoForm();
		}
		form.setRemindDate(remindInfo.getRemindDate());
		form.setRemindSubject(remindInfo.getRemindSubject());
		form.setRemindInfoId(remindInfo.getRemindInfoId());
		form.setLastRemindTime(remindInfo.getLastRemindTime());
		// s.setRecipientEmails(t.getRecipientEmails());
		// TODO Consider to allow sending on other emails that user's

		return form;
	}

}
