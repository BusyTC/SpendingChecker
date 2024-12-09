package com.pc997.spendingapi.service;

import com.pc997.spendingapi.model.Spending;

import java.util.List;

public interface SpendingService {

    List<Spending> getSpendings();

    List<Spending> getSpendingsContainingText(String text);

    Spending validateAndGetSpending(String id);

    Spending saveSpending(Spending spending);

    void deleteSpending(Spending spending);
}
