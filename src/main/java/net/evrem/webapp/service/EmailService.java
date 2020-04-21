package net.evrem.webapp.service;

import net.evrem.webapp.dto.EventNotificationDto;

/**
 * Created by t945051 on 15.7.2015.
 */
public interface EmailService {
    void sendUserCreated(String email, String timezone) throws Exception;

    void sendEventNotification(String email, EventNotificationDto note) throws Exception;
}
