package com.pc997.spendingapi.mapper;

import com.pc997.spendingapi.model.Spending;
import com.pc997.spendingapi.model.SpendingType;
import com.pc997.spendingapi.model.User;
import com.pc997.spendingapi.rest.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        List<UserDto.SpendingDto> spendings = user.getSpendings().stream().map(this::toUserDtoSpendingDto).toList();
        List<UserDto.SpendingTypeDto> spendingTypes = user.getSpendingTypes().stream().map(this::toUserDtoSpendingTypeDto).toList();
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole(), spendings, spendingTypes);
    }

    private UserDto.SpendingDto toUserDtoSpendingDto(Spending spending) {
        if (spending == null) {
            return null;
        }
        return new UserDto.SpendingDto(spending.getId(), spending.getDescription(), spending.getOtype(), spending.getPrice(), spending.getCreatedAt());
    }

    private UserDto.SpendingTypeDto toUserDtoSpendingTypeDto(SpendingType spendingType) {
        if (spendingType == null) {
            return null;
        }
        return new UserDto.SpendingTypeDto(spendingType.getId(), spendingType.getType());
    }
}
