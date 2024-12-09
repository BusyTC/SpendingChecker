package com.pc997.spendingapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SpendingTypeNotFoundException extends RuntimeException {

    public SpendingTypeNotFoundException(String message) {
        super(message);
    }
}
