package com.RestApi.TeachAid.model;

import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue
    private Long Id;
    private String firstName;
    private String lastName;
    private String course;
    private int grade;
    private String email;

}
