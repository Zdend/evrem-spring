package net.evrem.webapp.controller;

import net.evrem.webapp.error.*;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.Response;
import net.evrem.webapp.form.UserForm;
import net.evrem.webapp.service.UserService;
import net.evrem.webapp.util.JsonSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by t945051 on 10.7.2015.
 */
@Controller
//@RequestMapping(value = "/")
public class SecurityController {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserService userService;

//    @RequestMapping(method = RequestMethod.POST)
//    @ResponseBody
//    public LoginStatus login(@RequestParam("j_username") String username,
//                             @RequestParam("j_password") String password,
//                             HttpServletRequest request, HttpServletResponse response) {
//
//        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
//
//
//        try {
//            Authentication auth = authenticationManager.authenticate(token);
//            SecurityContextHolder.getContext().setAuthentication(auth);
//            // save the updated context to the session
//            repository.saveContext(SecurityContextHolder.getContext(), request, response);
//            return new LoginStatus(auth.isAuthenticated(), auth.getName());
//        } catch (BadCredentialsException e) {
//            return new LoginStatus(false, null);
//        }
//    }

    @RequestMapping(value = "/rest/user/save", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<Boolean> signUp(@RequestBody UserForm user) {
        Response<Boolean> response = new Response<Boolean>();
        Boolean isVerificated = false;

        try {
            isVerificated = userService.validateCaptcha(user.getToken());
        } catch (Exception e) {
            logger.error("Error during verifying token", e);
            response.setPayload(false);
            response.addError(new net.evrem.webapp.error.Error("CAPTCHA_VERIFICATION_EXCEPTION", e.getMessage()));
            return response;
        }

        if (isVerificated) {
            if (userService.isValidUser(user)) {
                try {
                    userService.createNewUser(user);
                    response.setPayload(true);
                } catch (Exception e) {
                    logger.error("User creation exception", e);
                    response.setPayload(false);
                    response.addError(new net.evrem.webapp.error.Error("USER_CREATE_EXCEPTION", e.getMessage()));
                }
            }else{
                response.setPayload(false);
                //TODO create enum for error codes
                response.addError(new net.evrem.webapp.error.Error("USER_VALIDATION_FAILED","Email or passwords are wrong."));
            }
        }

        return response;
    }

}
