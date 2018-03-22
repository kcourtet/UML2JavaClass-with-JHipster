package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DataAnalysis;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DataAnalysis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataAnalysisRepository extends JpaRepository<DataAnalysis, Long> {

}
