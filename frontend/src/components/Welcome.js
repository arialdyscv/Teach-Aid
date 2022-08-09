import React from 'react'
import { Alert } from 'react-bootstrap';

export default function Welcome() {
    const border = {
        border:"none"
    }
  return (
    <Alert style={border} className='bg-dark text-white'>
        <h1>Welcome to Book Worm</h1>
        <p>Let your culturize journey begin</p>
    </Alert>
  )
}
