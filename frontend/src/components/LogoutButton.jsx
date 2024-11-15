import { useState } from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const LogoutButton=()=>{
  const navigate=useNavigate();
  const LogoutCallback=async()=>{
    const token=localStorage.getItem('token');
    const url='http://localhost:5005/admin/auth/logout';
    const response = await fetch(url, {
      method:"POST",
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    localStorage.clear();
    navigate('/');
    console.log('success Logout');
  }

  return <Button variant="outlined" onClick={()=>LogoutCallback()}>Logout</Button>
}

export {LogoutButton}