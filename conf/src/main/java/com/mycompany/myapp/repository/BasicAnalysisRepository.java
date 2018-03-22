package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.BasicAnalysis;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BasicAnalysis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BasicAnalysisRepository extends JpaRepository<BasicAnalysis, Long> {

}
