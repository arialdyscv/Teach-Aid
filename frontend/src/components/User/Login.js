import React,{useState} from 'react';
import { Row, Col, Card, FormControl, InputGroup, Form, Button, ButtonGroup, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faUser, faLock, faCancel, faUserPlus} from '@fortawesome/free-solid-svg-icons';


export default function Login() {
    const [credentials,setCredentials] = useState({
        username:"",
        password:""
    });

    const initialState = {
        username: "",
        password: ""
    }

    const{username, password} = credentials

    const credentialChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value})

    }

    const resetLoginForm = () => {
        setCredentials(() => initialState);
    }

  return (
    <div>
        <Row className='justify-content-md-center'>
            <Col xs={5}>
                <Card className='border border-dark bg-dark text-white'>
                    <Card.Header>
                        <FontAwesomeIcon icon={faSignInAlt}/> Login
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col}>
                                <InputGroup className='pb-3'>
                                        <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        <FormControl required autoComplete='off' 
                                            type='username' name='username' value={username} onChange={credentialChange}
                                            className={"bg-dark text-white"} placeholder='Enter User Name'
                                        />
                                </InputGroup>
                                
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <InputGroup >
                                    <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                    <FormControl required autoComplete='off' 
                                        type='password' name='password' value={password} onChange={credentialChange}
                                        className={"bg-dark text-white"} placeholder='Enter Password'
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Row>            
                    </Card.Body>
                    <Card.Footer className='container' >
                        <Row >
                            <Col className='d-flex justify-content-start'>
                                <Link to={"/register"} size='sm' type='button' variant='success' className='btn btn-sm btn-success m-1'>
                                    <FontAwesomeIcon icon={faUserPlus}/> Register
                                </Link>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Button size='sm' type='button' variant='info' className='m-1'
                                    disabled={username.length === 0 || password.length === 0}
                                >
                                    <FontAwesomeIcon icon={faSignInAlt}/> Login
                                </Button>
                                <Button size='sm' type='button' variant='secondary' className='m-1'
                                    disabled={username.length === 0 && password.length === 0}
                                    onClick={resetLoginForm}
                                >
                                    <FontAwesomeIcon icon={faCancel}/> Cancel
                                </Button>
                            </Col>
                        </Row>                  
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    </div>
  )
}
