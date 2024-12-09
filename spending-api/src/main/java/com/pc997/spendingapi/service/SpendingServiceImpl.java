package com.pc997.spendingapi.service;

import com.pc997.spendingapi.repository.SpendingRepository;
import com.pc997.spendingapi.exception.SpendingNotFoundException;
import com.pc997.spendingapi.model.Spending;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SpendingServiceImpl implements SpendingService {

    private final SpendingRepository spendingRepository;

    @Override
    public List<Spending> getSpendings() {
        return spendingRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public List<Spending> getSpendingsContainingText(String text) {
        return spendingRepository.findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(text, text);
    }

    @Override
    public Spending validateAndGetSpending(String id) {
        return spendingRepository.findById(id)
                .orElseThrow(() -> new SpendingNotFoundException(String.format("Spending with id %s not found", id)));
    }

    @Override
    public Spending saveSpending(Spending spending) {
        return spendingRepository.save(spending);
    }

    @Override
    public void deleteSpending(Spending spending) {
        spendingRepository.delete(spending);
    }
}
