package com.pc997.spendingapi.rest.dto;

import java.time.ZonedDateTime;
import java.util.List;

public record UserDto(Long id, String username, String name, String email, String role, List<SpendingDto> spendings, List<SpendingTypeDto> spendingTypes) {

    public record SpendingDto(String id, String description, String otype, Long price, ZonedDateTime createdAt) {
    }

    public record SpendingTypeDto(Long id, String type) {

    }
}