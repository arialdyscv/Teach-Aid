package com.RestApi.TeachAid.Repos;

import com.RestApi.TeachAid.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}

