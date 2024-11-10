import { useState } from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

//RegisterForm components
const RegisterForm=()=>{
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const [Name,setName]=useState('');
    const [ConfirmPassword,setConfirmPassword]=useState('');
    const navigate=useNavigate();
    console.log(Email);
    console.log(Password);

    //callback function of regist
    const register=async(email,password,name)=>{
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
        <form>
            <div>
                <TextField id="outlined-basic" label="Email:" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Name:" variant="outlined" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Password:" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Confirm password:" variant="outlined" onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div>
                <Button variant="outlined" onClick={()=>register(Email,Password,Name)}>Submit</Button>
            </div>
        </form>
    )
}

export {RegisterForm};