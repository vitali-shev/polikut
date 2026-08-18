package com.polikut.feature.delivery.repository;

import com.polikut.feature.delivery.entity.Settlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, String> {

    List<Settlement> findAllByDescriptionContainingIgnoreCase(String search);
}
