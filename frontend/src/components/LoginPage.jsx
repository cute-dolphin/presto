import { useState } from 'react';
import {
    BrowserRouter,
    Route,Routes,
  } from "react-router-dom";
  import Box from '@mui/material/Box';
  import TextField from '@mui/material/TextField';
  import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const LoginPage=()=>{
    return (
        <>
            <div>
                <TextField id="outlined-basic" label="Email:" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Password:" variant="outlined" />
            </div>
            <div>
                <Button variant="outlined">Submit</Button>
            </div>
        </>
    )
}

export {LoginPage};