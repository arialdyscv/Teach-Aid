import React, { useState, useRef } from 'react';
import { Row, Col, Card, Form, Button,FormControl, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faLock, faCancel, faUserPlus } from '@fortawesome/free-solid-svg-icons';



const Login = () => {

    let navigate = useNavigate();
    const form = useRef();
    const [message, setMessage] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const { username, password } = credentials;

    const credentialChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    };

    const initialState = {
        username: "",
        password: ""
    }

    const resetLoginForm = () => {
        setCredentials(() => initialState);
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        //form.current.ValidateAll();
        //if(checkBtn.current.context._errors.length === 0) {
           AuthService.login(username, password)
            .then(() => {
                navigate("/list");
                window.location.reload();
            },(error) => {
                const resMessage = (error.response && error.response.data.message) ||
                error.message || error.toString();
                return setMessage(resMessage);;
            });
        //}
    };


    return (
            <div>
                <Row style={{"paddingTop":"10rem"}} className='d-flex justify-content-md-center'>
                    <Col xs={3}>
                        <Card className='container border-light bg-dark text-white'>
                            <Card.Header>
                            <img className='justify-content-end'
                                    src="https://img.icons8.com/external-kosonicon-flat-kosonicon/64/000000/external-education-insurance-kosonicon-flat-kosonicon.png"
                                    width="32"
                                    height="32"
                                    alt='logo'
                                />{' '}<FontAwesomeIcon icon={faSignInAlt} />{' '}Login
                               
                            </Card.Header>
                            <Card.Body>
                                <Form  className='border-dark bg-dark text-white' onSubmit={onSubmit} ref={form}>
                                    <Form.Group>
                                        <Form.Label><FontAwesomeIcon icon={faUser} />{' '}Username</Form.Label>
                                        <FormControl name="username" value={username} required
                                            type="text" autoComplete='off'
                                            placeholder="Enter Username" 
                                            className='border bg-dark text-white'
                                            onChange={credentialChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" >
                                        <Form.Label className="pt-3"><FontAwesomeIcon icon={faLock} />{' '}Password</Form.Label>
                                        <FormControl name="password" value={password} required
                                             autoComplete='off' type="password"                        
                                            placeholder="Enter Password" 
                                            className='border bg-dark text-white' 
                                            onChange={credentialChange}
                                        />
                                    </Form.Group>
                                    <Row>
                                        <Col className='d-flex justify-content-start'>
                                            <Link to={"/register"}  type='button' variant='success' className='btn btn-m btn-success m-1'>
                                                <FontAwesomeIcon icon={faUserPlus} /> Register
                                            </Link>
                                        </Col>
                                        <Col className='d-flex justify-content-end'>
                                            <Button size='sm' type='button' variant='info' style={{"marginInline":"1rem"}}
                                                disabled={username.length === 0 || password.length === 0}
                                                onClick={onSubmit} ref={form}
                                            >
                                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                                            </Button>

                                            <Button size='sm' type='button' variant='secondary' 
                                                    disabled={username.length === 0 && password.length === 0}
                                                    onClick={resetLoginForm}
                                                >
                                                    <FontAwesomeIcon icon={faCancel} /> Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='pt-3'>
                                        {message && (
                                                <Form.Group>
                                                    <Alert className="alert alert-danger" role="alert">
                                                        {message}
                                                    </Alert>
                                                </Form.Group>
                                        )}
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row>
            </div>
    );
};
export default Login;