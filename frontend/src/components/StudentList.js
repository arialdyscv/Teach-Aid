import { faList, faEdit, faEraser, faFilePdf, faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Table, ButtonGroup, Button, Form, Row, Col } from 'react-bootstrap';
import AuthHeader from '../services/auth-header';
import axios from 'axios';
import download from 'downloadjs';
/*allows to make http requests to external resources
 with promise-based, so we can use async and await for asynchronous code
 supporting http verbs(post, put, get, delete, etc)*/

export default function StudentList() {

  const [ student,setStudent ] = useState({
    firstName:"",
    lastName:"",
    course:"",
    grade:0,
    email:"",
    id:""
  });

  const {firstName,lastName,course,grade,email,} = student;

  const onInputChange=(e)=>{

    setStudent({...student,[e.target.name]:e.target.value})
  };

 const onSubmit =async (e)=>{
    e.preventDefault()
    await axios.post("http://localhost:8080/data/student", student, { headers: AuthHeader() })
    .then(res => {
      if(res.data != null) {
        setStudent(initialState);
        alert("Student Saved Successfully");
      }
    }).catch(error => console.log(error));
  };

  const editStudent = async (e,studentId) => {
    e.preventDefault()
     await axios.put("http://localhost:8080/data/student/"+ studentId, student, { headers: AuthHeader() })
     .then(res => {
      if(res.data != null) {
        setStudent(initialState);
        alert("Student Updated Successfully");
      }
    }).catch(error => console.log(error));
  }

 const initialState = {
    firstName:"",
    lastName:"",
    course:"",
    grade:0,
    email:"",
    id:""
  };

 const resetStudent = () => {
  setStudent(() => initialState)
 };





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
  },students,[]);

  const deleteStudent = (studentId) => {
    axios.delete("http://localhost:8080/data/student/"+studentId, { headers: AuthHeader() } )
    .then(res=> {
      if(res.data != null) {
        setStudents(students.filter(student => student.id !== studentId))
        alert("Student deleted successfully");
      }
    });
    
  };

  const findStudentById = (studentId) => {
    console.log(studentId)
    axios.get("http://localhost:8080/data/student/"+studentId, { headers: AuthHeader() })
    .then( res => {
      if(res.data != null){
        console.log(res.data)
        setStudent({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            course: res.data.course,
            grade: res.data.grade,
            email: res.data.email,
          })
      }}).catch((error) => {
        console.error("Error: "+error)
      });
  };
  
  return (
    <div>
      <div>
          <Card className={"border border-dark bg-dark text-white mt-5"}>
            <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Student</Card.Header>
            <Form  onReset={resetStudent} onSubmit={student.id != null?(e) => onSubmit(e) : (e)=> editStudent(e, student.id)} id="studentFormId">
              <Card.Body>
                <Row>
                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control 
                      type="text" name="firstName" required autoComplete='off'
                      placeholder="Enter Student Name"
                      className={"bg-dark text-white"}
                      onChange={(e)=>onInputChange(e)}
                      value={firstName}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Student Last Name</Form.Label>
                    <Form.Control 
                      type="text" name="lastName" required autoComplete='off'
                      placeholder="Enter Student Last Name"
                      className={"bg-dark text-white"}
                      onChange={(e)=>onInputChange(e)}
                      value={lastName}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Student course</Form.Label>
                    <Form.Control 
                      type="text" name="course" required autoComplete='off'
                      placeholder="Enter Student course"
                      className={"bg-dark text-white"}
                      onChange={(e)=>onInputChange(e)}
                      value={course}
                    />
                  </Form.Group>
                
                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Student grade</Form.Label>
                    <Form.Control 
                      type="text" name="grade" autoComplete='off'
                      placeholder="Enter Student grade"
                      className={"bg-dark text-white"}
                      onChange={(e)=>onInputChange(e)}
                      value={grade}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Student email</Form.Label>
                    <Form.Control 
                      type="text" name="email" autoComplete='off'
                      placeholder="Enter Student email"
                      className={"bg-dark text-white"}
                      onChange={(e)=>onInputChange(e)}
                      value={email}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
              <Card.Footer style={{"textAlign":"right"}}>
               {student.id != null ?(
                <Button size="m" variant="secondary" type="submit"> <FontAwesomeIcon icon={faSave} />Submit</Button>
                  ):
                  <Button size="m" variant="secondary" type="submit"> <FontAwesomeIcon icon={faEdit} /> Update</Button>}
                {'  '}
                <Button size="m" variant="info" type="reset">
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </Button>
              </Card.Footer>
            </Form>
          </Card>
      </div> 
      <div>
        <Card className={"border border-dark bg-dark text-white mt-5"}>
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
                          <Button size='sm' variant='outline-primary' onClick={(e)=>{findStudentById(student.id)}}><FontAwesomeIcon icon={faEdit}/></Button>
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
    </div>
  )
}
