package com.polikut.feature.category.entity;

import com.polikut.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
public class Category extends BaseEntity {

    private String icon;

    @Column(unique = true)
    private String name;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
