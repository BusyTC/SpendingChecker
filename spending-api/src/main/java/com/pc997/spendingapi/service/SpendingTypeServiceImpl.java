package com.pc997.spendingapi.service;

import com.pc997.spendingapi.exception.SpendingTypeNotFoundException;
import com.pc997.spendingapi.model.SpendingType;
import com.pc997.spendingapi.repository.SpendingTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SpendingTypeServiceImpl implements SpendingTypeService{

    private final SpendingTypeRepository spendingTypeRepository;

    @Override
    public List<SpendingType> getSpendingTypes() {
        return spendingTypeRepository.findAll();
    }

    @Override
    public SpendingType validateAndGetSpendingType(Long id) {
        return spendingTypeRepository.findById(id)
                .orElseThrow(() -> new SpendingTypeNotFoundException(String.format("SpendingTyep with id %s not found", id)));
    }

    @Override
    public SpendingType saveSpendingType(SpendingType spendingType) {
        return spendingTypeRepository.save(spendingType);
    }

    @Override
    public void deleteSpendingType(SpendingType spendingType) {
        spendingTypeRepository.delete(spendingType);
    }
}
