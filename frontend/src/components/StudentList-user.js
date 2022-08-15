import { faList, faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import { Link } from 'react-router-dom';
import axios from 'axios';/*allows to make http requests to external resources
 with promise-based, so we can use async and await for asynchronous code
 supporting http verbs(post, put, get, delete, etc)*/
import eventBus from '../common/EventBus';

export default function StudentListUser() {

  const [content, setContent] = useState("");
  const [students,setStudents] = useState([]);

  useEffect(() => {
    UserService.getUserBoard().then(
      (res) => {
        setContent(loadStudents);
      },
      (error) => {
        const _content =(
          error.res && error.res.data && error.res.data.message ||
            error.message || error.toString() 
        )
        setContent(_content);
        if(error.res && error.res.status === 401) {
          eventBus.dispatch("logout");
        }
      });
    
  }, []);

  const loadStudents = async() => {
    const result = await axios.get
    ("http://localhost:8080/students")
    setStudents(result.data);
  }

  

  const deleteStudent = (studentId) => {
    axios.delete("http://localhost:8080/student/"+studentId)
    .then(res=> {
      if(res.data != null) {
        setStudents(students.filter(student => student.id !== studentId))
        alert("Student deleted successfully");
      }
    });
    
  };

  return (
    <div>  
      user content
    </div>
  )
}
