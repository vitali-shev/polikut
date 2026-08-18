package com.polikut.feature.delivery.repository;

import com.polikut.feature.delivery.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, String> {

    List<Warehouse> findAllBySettlementRef(String settlementRef);
}
