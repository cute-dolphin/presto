import * as React from 'react';
import { useState } from 'react';
import {BrowserRouter, Route, Routes, useNavigate, useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getstore,putstore } from './dataProvider';
import MediaCard from './MediaCard';
import AlertDialog from './DeletePreDialog';
//2.2.5 create new slide model

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



const CreateNewSlide=(props)=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    //callback function of create new slide  1.getstore 2.
    const createNewSlide=async()=>{
        const data=await getstore();
        //find the target presentation,current structure is pre:{title:,content:[{text:''}]}
        const currentPre=data.store[props.presentation.title];
        //insert content
        currentPre.content.push({ elements: [] });
        putstore(data.store)
        props.onUpdate();
        handleClose();
    }
    return (
        <>
           <Button variant="outlined" onClick={handleOpen}>Create New Slide</Button> 
           <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Please input the content of new slide:
                    </Typography>
                    <Button onClick={()=>createNewSlide()}>Submit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>
        </>
    )
}

export {CreateNewSlide};