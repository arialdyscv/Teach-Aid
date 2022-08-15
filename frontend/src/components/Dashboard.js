import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import UserService from '../services/user.service';

export default function Dashboard() {

    const border = {
        border:"none"
    }

    const [content, setContent] = useState("");

    useEffect(() => {
      UserService.getPublicContent().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          setContent(_content);
        }
      );
    }, []);

  return (
    <div>
      <Alert style={border} className='bg-dark text-white text-center'>
        <h1>Welcome to Teach Aid</h1>
        <p>Let us help you manage your students!</p>
        <h3>{content}</h3>
      </Alert>
    </div>
    
  )
}
