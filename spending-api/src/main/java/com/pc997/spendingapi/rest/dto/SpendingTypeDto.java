package com.pc997.spendingapi.rest.dto;

public record SpendingTypeDto(Long id, String type, SpendingTypeDto.UserDto user) {

    public record UserDto(String username){
    }
}
