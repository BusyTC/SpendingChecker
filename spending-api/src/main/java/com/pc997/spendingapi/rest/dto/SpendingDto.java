package com.pc997.spendingapi.rest.dto;

import java.time.ZonedDateTime;

public record SpendingDto(String id, String description, String otype, Long price, SpendingDto.UserDto user, ZonedDateTime createdAt) {

    public record UserDto(String username) {
    }
}