import React,{useState} from 'react';
import { Row, Col, Card, FormControl, InputGroup, Form, Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faEnvelope, faLock, faCancel} from '@fortawesome/free-solid-svg-icons';


export default function Login() {
    const [credentials,setCredentials] = useState({
        email:"",
        password:""
    });

    const initialState = {
        email: "",
        password: ""
    }

    const{email, password} = credentials

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
                                <InputGroup style={{"padding-bottom":"10px"}}>
                                        <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        <FormControl required autoComplete='off' 
                                            type='email' name='email' value={email} onChange={credentialChange}
                                            className={"bg-dark text-white"} placeholder='Enter Email Address'
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
                    <Card.Footer style={{"text-align":"right"}}>
                        <Button size='sm' type='button' variant='info'
                            disabled={email.length === 0 || password.length === 0}
                        >
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Button>
                        {' '}
                        <Button size='sm' type='button' variant='secondary'
                            disabled={email.length === 0 && password.length === 0}
                            onClick={resetLoginForm}
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
