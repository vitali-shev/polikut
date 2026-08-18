package com.polikut.feature.delivery.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Settlement {

    @Id
    private String ref;
    String description;
    String regionsDescription;
    String areaDescription;

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegionsDescription() {
        return regionsDescription;
    }

    public void setRegionsDescription(String regionsDescription) {
        this.regionsDescription = regionsDescription;
    }

    public String getAreaDescription() {
        return areaDescription;
    }

    public void setAreaDescription(String areaDescription) {
        this.areaDescription = areaDescription;
    }
}
