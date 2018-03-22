package com.mycompany.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DataAnalysis.
 */
@Entity
@Table(name = "data_analysis")
public class DataAnalysis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "labtype")
    private String labtype;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabtype() {
        return labtype;
    }

    public DataAnalysis labtype(String labtype) {
        this.labtype = labtype;
        return this;
    }

    public void setLabtype(String labtype) {
        this.labtype = labtype;
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
        DataAnalysis dataAnalysis = (DataAnalysis) o;
        if (dataAnalysis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataAnalysis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataAnalysis{" +
            "id=" + getId() +
            ", labtype='" + getLabtype() + "'" +
            "}";
    }
}
