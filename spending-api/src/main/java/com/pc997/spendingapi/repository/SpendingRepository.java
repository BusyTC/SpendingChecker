package com.pc997.spendingapi.repository;

import com.pc997.spendingapi.model.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpendingRepository extends JpaRepository<Spending, String> {

    List<Spending> findAllByOrderByCreatedAtDesc();

    List<Spending> findByIdContainingOrDescriptionContainingIgnoreCaseOrderByCreatedAt(String id, String description);
}
