package net.evrem.webapp.controller;

import net.evrem.webapp.dto.TimeZoneDto;
import net.evrem.webapp.form.Response;
import net.evrem.webapp.util.TimeZoneUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by t945051 on 13.7.2015.
 */
@Controller
@RequestMapping(value = "/rest/resource")
public class ResourceController {

    @RequestMapping(value = "/timezones", method = {RequestMethod.GET})
    public @ResponseBody Response<List<TimeZoneDto>> getTimeZones() {
        List<TimeZoneDto> timeZones = TimeZoneUtil.getTimeZonesList();
        Response<List<TimeZoneDto>> response = new Response<List<TimeZoneDto>>();
        response.setPayload(timeZones);
        return response;
    }

}
