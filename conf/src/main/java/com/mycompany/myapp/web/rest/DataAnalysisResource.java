package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.DataAnalysis;

import com.mycompany.myapp.repository.DataAnalysisRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DataAnalysis.
 */
@RestController
@RequestMapping("/api")
public class DataAnalysisResource {

    private final Logger log = LoggerFactory.getLogger(DataAnalysisResource.class);

    private static final String ENTITY_NAME = "dataAnalysis";

    private final DataAnalysisRepository dataAnalysisRepository;

    public DataAnalysisResource(DataAnalysisRepository dataAnalysisRepository) {
        this.dataAnalysisRepository = dataAnalysisRepository;
    }

    /**
     * POST  /data-analyses : Create a new dataAnalysis.
     *
     * @param dataAnalysis the dataAnalysis to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataAnalysis, or with status 400 (Bad Request) if the dataAnalysis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-analyses")
    @Timed
    public ResponseEntity<DataAnalysis> createDataAnalysis(@RequestBody DataAnalysis dataAnalysis) throws URISyntaxException {
        log.debug("REST request to save DataAnalysis : {}", dataAnalysis);
        if (dataAnalysis.getId() != null) {
            throw new BadRequestAlertException("A new dataAnalysis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataAnalysis result = dataAnalysisRepository.save(dataAnalysis);
        return ResponseEntity.created(new URI("/api/data-analyses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-analyses : Updates an existing dataAnalysis.
     *
     * @param dataAnalysis the dataAnalysis to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataAnalysis,
     * or with status 400 (Bad Request) if the dataAnalysis is not valid,
     * or with status 500 (Internal Server Error) if the dataAnalysis couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-analyses")
    @Timed
    public ResponseEntity<DataAnalysis> updateDataAnalysis(@RequestBody DataAnalysis dataAnalysis) throws URISyntaxException {
        log.debug("REST request to update DataAnalysis : {}", dataAnalysis);
        if (dataAnalysis.getId() == null) {
            return createDataAnalysis(dataAnalysis);
        }
        DataAnalysis result = dataAnalysisRepository.save(dataAnalysis);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataAnalysis.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-analyses : get all the dataAnalyses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataAnalyses in body
     */
    @GetMapping("/data-analyses")
    @Timed
    public List<DataAnalysis> getAllDataAnalyses() {
        log.debug("REST request to get all DataAnalyses");
        return dataAnalysisRepository.findAll();
        }

    /**
     * GET  /data-analyses/:id : get the "id" dataAnalysis.
     *
     * @param id the id of the dataAnalysis to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataAnalysis, or with status 404 (Not Found)
     */
    @GetMapping("/data-analyses/{id}")
    @Timed
    public ResponseEntity<DataAnalysis> getDataAnalysis(@PathVariable Long id) {
        log.debug("REST request to get DataAnalysis : {}", id);
        DataAnalysis dataAnalysis = dataAnalysisRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataAnalysis));
    }

    /**
     * DELETE  /data-analyses/:id : delete the "id" dataAnalysis.
     *
     * @param id the id of the dataAnalysis to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-analyses/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataAnalysis(@PathVariable Long id) {
        log.debug("REST request to delete DataAnalysis : {}", id);
        dataAnalysisRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
