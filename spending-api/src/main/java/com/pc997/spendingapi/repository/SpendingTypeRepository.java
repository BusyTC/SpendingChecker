package com.pc997.spendingapi.repository;

import com.pc997.spendingapi.model.SpendingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpendingTypeRepository extends JpaRepository<SpendingType, Long> {
    List<SpendingType> findByType(String type);
}
