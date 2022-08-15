import './App.css';
import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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
import Profile from './components/profile';
import BoardUser from './components/BoardUser';



const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
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
    setCurrentUser(undefined);
  };

  const navCss = {
    width: "149%",
    marginLeft: "-25%",

  }

  return (
    <div className='container'>
      <Navbar style={navCss} bg="dark" variant="dark">
          <Navbar.Brand href='/' style={{"paddingLeft":"2rem"}}>
            <img 
              src="https://img.icons8.com/external-kosonicon-flat-kosonicon/64/000000/external-education-insurance-kosonicon-flat-kosonicon.png"
              width="32"
              height="32"
              alt='logo'
            />
            <Link className='navbar-brand' to={"/"}>Teach Aid</Link>
          </Navbar.Brand>
            <Nav>
              {currentUser && (
                  <NavItem>
                    <Link to={"profile"} className='nav-link'>User Profile</Link>
                  </NavItem>
                )
              }
            </Nav>
              
              {currentUser ? (
                <div className='container'>
                    <Nav>
                      <NavItem >
                        <Link to={"user/student"} className='nav-link'>Add Student</Link>
                      </NavItem>
                      <NavItem>
                        <Link to={"user/list"} className='nav-link'>Students List</Link>
                      </NavItem>
                    </Nav> 
                    <Nav>
                      <NavItem >
                        <Link to="/login" className="nav-link" onClick={logOut}>
                          LogOut
                        </Link>
                      </NavItem>
                    </Nav> 
                </div>  
              ) : (
                <Nav className='container-fluid d-flex justify-content-end' >
                <Link to={"register"} className='nav-link' ><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                <Link to={"login"} className='nav-link' ><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
              </Nav>
              )}
        </Navbar>
        <div>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="user/student" element={<Student/>}/>
          <Route exact path="student/:id" element={<Student/>}/>
          <Route exact path="user/list" element={<StudentList/>}/>
          <Route exact path="/users" element={<UsersList/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    
    
  );
}

export default App;
