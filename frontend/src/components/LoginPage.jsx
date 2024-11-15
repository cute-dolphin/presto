import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// LoginPage component
const LoginPage = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // login callback function
  const login = async (email, password) => {
    const url = 'http://localhost:5005/admin/auth/login';
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const data = await response.json();

      // receive data,navigate
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log(data.token);
        navigate('/dashboard');
      } else {
        // use alert to send error message
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      // catch error
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <form aria-labelledby="login-form">
      <h2 id="login-form">Login</h2>

      {/* error message when input invalid */}
      {errorMessage && <Alert severity="error" role="alert">{errorMessage}</Alert>}

      <div>
        <TextField
          id="email"
          label="Email:"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Password:"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={() => login(Email, Password)}
          aria-label="Submit login form"
        >
                    Submit
        </Button>
      </div>
    </form>
  );
};

export { LoginPage };
