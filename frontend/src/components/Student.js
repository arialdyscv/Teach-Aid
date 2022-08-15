import React, { useState } from 'react'
import { Card, Form, Button, Col, Row } from 'react-bootstrap'
//import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import AuthHeader from '../services/auth-header';

export default function Student() {

  //let navigate = useNavigate();

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
    });
  };

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

  return (
    <div>
        <Card className={"border border-dark bg-dark text-white mt-5"}>
          <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Student</Card.Header>
          <Form  onReset={resetStudent} onSubmit={(e)=>onSubmit} id="studentFormId">
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
              <Button size="m" variant="secondary" type="submit">
                <FontAwesomeIcon icon={faSave} />Submit
              </Button>{'  '}
              <Button size="m" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
    </div>      
  )
}
