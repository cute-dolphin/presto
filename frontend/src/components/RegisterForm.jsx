import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

//RegisterForm components
const RegisterForm=()=>{
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      register(Email, Password, Name);
    }
  };

  //callback function of regist
  const register=async(email,password,name)=>{
    if (ConfirmPassword !== Password) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if(ConfirmPassword!==Password){
      window.alert('confirm password not same with password');
    }else{
      const url='http://localhost:5005/admin/auth/register';
      const response = await fetch(url, {
        method:"POST",
        body:JSON.stringify({
          email,
          password,
          name,
        }),
        headers:{
          "Content-type":"application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      if(data.token){
        localStorage.setItem('token',data.token);
        console.log(data.token);
        navigate('/dashboard')
      }else{
        window.alert('Inviald Input');
      }
    }
  }

  return (
    <form aria-labelledby="register-form" onKeyDown={handleKeyPress}>
      <h2 id="register-form">Register</h2>
      {errorMessage && <Alert severity="error" role="alert">{errorMessage}</Alert>}
      <TextField id="registerEmail" label="Email" aria-label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField id="registerName" label="Name" aria-label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField id="registerPassword" label="Password" aria-label="Password" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} fullWidth />
      <TextField id="registerConfirm" label="Confirm Password" aria-label="Confirm Password" type="password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} fullWidth />
      <Button variant="outlined" onClick={() => register(Email, Password, Name)} aria-label="Submit registration form">Submit</Button>
    </form>
  );
}

export {RegisterForm};