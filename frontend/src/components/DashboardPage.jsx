import { useState } from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { LogoutButton } from './LogoutButton';
const DashboardPage=()=>{
    return (
        <div>
            <div>here is dashboard</div>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export {DashboardPage}