import * as React from 'react';
import { useState } from 'react';
import {BrowserRouter, Route, Routes, useNavigate, useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LogoutButton } from './LogoutButton';
import { getstore,putstore } from './dataProvider';
import MediaCard from './MediaCard';
import AlertDialog from './DeletePreDialog';

const SingleSlid=()=>{
    const navigate=useNavigate();
    const {title}=useParams();
    const decodedTitle = decodeURIComponent(title);
    //get current presentation information //presentation structure{title:/content:{}}
    const [presentation,setPresentation]=useState({});
    const getPresentation=async()=>{
        //1. get current pre
        const data=await getstore();
        setPresentation(data.store[decodedTitle]);
    }

    React.useEffect(()=>{
        getPresentation
    },[presentation]);

    //in single Slid page, show have
    //1.logout button
    //2.back btn / title /delete//edit(wait)
    //3.current page
    //4.next page btn / previous btn
    return (
        <>
            <div>
                <LogoutButton/>&nbsp;|&nbsp;<Button variant="outlined" onClick={()=>{navigate('/dashboard')}}>Back</Button>
                &nbsp;|&nbsp;<AlertDialog title={decodedTitle}/>&nbsp;|&nbsp;
                <Button variant="outlined">Edit Title</Button>&nbsp;|&nbsp;
                <Button variant="outlined">Edit thumbnail</Button>
            </div>
            <div><h1>Title:&nbsp;&nbsp;{decodedTitle}</h1></div>
            <div>{/* display SingleSlid*/}
                <div>

                </div>
                <div>{/*store two button, previous and next*/}
                    <Button variant="outlined">Previous</Button>&nbsp;|&nbsp;<Button variant="outlined">Next</Button>
                </div>
                <div>
                    show current page
                </div>
            </div>


        </>
        
        
    )
}
export {SingleSlid};