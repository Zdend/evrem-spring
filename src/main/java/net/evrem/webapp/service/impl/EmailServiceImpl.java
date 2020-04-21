package net.evrem.webapp.service.impl;

import net.evrem.webapp.dto.EventNotificationDto;
import net.evrem.webapp.service.EmailService;
import org.apache.commons.lang3.StringUtils;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.app.event.implement.IncludeRelativePath;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.util.Date;
import java.util.Enumeration;
import java.util.Properties;

/**
 * Created by t945051 on 15.7.2015.
 */
@Service("emailService")
public class EmailServiceImpl implements EmailService {
    private final Logger logger = LoggerFactory.getLogger(getClass());


    @Value("${evrem.email.from.info}")
    private String FROM_EMAIL;
    @Value("${evrem.email.from.info.name}")
    private String FROM_NAME;
    @Value("${evrem.email.test.address}")
    private String TO_EMAIL_TEST;

    @Value("${evrem.email.host.address}")
    private String HOST_ADDRESS;
    @Value("${evrem.email.host.password}")
    private String HOST_PASSWORD;


    @Override
    public void sendUserCreated(String email, String timezone) throws Exception {
        String subject = "Your Evrem account has been created";

        Template t = initTemplate("simple-layout");

        VelocityContext context = new VelocityContext();
        context.put("screen_content", "user-created.vm");
        context.put("login", email);
        context.put("timezone", timezone);
        context.put("subject", "Welcome to Evrem");

        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        String body = writer.toString();

        try {

            Message message = new MimeMessage(loadSession());
            message.setFrom(getDefaultAddressFrom());
            message.setRecipients(Message.RecipientType.TO, getAddressTo(email));
            message.setSubject(subject);
            message.setContent(body, "text/html; charset=utf-8");

            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendEventNotification(String email, EventNotificationDto note) throws Exception {
        String subject = StringUtils.isNotBlank(note.getSubject()) ? note.getSubject() : "Evrem notification";

        Template t = initTemplate("simple-layout");

        VelocityContext context = new VelocityContext();
        context.put("screen_content", "event-notification.vm");
        context.put("note", note);
        context.put("subject", subject);

        StringWriter writer = new StringWriter();
        t.merge(context, writer);

        String body = writer.toString();
        try {
            Message message = new MimeMessage(loadSession());
            message.setFrom(getDefaultAddressFrom());
            message.setRecipients(Message.RecipientType.TO, getAddressTo(email));
            message.setSubject(subject);
            message.setContent(body, "text/html; charset=utf-8");

            Transport.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private Template initTemplate(String templateName) {
        VelocityEngine ve = new VelocityEngine();
        ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        ve.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        ve.setProperty(RuntimeConstants.EVENTHANDLER_INCLUDE, IncludeRelativePath.class.getName());

        ve.init();

        return ve.getTemplate("templates/" + templateName + ".vm", "UTF-8");
    }

    private Session loadSession() {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");

        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(HOST_ADDRESS, HOST_PASSWORD);
                    }
                });
        return session;
    }

    private InternetAddress getDefaultAddressFrom() throws UnsupportedEncodingException {
        return new InternetAddress(FROM_EMAIL, FROM_NAME);
    }

    private InternetAddress[] getAddressTo(String email) throws UnsupportedEncodingException, AddressException {
        InternetAddress to = null;
        if (StringUtils.isNotBlank(TO_EMAIL_TEST)) {
            to = new InternetAddress(TO_EMAIL_TEST);
        } else {
            to = new InternetAddress(email);
        }
        return new InternetAddress[]{to};
    }
}
