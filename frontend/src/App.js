import './App.css';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt , faUserPlus} from '@fortawesome/free-solid-svg-icons';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Student from './components/Student';
import StudentList from './components/StudentList';
import UsersList from './components/User/UsersList';
import Login from './components/User/Login';
import Register from './components/User/Register';
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";



const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <div>
      <Navbar bg="dark" variant="dark p-3">
          <Navbar.Brand href='/'>
            <img 
              src="https://img.icons8.com/external-kosonicon-flat-kosonicon/64/000000/external-education-insurance-kosonicon-flat-kosonicon.png"
              width="32"
              height="32"
              alt='logo'
            />
            <Link className='navbar-brand' to={"/"}>Teach Aid</Link>
          </Navbar.Brand>
          <Nav className='container-fluid d-flex justify-content-start'>
            <Link to={"student"} className='nav-link'>Add Student</Link>
            {showAdminBoard && (
              <NavItem>
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </NavItem>
            )}
            <Link to={"list"} className='nav-link'>Students List</Link>
            <Link to={"users"} className='nav-link'>Users List</Link>
          </Nav>
          <Nav className='container-fluid d-flex justify-content-end' >
            <Link to={"register"} className='nav-link' ><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
            <Link to={"login"} className='nav-link' ><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
          </Nav>
      </Navbar>
      </div>
        <div>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/student" element={<Student/>}/>
          <Route exact path="/student/:id" element={<Student/>}/>
          <Route exact path="/list" element={<StudentList/>}/>
          <Route exact path="/users" element={<UsersList/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
    
    
  );
}

export default App;
