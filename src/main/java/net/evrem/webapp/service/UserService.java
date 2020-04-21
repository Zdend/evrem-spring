package net.evrem.webapp.service;

import net.evrem.webapp.domain.User;
import net.evrem.webapp.form.UserForm;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

/**
 * Created by T945051 on 31.5.2015.
 */
public interface UserService extends UserDetailsService {
    Boolean createNewUser(UserForm userForm) throws Exception;

    Boolean isValidUser(UserForm userForm);

    boolean validateCaptcha(String captchaToken);

    User getCurrentUser();

    List<User> getAllUsers();
}
