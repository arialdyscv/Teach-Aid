package com.RestApi.TeachAid.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

public class StudentNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(StudentNotFoundException.class)//if you get error will send request to this handler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> expectionHandler(StudentNotFoundException exception){
        Map<String,String> errorMap = new HashMap<>();
        errorMap.put("errorMessage: ", exception.getMessage());

        return errorMap;
    }
}
