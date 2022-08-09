import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt , faUserPlus} from '@fortawesome/free-solid-svg-icons';


export default function NavigationBar() {
  
    return (
        
        <Navbar bg="dark" variant="dark p-3">
          <Link className='navbar-brand' to={"/"}>Teach Aid</Link>
          <Nav className='container-fluid d-flex justify-content-start'>
            <Link to={"student"} className='nav-link'>Add Student</Link>
            <Link to={"list"} className='nav-link'>Students List</Link>
            <Link to={"users"} className='nav-link'>Users List</Link>
          </Nav>
          <Nav className='container-fluid d-flex justify-content-end' >
            <Link to={"register"} className='nav-link' ><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
            <Link to={"login"} className='nav-link' ><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
          </Nav>
      </Navbar>
    )
}