package com.RestApi.TeachAid.controller;

import com.RestApi.TeachAid.Repos.StudentRepo;
import com.RestApi.TeachAid.exception.StudentNotFoundException;
import com.RestApi.TeachAid.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController//Controller for rest api
@CrossOrigin(origins = "http://localhost:3000")//allows to pass data with frontend app
@RequestMapping("/data")
public class StudentController {

    @Autowired//connecting student repo Interface
    private StudentRepo studentRepository;


    @PostMapping("/student")//to post the data
    @PreAuthorize("hasRole('USER')")
    Student newStudent(@RequestBody Student newStudent){
        return studentRepository.save(newStudent);
    }


    @GetMapping("/students")//to get the data
    @PreAuthorize("hasRole('USER')")
    List<Student> getAllStudents(){
        return studentRepository.findAll();
    }


    @GetMapping("/student/{id}")
    @PreAuthorize("hasRole('USER')")
    Student getStudentById(@PathVariable Long id){//to get specific variable
        return studentRepository.findById(id)
                .orElseThrow(()->new StudentNotFoundException(id));//Exception in case of error
    }

    @PutMapping("/student/{id}")
    @PreAuthorize("hasRole('USER')")
    Student editStudentById(@PathVariable Student editStudent){//to get specific variable
        return studentRepository.save(editStudent);
    }

    @DeleteMapping("/student/{id}")
    @PreAuthorize("hasRole('USER')")
    Student deleteStudentById(@PathVariable Long id){//to get specific variable
        Optional<Student> student = studentRepository.findById(id);
        if(!student.isPresent()) {
            throw new StudentNotFoundException(id);
        } else {
            studentRepository.deleteById(id);
        }

        return null;
    }


}
