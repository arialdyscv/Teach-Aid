import React,{useState} from 'react';
import { Row, Col, Card, FormControl, InputGroup, Form, Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faUser, faLock, faCancel, faUserCheck} from '@fortawesome/free-solid-svg-icons';

export default function Register() {

  const [newUser,setNewUser] = useState({
    username:"",
    password:""
  });

  const initialState = {
    username: "",
    password: ""
  }

  const{username, password} = newUser

  const newUserChange = (e) => {
    setNewUser({...newUser,[e.target.name]:e.target.value})

  }

  const resetRegisterForm = () => {
    setNewUser(() => initialState);
  }

  return (
    <div>
        <Row className='container-fluid flex-d justify-content-md-center'>
          <Col xs={5}>
            <Card className='border border-dark bg-dark text-white'>
              <Card.Header>
                <FontAwesomeIcon icon={faUserPlus}/> New User
              </Card.Header>
              <Card.Body>
                <Row>
                  <Form.Group as={Col}>
                    <InputGroup className='pb-3'>
                      <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                      <FormControl required autoComplete='off' 
                        type='username' name='username' value={username} onChange={newUserChange}
                        className={"bg-dark text-white"} 
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col}>
                    <InputGroup >
                      <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                      <FormControl required autoComplete='off' 
                        type='password' name='password' value={password} onChange={newUserChange}
                        className={"bg-dark text-white"}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row> 
              </Card.Body>
              <Card.Footer>
                <Button size='sm' type='button' variant='info'
                  disabled={username.length === 0 || password.length === 0}
                >
                  <FontAwesomeIcon icon={faUserCheck}/> Register
                </Button>
                {' '}
                <Button size='sm' type='button' variant='secondary'
                  disabled={username.length === 0 && password.length === 0}
                  onClick={resetRegisterForm}
                >
                  <FontAwesomeIcon icon={faCancel}/> Cancel
                </Button>
              </Card.Footer>
              
            </Card>
          
          </Col>
        </Row>
    </div>
  )
}
