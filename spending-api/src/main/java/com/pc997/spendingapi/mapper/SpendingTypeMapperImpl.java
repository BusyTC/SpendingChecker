package com.pc997.spendingapi.mapper;

import com.pc997.spendingapi.model.SpendingType;
import com.pc997.spendingapi.rest.dto.CreateSpendingTypeRequest;
import com.pc997.spendingapi.rest.dto.SpendingTypeDto;
import org.springframework.stereotype.Service;

@Service
public class SpendingTypeMapperImpl implements SpendingTypeMapper{

    @Override
    public SpendingType toSpendingType(CreateSpendingTypeRequest createSpendingTypeRequest) {
        if (createSpendingTypeRequest == null) {
            return null;
        }
        return new SpendingType(createSpendingTypeRequest.getType());
    }

    @Override
    public SpendingTypeDto toSpendingTypeDto(SpendingType spendingType) {
        if (spendingType == null) {
            return null;
        }
        SpendingTypeDto.UserDto userDto = new SpendingTypeDto.UserDto(spendingType.getUser().getUsername());
        return new SpendingTypeDto(spendingType.getId(), spendingType.getType(), userDto);
    }
}
