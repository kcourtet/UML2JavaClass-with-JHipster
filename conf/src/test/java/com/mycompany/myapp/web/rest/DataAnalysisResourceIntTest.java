package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.DataApp;

import com.mycompany.myapp.domain.DataAnalysis;
import com.mycompany.myapp.repository.DataAnalysisRepository;
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
 * Test class for the DataAnalysisResource REST controller.
 *
 * @see DataAnalysisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DataApp.class)
public class DataAnalysisResourceIntTest {

    private static final String DEFAULT_LABTYPE = "AAAAAAAAAA";
    private static final String UPDATED_LABTYPE = "BBBBBBBBBB";

    @Autowired
    private DataAnalysisRepository dataAnalysisRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataAnalysisMockMvc;

    private DataAnalysis dataAnalysis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataAnalysisResource dataAnalysisResource = new DataAnalysisResource(dataAnalysisRepository);
        this.restDataAnalysisMockMvc = MockMvcBuilders.standaloneSetup(dataAnalysisResource)
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
    public static DataAnalysis createEntity(EntityManager em) {
        DataAnalysis dataAnalysis = new DataAnalysis()
            .labtype(DEFAULT_LABTYPE);
        return dataAnalysis;
    }

    @Before
    public void initTest() {
        dataAnalysis = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataAnalysis() throws Exception {
        int databaseSizeBeforeCreate = dataAnalysisRepository.findAll().size();

        // Create the DataAnalysis
        restDataAnalysisMockMvc.perform(post("/api/data-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataAnalysis)))
            .andExpect(status().isCreated());

        // Validate the DataAnalysis in the database
        List<DataAnalysis> dataAnalysisList = dataAnalysisRepository.findAll();
        assertThat(dataAnalysisList).hasSize(databaseSizeBeforeCreate + 1);
        DataAnalysis testDataAnalysis = dataAnalysisList.get(dataAnalysisList.size() - 1);
        assertThat(testDataAnalysis.getLabtype()).isEqualTo(DEFAULT_LABTYPE);
    }

    @Test
    @Transactional
    public void createDataAnalysisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataAnalysisRepository.findAll().size();

        // Create the DataAnalysis with an existing ID
        dataAnalysis.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataAnalysisMockMvc.perform(post("/api/data-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataAnalysis)))
            .andExpect(status().isBadRequest());

        // Validate the DataAnalysis in the database
        List<DataAnalysis> dataAnalysisList = dataAnalysisRepository.findAll();
        assertThat(dataAnalysisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataAnalyses() throws Exception {
        // Initialize the database
        dataAnalysisRepository.saveAndFlush(dataAnalysis);

        // Get all the dataAnalysisList
        restDataAnalysisMockMvc.perform(get("/api/data-analyses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataAnalysis.getId().intValue())))
            .andExpect(jsonPath("$.[*].labtype").value(hasItem(DEFAULT_LABTYPE.toString())));
    }

    @Test
    @Transactional
    public void getDataAnalysis() throws Exception {
        // Initialize the database
        dataAnalysisRepository.saveAndFlush(dataAnalysis);

        // Get the dataAnalysis
        restDataAnalysisMockMvc.perform(get("/api/data-analyses/{id}", dataAnalysis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataAnalysis.getId().intValue()))
            .andExpect(jsonPath("$.labtype").value(DEFAULT_LABTYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDataAnalysis() throws Exception {
        // Get the dataAnalysis
        restDataAnalysisMockMvc.perform(get("/api/data-analyses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataAnalysis() throws Exception {
        // Initialize the database
        dataAnalysisRepository.saveAndFlush(dataAnalysis);
        int databaseSizeBeforeUpdate = dataAnalysisRepository.findAll().size();

        // Update the dataAnalysis
        DataAnalysis updatedDataAnalysis = dataAnalysisRepository.findOne(dataAnalysis.getId());
        // Disconnect from session so that the updates on updatedDataAnalysis are not directly saved in db
        em.detach(updatedDataAnalysis);
        updatedDataAnalysis
            .labtype(UPDATED_LABTYPE);

        restDataAnalysisMockMvc.perform(put("/api/data-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataAnalysis)))
            .andExpect(status().isOk());

        // Validate the DataAnalysis in the database
        List<DataAnalysis> dataAnalysisList = dataAnalysisRepository.findAll();
        assertThat(dataAnalysisList).hasSize(databaseSizeBeforeUpdate);
        DataAnalysis testDataAnalysis = dataAnalysisList.get(dataAnalysisList.size() - 1);
        assertThat(testDataAnalysis.getLabtype()).isEqualTo(UPDATED_LABTYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDataAnalysis() throws Exception {
        int databaseSizeBeforeUpdate = dataAnalysisRepository.findAll().size();

        // Create the DataAnalysis

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataAnalysisMockMvc.perform(put("/api/data-analyses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataAnalysis)))
            .andExpect(status().isCreated());

        // Validate the DataAnalysis in the database
        List<DataAnalysis> dataAnalysisList = dataAnalysisRepository.findAll();
        assertThat(dataAnalysisList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataAnalysis() throws Exception {
        // Initialize the database
        dataAnalysisRepository.saveAndFlush(dataAnalysis);
        int databaseSizeBeforeDelete = dataAnalysisRepository.findAll().size();

        // Get the dataAnalysis
        restDataAnalysisMockMvc.perform(delete("/api/data-analyses/{id}", dataAnalysis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataAnalysis> dataAnalysisList = dataAnalysisRepository.findAll();
        assertThat(dataAnalysisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataAnalysis.class);
        DataAnalysis dataAnalysis1 = new DataAnalysis();
        dataAnalysis1.setId(1L);
        DataAnalysis dataAnalysis2 = new DataAnalysis();
        dataAnalysis2.setId(dataAnalysis1.getId());
        assertThat(dataAnalysis1).isEqualTo(dataAnalysis2);
        dataAnalysis2.setId(2L);
        assertThat(dataAnalysis1).isNotEqualTo(dataAnalysis2);
        dataAnalysis1.setId(null);
        assertThat(dataAnalysis1).isNotEqualTo(dataAnalysis2);
    }
}
