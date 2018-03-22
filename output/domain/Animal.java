package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Animal.
 */
@Entity
@Table(name = "animal")
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "legacyid")
    private String legacyid;

    @Column(name = "species")
    private String species;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private BasicAnalysis basicAnalysis;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLegacyid() {
        return legacyid;
    }

    public Animal legacyid(String legacyid) {
        this.legacyid = legacyid;
        return this;
    }

    public void setLegacyid(String legacyid) {
        this.legacyid = legacyid;
    }

    public String getSpecies() {
        return species;
    }

    public Animal species(String species) {
        this.species = species;
        return this;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public BasicAnalysis getBasicAnalysis() {
        return basicAnalysis;
    }

    public Animal basicAnalysis(BasicAnalysis basicAnalysis) {
        this.basicAnalysis = basicAnalysis;
        return this;
    }

    public void setBasicAnalysis(BasicAnalysis basicAnalysis) {
        this.basicAnalysis = basicAnalysis;
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
        Animal animal = (Animal) o;
        if (animal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), animal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Animal{" +
            "id=" + getId() +
            ", legacyid='" + getLegacyid() + "'" +
            ", species='" + getSpecies() + "'" +
            "}";
    }
}
