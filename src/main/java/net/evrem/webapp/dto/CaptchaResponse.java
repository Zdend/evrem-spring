package net.evrem.webapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by t945051 on 15.7.2015.
 */
public class CaptchaResponse {

    private Boolean success;

    @JsonProperty("error-codes")
    private List<String> errorcodes;

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

}