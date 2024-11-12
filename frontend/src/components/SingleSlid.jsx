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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const SingleSlid=()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate=useNavigate();
    const {title}=useParams();
    const decodedTitle = decodeURIComponent(title);
    
    //get current presentation information //presentation structure{title:/content:{}}
    const [presentation,setPresentation]=useState({});
    const [preNewTitle,setPreTitle]=useState(decodedTitle);
    const getPresentation=async()=>{
        //1. get current pre
        const data=await getstore();
        setPresentation(data.store[decodedTitle]);
    }

    React.useEffect(()=>{
        getPresentation();
    },[]);

    //2.2.4 edit pre title callback 1.get current title--presentation.title 2.getstore/data.store[presentation.title]
    const editPreTitle=async(newTitle)=>{
        if (!newTitle.trim()) {
            alert("Title cannot be empty.");
            return;
        }
        const currentData = await getstore();
        const currentPre = currentData.store[presentation.title];
        delete currentData.store[presentation.title];
        currentPre.title = newTitle;
        currentData.store[newTitle] = currentPre;
        await putstore(currentData.store);
        setPresentation(currentPre);
        setPreTitle(newTitle);
        handleClose();
        navigate(`/presentation/${newTitle}`);

    }
    //in single Slid page, show have
    //1.logout button
    //2.back btn / title /delete//edit(wait)
    //3.current page
    //4.next page btn / previous btn
    return (
        <>
            <div>
                <LogoutButton/>&nbsp;|&nbsp;<Button variant="outlined" onClick={()=>{navigate('/dashboard')}}>Back</Button>
                &nbsp;|&nbsp;<AlertDialog title={presentation.title}/>&nbsp;|&nbsp;
                <Button variant="outlined" onClick={handleOpen}>Edit</Button>&nbsp;|&nbsp;
            </div>
            <div><h1>Title:&nbsp;&nbsp;{presentation.title}</h1></div>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Presentation Title:
                    </Typography>
                    <TextField id="outlined" label="Title:" variant="outlined" onChange={(e)=>setPreTitle(e.target.value)} value={preNewTitle}/>
                    <Button onClick={()=>editPreTitle(preNewTitle)}>Submit</Button>
                    <Button onClick={()=>handleClose()}>Cancl</Button>
                </Box>
            </Modal>

        </>
        
        
    )
}
export {SingleSlid};