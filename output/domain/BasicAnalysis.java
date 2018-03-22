package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A BasicAnalysis.
 */
@Entity
@Table(name = "basic_analysis")
public class BasicAnalysis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "technology_type")
    private String technologyType;

    @Column(name = "measure_1")
    private Float measure1;

    @Column(name = "score")
    private Float score;

    @Column(name = "id")
    private Integer id;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTechnologyType() {
        return technologyType;
    }

    public BasicAnalysis technologyType(String technologyType) {
        this.technologyType = technologyType;
        return this;
    }

    public void setTechnologyType(String technologyType) {
        this.technologyType = technologyType;
    }

    public Float getMeasure1() {
        return measure1;
    }

    public BasicAnalysis measure1(Float measure1) {
        this.measure1 = measure1;
        return this;
    }

    public void setMeasure1(Float measure1) {
        this.measure1 = measure1;
    }

    public Float getScore() {
        return score;
    }

    public BasicAnalysis score(Float score) {
        this.score = score;
        return this;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public Integer getId() {
        return id;
    }

    public BasicAnalysis id(Integer id) {
        this.id = id;
        return this;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BasicAnalysis basicAnalysis = (BasicAnalysis) o;
        if (basicAnalysis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), basicAnalysis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BasicAnalysis{" +
            "id=" + getId() +
            ", technologyType='" + getTechnologyType() + "'" +
            ", measure1=" + getMeasure1() +
            ", score=" + getScore() +
            ", id=" + getId() +
            "}";
    }
}
