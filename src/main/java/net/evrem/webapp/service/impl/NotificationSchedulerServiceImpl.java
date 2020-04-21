package net.evrem.webapp.service.impl;

import net.evrem.webapp.converter.NoteFormModelToEventNotificationDtoConverter;
import net.evrem.webapp.domain.Note;
import net.evrem.webapp.domain.RemindInfo;
import net.evrem.webapp.domain.User;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.service.*;
import net.evrem.webapp.util.GlobalConstants;
import org.joda.time.DateTimeUtils;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by t945051 on 15.7.2015.
 */
@Service("notificationSchedulerService")
public class NotificationSchedulerServiceImpl implements NotificationSchedulerService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;
    @Autowired
    NoteService noteService;
    @Autowired
    RemindInfoService remindInfoService;


    @Scheduled(fixedDelay = 300 * 1000)
    @Override
    public void sendNotificationEmails() {
        List<User> users = userService.getAllUsers();
        long currentMillis = DateTimeUtils.currentTimeMillis();

        for (User user : users) {
            List<Note> notes = noteService.getNotesForReminding(user);
            for (Note note : notes) {
                SimpleDateFormat format = new SimpleDateFormat(GlobalConstants.DATE_TIME_FORMAT);

                DateTimeZone dateTz = DateTimeZone.forID(user.getTimeZoneId());
                long localRemindMillis = note.getRemindInfo().getRemindDate().getTime();
                System.out.println("localRemindMillis:" + format.format(new Date(localRemindMillis)));
                long utcRemindMillis = dateTz.convertLocalToUTC(localRemindMillis, false);
                System.out.println("utcRemindMillis:" + format.format(new Date(utcRemindMillis)));

                long lastRemindMillis = note.getRemindInfo().getLastRemindTime() != null ? note.getRemindInfo().getLastRemindTime().getTime() : 0l;
                System.out.println("lastRemindMillis:" + format.format(new Date(lastRemindMillis)));

                if (utcRemindMillis - currentMillis < (1000 * 60 * 5) && currentMillis - lastRemindMillis > 86400000) {

                    // TODO Send summarized email - only one per day ?
                    try{
                        emailService.sendEventNotification(user.getEmail(), NoteFormModelToEventNotificationDtoConverter.convertToEventNotification(note, null));
                    }catch(Exception e){
                        logger.error("Error during sending notification email for user: "+ user.getEmail(),e);
                    }

                    RemindInfo remindInfo = note.getRemindInfo();
                    remindInfo.setLastRemindTime(new Date());
                    remindInfoService.save(remindInfo);
                }

            }

        }
    }
}
