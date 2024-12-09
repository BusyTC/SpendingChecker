package com.pc997.spendingapi.mapper;

import com.pc997.spendingapi.model.SpendingType;
import com.pc997.spendingapi.rest.dto.CreateSpendingTypeRequest;
import com.pc997.spendingapi.rest.dto.SpendingTypeDto;

public interface SpendingTypeMapper {

    SpendingType toSpendingType(CreateSpendingTypeRequest spendingTypeRequest);

    SpendingTypeDto toSpendingTypeDto(SpendingType spendingType);
}
