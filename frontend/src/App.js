import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavigationBar from './components/NavBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Student from './components/Student';
import StudentList from './components/StudentList';
import UsersList from './components/User/UsersList';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Container, Row, Col } from 'react-bootstrap';





function App() {

  const marginTop = {marginTop:"20px"}

  return (
    <Router>
      <NavigationBar/>
      <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Routes>
                <Route exact path="/" element={<Welcome/>}/>
                <Route exact path="/student" element={<Student/>}/>
                <Route exact path="/student/:id" element={<Student/>}/>
                <Route exact path="/list" element={<StudentList/>}/>
                <Route exact path="/users" element={<UsersList/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/login" element={<Login/>}/>
              </Routes>
            </Col>
          </Row>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
