package com.RestApi.TeachAid.model;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@Entity
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
