package net.evrem.webapp.form;

import net.evrem.webapp.error.Error;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by T945051 on 19.6.2015.
 */
public class Response<T> {
    private T payload;
    private List<Error> errors;


    public List<Error> getErrors() {
        return errors;
    }

    public void setErrors(List<Error> errors) {
        this.errors = errors;
    }

    public void addError(Error error){
        if(errors == null){
            errors = new ArrayList<Error>();
        }
        errors.add(error);
    }

    public void addErrors(List<Error> errors){
        for (Error error : errors) {
            addError(error);
        }
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }
}
