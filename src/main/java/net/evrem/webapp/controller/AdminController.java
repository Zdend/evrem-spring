package net.evrem.webapp.controller;

import net.evrem.webapp.service.NotificationSchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by t945051 on 15.7.2015.
 */
@Controller
@Secured("ROLE_ADMIN")
public class AdminController {
    @Autowired
    NotificationSchedulerService notificationSchedulerService;

    private static String REDIRECT_PRIVATE_URL = "redirect:/private";

    @RequestMapping(value = "/rest/scheduler/notification", method = RequestMethod.GET)
    public String startNotificationReport(){
        notificationSchedulerService.sendNotificationEmails();
        return REDIRECT_PRIVATE_URL;
    }
}
