package com.RestApi.TeachAid.repo;

import com.RestApi.TeachAid.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
/*JpaRepo adds functions like findAll,Save,Delete and many more*/

public interface StudentRepo extends JpaRepository<Student, Long> {
}
