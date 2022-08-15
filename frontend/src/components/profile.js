import React from "react";
import { Alert, Card } from "react-bootstrap";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
 
  return (
    <div className="container pt-3">
      <Card>
        <Card.Body className="bg-dark text-white text-center">
            <h3>
              Profile username: <strong>{currentUser.username}</strong> 
            </h3>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <strong>Authorities:</strong>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
