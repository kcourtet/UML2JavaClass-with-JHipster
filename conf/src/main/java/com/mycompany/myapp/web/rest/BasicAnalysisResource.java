package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.BasicAnalysis;

import com.mycompany.myapp.repository.BasicAnalysisRepository;
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
 * REST controller for managing BasicAnalysis.
 */
@RestController
@RequestMapping("/api")
public class BasicAnalysisResource {

    private final Logger log = LoggerFactory.getLogger(BasicAnalysisResource.class);

    private static final String ENTITY_NAME = "basicAnalysis";

    private final BasicAnalysisRepository basicAnalysisRepository;

    public BasicAnalysisResource(BasicAnalysisRepository basicAnalysisRepository) {
        this.basicAnalysisRepository = basicAnalysisRepository;
    }

    /**
     * POST  /basic-analyses : Create a new basicAnalysis.
     *
     * @param basicAnalysis the basicAnalysis to create
     * @return the ResponseEntity with status 201 (Created) and with body the new basicAnalysis, or with status 400 (Bad Request) if the basicAnalysis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/basic-analyses")
    @Timed
    public ResponseEntity<BasicAnalysis> createBasicAnalysis(@RequestBody BasicAnalysis basicAnalysis) throws URISyntaxException {
        log.debug("REST request to save BasicAnalysis : {}", basicAnalysis);
        if (basicAnalysis.getId() != null) {
            throw new BadRequestAlertException("A new basicAnalysis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BasicAnalysis result = basicAnalysisRepository.save(basicAnalysis);
        return ResponseEntity.created(new URI("/api/basic-analyses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /basic-analyses : Updates an existing basicAnalysis.
     *
     * @param basicAnalysis the basicAnalysis to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated basicAnalysis,
     * or with status 400 (Bad Request) if the basicAnalysis is not valid,
     * or with status 500 (Internal Server Error) if the basicAnalysis couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/basic-analyses")
    @Timed
    public ResponseEntity<BasicAnalysis> updateBasicAnalysis(@RequestBody BasicAnalysis basicAnalysis) throws URISyntaxException {
        log.debug("REST request to update BasicAnalysis : {}", basicAnalysis);
        if (basicAnalysis.getId() == null) {
            return createBasicAnalysis(basicAnalysis);
        }
        BasicAnalysis result = basicAnalysisRepository.save(basicAnalysis);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, basicAnalysis.getId().toString()))
            .body(result);
    }

    /**
     * GET  /basic-analyses : get all the basicAnalyses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of basicAnalyses in body
     */
    @GetMapping("/basic-analyses")
    @Timed
    public List<BasicAnalysis> getAllBasicAnalyses() {
        log.debug("REST request to get all BasicAnalyses");
        return basicAnalysisRepository.findAll();
        }

    /**
     * GET  /basic-analyses/:id : get the "id" basicAnalysis.
     *
     * @param id the id of the basicAnalysis to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the basicAnalysis, or with status 404 (Not Found)
     */
    @GetMapping("/basic-analyses/{id}")
    @Timed
    public ResponseEntity<BasicAnalysis> getBasicAnalysis(@PathVariable Long id) {
        log.debug("REST request to get BasicAnalysis : {}", id);
        BasicAnalysis basicAnalysis = basicAnalysisRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(basicAnalysis));
    }

    /**
     * DELETE  /basic-analyses/:id : delete the "id" basicAnalysis.
     *
     * @param id the id of the basicAnalysis to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/basic-analyses/{id}")
    @Timed
    public ResponseEntity<Void> deleteBasicAnalysis(@PathVariable Long id) {
        log.debug("REST request to delete BasicAnalysis : {}", id);
        basicAnalysisRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
