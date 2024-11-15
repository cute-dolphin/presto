import * as React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div role="main" aria-label="Landing Page">
        <h1>Welcome to the Presentation App</h1>
        <nav aria-label="Main navigation">
          <Link to='/login' aria-label="Go to Login Page">Login</Link>
          <span aria-hidden="true">||</span>
          <Link to='/register' id='landing-register' aria-label="Go to Register Page">Register</Link>
        </nav>
      </div>
    </>
  );
};

export { LandingPage };
