package net.evrem.webapp.service.impl;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import net.evrem.webapp.enums.Role;
import net.evrem.webapp.form.UserForm;
import net.evrem.webapp.repository.UserRepository;
import net.evrem.webapp.service.EmailService;
import net.evrem.webapp.service.UserService;
import net.evrem.webapp.util.GlobalConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by T945051 on 31.5.2015.
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    UserRepository userRepository;
    @Autowired
    EmailService emailService;

    @Value("${captcha.secret_key}")
    private String SECRET_KEY;
    @Value("${captcha.api_url}")
    private String GOOGLE_API_URL;
    @Value("${captcha.proxy_url}")
    private String PROXY_URL;
    @Value("${captcha.proxy_port}")
    private String PROXY_PORT;

    @PostConstruct
    protected void initialize() {
//        userRepository.save(new User("user", "demo", "ROLE_USER"));
        final String adminEmail = "admin@evrem.net";
        net.evrem.webapp.domain.User admin = userRepository.findByEmail(adminEmail);
        if (admin == null) {
            admin = new net.evrem.webapp.domain.User();
            admin.setUserId(1L);
            admin.setEmail(adminEmail);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            admin.setPassword(passwordEncoder.encode("xxxxxxx"));
            admin.setRole(Role.ROLE_ADMIN);
            admin.setCreationDate(new Date());
            userRepository.save(admin);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        net.evrem.webapp.domain.User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("user not found");
        }
        return createUser(user);
    }


    public void signin(net.evrem.webapp.domain.User user) {
        SecurityContextHolder.getContext().setAuthentication(authenticate(user));
    }

    @Override
    public net.evrem.webapp.domain.User getCurrentUser(){
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        net.evrem.webapp.domain.User evremUser = userRepository.findByEmail(user.getUsername());
        return evremUser;
    }

    @Override
    public List<net.evrem.webapp.domain.User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Boolean createNewUser(UserForm userForm) throws Exception {
        try{
            net.evrem.webapp.domain.User user = new net.evrem.webapp.domain.User();
            user.setCreationDate(new Date());
            user.setEmail(userForm.getEmail());
            user.setRole(Role.ROLE_USER);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(userForm.getPassword1()));
            user.setTimeZoneId(userForm.getTimeZoneId());//TODO Validate if it's a timezone

            userRepository.save(user);
        }catch(Exception e){
            logger.error("Error during saving user.",e);
            return false;
        }

        try {
            emailService.sendUserCreated(userForm.getEmail(), userForm.getTimeZoneId());
        } catch (Exception e) {
            logger.error("Error during sending email about user creation for user:" + userForm.getEmail(), e);
        }

        return true;
    }
    @Override
    public Boolean isValidUser(UserForm userForm) {
        if (StringUtils.isBlank(userForm.getPassword1()) || StringUtils.isBlank(userForm.getPassword2())) {
            return false;
        }
        if (!validateRegexp(userForm.getPassword1(), GlobalConstants.PASSWORD_PATTERN)) {
            return false;
        }
        if (!userForm.getPassword1().equals(userForm.getPassword2())) {
            return false;
        }
        if (!validateRegexp(userForm.getEmail(), GlobalConstants.EMAIL_PATTERN)) {
            return false;
        }
        net.evrem.webapp.domain.User user = userRepository.findByEmail(userForm.getEmail());
        if (user != null) {
            return false;
        }

        return true;
    }

    private Boolean validateRegexp(String value, String patternString) {
        Pattern pattern = Pattern.compile(patternString);
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }
    @Override
    public boolean validateCaptcha(String captchaToken) {
        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost postRequest = new HttpPost(GOOGLE_API_URL);
        if (StringUtils.isNoneEmpty(PROXY_URL)) {
            // proxy support
            HttpHost proxy = new HttpHost(PROXY_URL, Integer.valueOf(PROXY_PORT));
            httpClient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, proxy);//Fix deprecated classes
        }
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();
        nvps.add(new BasicNameValuePair("secret", SECRET_KEY));
        nvps.add(new BasicNameValuePair("response", captchaToken));
        try {
            postRequest.setEntity(new UrlEncodedFormEntity(nvps));
            HttpResponse response = httpClient.execute(postRequest);
            return parseResponse(response);
        } catch (Exception e) {
            logger.error("Error checking CAPTCHA key", e);
        } finally {
            postRequest.releaseConnection();
            httpClient.getConnectionManager().shutdown();
        }
        return false;
    }

    private boolean parseResponse(HttpResponse response) throws IOException {
        JsonFactory factory = new JsonFactory();
        JsonParser parser = factory.createJsonParser(response.getEntity().getContent());
        while (parser.nextToken() != JsonToken.END_OBJECT) {
            String fieldname = parser.getCurrentName();
            if ("success".equals(fieldname)) {
                parser.nextToken();
                boolean result = parser.getBooleanValue();
                parser.close();
                return result;
            }
        }
        return false;
    }


    private Authentication authenticate(net.evrem.webapp.domain.User user) {
        return new UsernamePasswordAuthenticationToken(createUser(user), null, Collections.singleton(createAuthority(user)));
    }

    private User createUser(net.evrem.webapp.domain.User user) {
        return new User(user.getEmail(), user.getPassword(), Collections.singleton(createAuthority(user)));
    }

    private GrantedAuthority createAuthority(net.evrem.webapp.domain.User user) {
        return new SimpleGrantedAuthority(user.getRole().name());
    }

}

