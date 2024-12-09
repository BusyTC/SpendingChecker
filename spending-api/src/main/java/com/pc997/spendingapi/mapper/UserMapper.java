package com.pc997.spendingapi.mapper;

import com.pc997.spendingapi.model.User;
import com.pc997.spendingapi.rest.dto.UserDto;

public interface UserMapper {

    UserDto toUserDto(User user);
}