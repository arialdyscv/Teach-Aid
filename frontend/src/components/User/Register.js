import React, { useState,useRef } from 'react';
import { Row, Col, FormControl, Form, Button, Modal, Card, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUserPlus, faUser, faLock, faCancel, faUserCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import AuthService from '../../services/auth.service';
import { isEmail } from "validator";

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
const Register = () => {

  let navigate = useNavigate();
  const form = useRef();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email:"",
    password: "",
  });
  const { username, email, password } = newUser;

  const newUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })

  }
  const initialState = {
    username: "",
    email:"",
    password: ""
  }
  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(username, email, password).then(
      (res) => {
      setNewUser(initialState)
      setMessage(res.data.message);
      navigate("/login")
      window.location.reload();
    },
    (error) => {
      const resMessage =(
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);

    });
  };

  const resetRegisterForm = () => {
    setNewUser(() => initialState);
  }

  return (
      <div>
        <Row style={{"paddingTop":"10rem"}} className='d-flex justify-content-md-center'>
          <Col xs={4}>
            <Card className='container border-light bg-dark text-white'>
              <Card.Header><FontAwesomeIcon icon={faUserPlus} />{' '}Register
              </Card.Header>
              <Card.Body>
                <Form  className='border-dark bg-dark text-white' onSubmit={onSubmit} ref={form}>
                  <Form.Group>
                      <Form.Label><FontAwesomeIcon icon={faUser} />{' '}Username</Form.Label>
                      <FormControl name="username" value={username} required
                          type="text" autoComplete='off'
                          placeholder="Enter Username" 
                          className='border bg-dark text-white'
                          onChange={newUserChange}
                          validations={[required, vusername]}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label className="pt-3"><FontAwesomeIcon icon={faEnvelope} />{' '}Email</Form.Label>
                      <FormControl name="email" value={email} required
                          autoComplete='off' type="email"                        
                          placeholder="Enter email" 
                          className='border bg-dark text-white' 
                          onChange={newUserChange}
                          validations={[required, validEmail]}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                      <Form.Label className="pt-3"><FontAwesomeIcon icon={faLock} />{' '}Password</Form.Label>
                      <FormControl name="password" value={password} required
                            autoComplete='off' type="password"                        
                          placeholder="Enter Password" 
                          className='border bg-dark text-white' 
                          onChange={newUserChange}
                          validations={[required, vpassword]}
                      />
                  </Form.Group>
                  <Row>
                    <Col>
                    <Button size='m' type='button' variant='info'
                        disabled={username.length === 0 || password.length === 0}
                        onClick={onSubmit} ref={form}
                    >
                        <FontAwesomeIcon icon={faUserCheck} /> Register
                    </Button>
                    <Button size='m' type='button' variant='secondary'
                      disabled={username.length === 0 && password.length === 0}
                      onClick={resetRegisterForm}
                      style={{"marginInline":"1rem", "aling":"left"}}
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

export default Register;
