package net.evrem.webapp.controller;

import net.evrem.webapp.converter.ColorEnumToColorFormConverter;
import net.evrem.webapp.converter.IconEnumToIconFormConverter;
import net.evrem.webapp.converter.PeriodEnumToPeriodFormConverter;
import net.evrem.webapp.domain.User;
import net.evrem.webapp.enums.Color;
import net.evrem.webapp.enums.Icon;
import net.evrem.webapp.enums.Period;
import net.evrem.webapp.form.ColorForm;
import net.evrem.webapp.form.IconForm;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.PeriodForm;
import net.evrem.webapp.repository.UserRepository;
import net.evrem.webapp.service.NoteService;
import net.evrem.webapp.service.UserService;
import net.evrem.webapp.util.JsonSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by T945051 on 29.5.2015.
 */
@Controller
public class ViewController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    NoteService noteService;
    @Autowired
    UserService userService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = {"/private"}, method = RequestMethod.GET)
    public ModelAndView privatePage() {
        ModelAndView model = new ModelAndView();
        model.setViewName("private");

        List<ColorForm> colors = new ArrayList<ColorForm>();
        for (Color color : Color.values()) {
            colors.add(ColorEnumToColorFormConverter.convertFrom(color, null));
        }
        List<PeriodForm> periods = new ArrayList<PeriodForm>();
        for (Period period : Period.values()) {
            periods.add(PeriodEnumToPeriodFormConverter.convertFrom(period, null));
        }
        List<IconForm> icons = new ArrayList<IconForm>();
        for (Icon icon : Icon.values()) {
            icons.add(IconEnumToIconFormConverter.convertFrom(icon, null));
        }

        User user = userService.getCurrentUser();

        List<NoteFormModel> notes = null;
        try {
            notes = noteService.getAllNotes(user);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        model.addObject("periods", JsonSerializer.toJson(periods));
        model.addObject("colors", JsonSerializer.toJson(colors));
        model.addObject("icons", JsonSerializer.toJson(icons));
        model.addObject("notes", JsonSerializer.toJson(notes));

        return model;
    }

    @PreAuthorize("isAnonymous()")
    @RequestMapping(value = {"/","/public", "/login"}, method = RequestMethod.GET)
    public ModelAndView publicPage() {
        ModelAndView model = new ModelAndView();
        model.setViewName("public");

          return model;
    }
}
