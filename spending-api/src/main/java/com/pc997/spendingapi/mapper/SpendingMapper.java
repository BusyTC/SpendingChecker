package com.pc997.spendingapi.mapper;

import com.pc997.spendingapi.model.Spending;
import com.pc997.spendingapi.rest.dto.CreateSpendingRequest;
import com.pc997.spendingapi.rest.dto.SpendingDto;

public interface SpendingMapper {

    Spending toSpending(CreateSpendingRequest createSpendingRequest);

    SpendingDto toSpendingDto(Spending spending);
}