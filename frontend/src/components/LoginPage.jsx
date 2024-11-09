import { useState } from 'react';
import {
    BrowserRouter,
    Route,Routes,
  } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//LoginPage components
const LoginPage=()=>{
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    console.log(Email);
    console.log(Password);

    //callback function of login
    const login=async(email,password)=>{
        const url='http://localhost:5005/admin/auth/login';
        const response = await fetch(url, {
            method:"POST",
        body:JSON.stringify({
            email,
            password,
        }),
        headers:{
            "Content-type":"application/json; charset=UTF-8",
        },
        });
        const data = await response.json();
        if(data.token){
            localStorage.setItem('token',data.token);
            console.log(data.token);
        }else{
            window.alert('Bad Input');
        }
    }

    return (
        <>
            <div>
                <TextField id="outlined-basic" label="Email:" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Password:" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <Button variant="outlined" onClick={()=>login(Email,Password)}>Submit</Button>
            </div>
        </>
    )
}

export {LoginPage};