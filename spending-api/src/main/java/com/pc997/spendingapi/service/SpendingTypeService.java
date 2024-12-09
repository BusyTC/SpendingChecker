package com.pc997.spendingapi.service;

import com.pc997.spendingapi.model.SpendingType;

import java.util.List;

public interface SpendingTypeService {
    List<SpendingType> getSpendingTypes();

    SpendingType validateAndGetSpendingType(Long id);

    SpendingType saveSpendingType(SpendingType spendingType);

    void deleteSpendingType(SpendingType spendingType);
}
