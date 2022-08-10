import React from 'react'
import { Alert } from 'react-bootstrap';

export default function Welcome() {
    const border = {
        border:"none"
    }
  return (
    <Alert style={border} className='bg-dark text-white'>
        <h1>Welcome to Teach Aid</h1>
        <p>Let us help you manage your students!</p>
    </Alert>
  )
}
