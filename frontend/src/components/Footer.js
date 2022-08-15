import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Container, Col } from 'react-bootstrap';

export default function Footer() {
    let fullYear = new Date().getFullYear();
  
  return (
    
    <Navbar bg="dark" variant="dark">
        <Container>
            <Col lg={12} className='text-center text-muted'>
                <Navbar.Text >{fullYear}, All Rights Reserved</Navbar.Text>
            </Col>
        </Container>
    </Navbar>
    
  )
}
