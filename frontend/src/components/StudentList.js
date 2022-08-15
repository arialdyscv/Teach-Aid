import { faList, faEdit, faEraser, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthHeader from '../services/auth-header';
import axios from 'axios';
import download from 'downloadjs';
/*allows to make http requests to external resources
 with promise-based, so we can use async and await for asynchronous code
 supporting http verbs(post, put, get, delete, etc)*/

export default function BookList() {

  

  const [students,setStudents] = useState([])

  const loadStudents = async() => {
    const result = await axios.get
    ("http://localhost:8080/data/students", { headers: AuthHeader() })
    setStudents(result.data);
  }

  const generatePdfList = (e) => {   
    axios.get("http://localhost:8080/pdf/generate/report", { headers: AuthHeader(), responseType: 'blob' })
    .then( res => {
      if(res.data != null) {
        const content = res.headers['content-type'];
        download(res.data, "StudentListReport"  ,content)
      }
    })
    .catch(error => console.log(error));
  } 

  useEffect(() => {
    loadStudents();
  }, []);

  const deleteStudent = (studentId) => {
    axios.delete("http://localhost:8080/data/student/"+studentId, { headers: AuthHeader() } )
    .then(res=> {
      if(res.data != null) {
        setStudents(students.filter(student => student.id !== studentId))
        alert("Student deleted successfully");
      }
    });
    
  };

  return (
    <div>  
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={faList}/>   STUDENTS LIST</Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr align="center">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ?
                <tr align="center">
                  <td colSpan={6}>No Students Available.</td>
                </tr> :
                students.map(student => (
                  <tr key={student.id} align="center">
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.course}</td>
                    <td>{student.grade}</td>
                    <td>{student.email}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={"/student/"+student.id} className='btn btn-sm btn-outline-primary'><FontAwesomeIcon icon={faEdit}/></Link>
                        <Button size='sm' variant='outline-danger' onClick={(e)=>{deleteStudent(student.id)}}><FontAwesomeIcon icon={faEraser}/></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              }
          </tbody>
          </Table>
          
        </Card.Body>
        <Card.Footer className='container-fluid d-flex justify-content-end' >
          <Button size='lg' variant='success' onClick={(e)=>generatePdfList()}><FontAwesomeIcon icon={faFilePdf}/></Button>
        </Card.Footer>
      </Card>
    </div>
  )
}
