import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // data deal with parts
    const login = async (email, password) => {
        const url = 'http://localhost:5005/admin/auth/login';
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

            // response check
            if (!response.ok) {
                if (response.status === 400) {
                    setErrorMessage('Invalid email or password. Please try again.');
                } else if (response.status === 500) {
                    setErrorMessage('Server error. Please try again later.');
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.');
                }
                return;
            }

            const data = await response.json();

            // get token
            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log(data.token);
                navigate('/dashboard');
            } else {
                setErrorMessage('Login failed. Please check your credentials and try again.');
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

            {/* error message alert */}
            {errorMessage && <Alert severity="error" role="alert">{errorMessage}</Alert>}

            <TextField
                id="email"
                label="Email"
                aria-label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                id="password"
                label="Password"
                aria-label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <Button
                variant="outlined"
                onClick={() => login(Email, Password)}
                aria-label="Submit login form"
            >
                Submit
            </Button>
        </form>
    );
};

export { LoginPage };
