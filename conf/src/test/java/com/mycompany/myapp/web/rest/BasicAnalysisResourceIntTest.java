package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DataApp;

import com.mycompany.myapp.domain.BasicAnalysis;
import com.mycompany.myapp.repository.BasicAnalysisRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BasicAnalysisResource REST controller.
 *
 * @see BasicAnalysisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataApp.class)
public class BasicAnalysisResourceIntTest {

    private static final String DEFAULT_TECHNOLOGY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TECHNOLOGY_TYPE = "BBBBBBBBBB";

    private static final Float DEFAULT_MEASURE_1 = 1F;
    private static final Float UPDATED_MEASURE_1 = 2F;

    private static final Float DEFAULT_SCORE = 1F;
    private static final Float UPDATED_SCORE = 2F;

    private static final Integer DEFAULT_ID = 1;
    private static final Integer UPDATED_ID = 2;

    @Autowired
    private BasicAnalysisRepository basicAnalysisRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBasicAnalysisMockMvc;

    private BasicAnalysis basicAnalysis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BasicAnalysisResource basicAnalysisResource = new BasicAnalysisResource(basicAnalysisRepository);
        this.restBasicAnalysisMockMvc = MockMvcBuilders.standaloneSetup(basicAnalysisResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BasicAnalysis createEntity(EntityManager em) {
        BasicAnalysis basicAnalysis = new BasicAnalysis()
            .technologyType(DEFAULT_TECHNOLOGY_TYPE)
            .measure1(DEFAULT_MEASURE_1)
            .score(DEFAULT_SCORE)
            .id(DEFAULT_ID);
        return basicAnalysis;
    }

    @Before
    public void initTest() {
        basicAnalysis = createEntity(em);
    }

    @Test
    @Transactional
    public void createBasicAnalysis() throws Exception {
        int databaseSizeBeforeCreate = basicAnalysisRepository.findAll().size();

        // Create the BasicAnalysis
        restBasicAnalysisMockMvc.perform(post("/api/basic-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basicAnalysis)))
            .andExpect(status().isCreated());

        // Validate the BasicAnalysis in the database
        List<BasicAnalysis> basicAnalysisList = basicAnalysisRepository.findAll();
        assertThat(basicAnalysisList).hasSize(databaseSizeBeforeCreate + 1);
        BasicAnalysis testBasicAnalysis = basicAnalysisList.get(basicAnalysisList.size() - 1);
        assertThat(testBasicAnalysis.getTechnologyType()).isEqualTo(DEFAULT_TECHNOLOGY_TYPE);
        assertThat(testBasicAnalysis.getMeasure1()).isEqualTo(DEFAULT_MEASURE_1);
        assertThat(testBasicAnalysis.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testBasicAnalysis.getId()).isEqualTo(DEFAULT_ID);
    }

    @Test
    @Transactional
    public void createBasicAnalysisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = basicAnalysisRepository.findAll().size();

        // Create the BasicAnalysis with an existing ID
        basicAnalysis.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasicAnalysisMockMvc.perform(post("/api/basic-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basicAnalysis)))
            .andExpect(status().isBadRequest());

        // Validate the BasicAnalysis in the database
        List<BasicAnalysis> basicAnalysisList = basicAnalysisRepository.findAll();
        assertThat(basicAnalysisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBasicAnalyses() throws Exception {
        // Initialize the database
        basicAnalysisRepository.saveAndFlush(basicAnalysis);

        // Get all the basicAnalysisList
        restBasicAnalysisMockMvc.perform(get("/api/basic-analyses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basicAnalysis.getId().intValue())))
            .andExpect(jsonPath("$.[*].technologyType").value(hasItem(DEFAULT_TECHNOLOGY_TYPE.toString())))
            .andExpect(jsonPath("$.[*].measure1").value(hasItem(DEFAULT_MEASURE_1.doubleValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE.doubleValue())))
            .andExpect(jsonPath("$.[*].id").value(hasItem(DEFAULT_ID)));
    }

    @Test
    @Transactional
    public void getBasicAnalysis() throws Exception {
        // Initialize the database
        basicAnalysisRepository.saveAndFlush(basicAnalysis);

        // Get the basicAnalysis
        restBasicAnalysisMockMvc.perform(get("/api/basic-analyses/{id}", basicAnalysis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(basicAnalysis.getId().intValue()))
            .andExpect(jsonPath("$.technologyType").value(DEFAULT_TECHNOLOGY_TYPE.toString()))
            .andExpect(jsonPath("$.measure1").value(DEFAULT_MEASURE_1.doubleValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE.doubleValue()))
            .andExpect(jsonPath("$.id").value(DEFAULT_ID));
    }

    @Test
    @Transactional
    public void getNonExistingBasicAnalysis() throws Exception {
        // Get the basicAnalysis
        restBasicAnalysisMockMvc.perform(get("/api/basic-analyses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBasicAnalysis() throws Exception {
        // Initialize the database
        basicAnalysisRepository.saveAndFlush(basicAnalysis);
        int databaseSizeBeforeUpdate = basicAnalysisRepository.findAll().size();

        // Update the basicAnalysis
        BasicAnalysis updatedBasicAnalysis = basicAnalysisRepository.findOne(basicAnalysis.getId());
        // Disconnect from session so that the updates on updatedBasicAnalysis are not directly saved in db
        em.detach(updatedBasicAnalysis);
        updatedBasicAnalysis
            .technologyType(UPDATED_TECHNOLOGY_TYPE)
            .measure1(UPDATED_MEASURE_1)
            .score(UPDATED_SCORE)
            .id(UPDATED_ID);

        restBasicAnalysisMockMvc.perform(put("/api/basic-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBasicAnalysis)))
            .andExpect(status().isOk());

        // Validate the BasicAnalysis in the database
        List<BasicAnalysis> basicAnalysisList = basicAnalysisRepository.findAll();
        assertThat(basicAnalysisList).hasSize(databaseSizeBeforeUpdate);
        BasicAnalysis testBasicAnalysis = basicAnalysisList.get(basicAnalysisList.size() - 1);
        assertThat(testBasicAnalysis.getTechnologyType()).isEqualTo(UPDATED_TECHNOLOGY_TYPE);
        assertThat(testBasicAnalysis.getMeasure1()).isEqualTo(UPDATED_MEASURE_1);
        assertThat(testBasicAnalysis.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testBasicAnalysis.getId()).isEqualTo(UPDATED_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingBasicAnalysis() throws Exception {
        int databaseSizeBeforeUpdate = basicAnalysisRepository.findAll().size();

        // Create the BasicAnalysis

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBasicAnalysisMockMvc.perform(put("/api/basic-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basicAnalysis)))
            .andExpect(status().isCreated());

        // Validate the BasicAnalysis in the database
        List<BasicAnalysis> basicAnalysisList = basicAnalysisRepository.findAll();
        assertThat(basicAnalysisList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBasicAnalysis() throws Exception {
        // Initialize the database
        basicAnalysisRepository.saveAndFlush(basicAnalysis);
        int databaseSizeBeforeDelete = basicAnalysisRepository.findAll().size();

        // Get the basicAnalysis
        restBasicAnalysisMockMvc.perform(delete("/api/basic-analyses/{id}", basicAnalysis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BasicAnalysis> basicAnalysisList = basicAnalysisRepository.findAll();
        assertThat(basicAnalysisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BasicAnalysis.class);
        BasicAnalysis basicAnalysis1 = new BasicAnalysis();
        basicAnalysis1.setId(1L);
        BasicAnalysis basicAnalysis2 = new BasicAnalysis();
        basicAnalysis2.setId(basicAnalysis1.getId());
        assertThat(basicAnalysis1).isEqualTo(basicAnalysis2);
        basicAnalysis2.setId(2L);
        assertThat(basicAnalysis1).isNotEqualTo(basicAnalysis2);
        basicAnalysis1.setId(null);
        assertThat(basicAnalysis1).isNotEqualTo(basicAnalysis2);
    }
}
