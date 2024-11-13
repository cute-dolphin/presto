import * as React from 'react';
import { useState } from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LogoutButton } from './LogoutButton';
import { getstore,putstore } from './dataProvider';
import MediaCard from './MediaCard';
const DashboardPage=()=>{
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
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title,setTitle]=useState('');
    //2.2.2 show presentation 1.use getstore get presentation 2.
    const [presentation,setPresentation]=useState({});
    const getPresentation=async()=>{
        //1. get all pre
        const data=await getstore();
        setPresentation(data.store);
    }

    React.useEffect(()=>{
        getPresentation();
    },[]);
    //2.2.1 callback function of submit command of create new pre
    const createNewPre=async(newPreTitle)=>{
        //1.get all presentation
        const data=await getstore();
        console.log(data);
        //2. check the title exist? if already exist,alert
        if (data.store[newPreTitle]) {
            console.error("Title already exists. Please use a unique title.");
            window.alert("Title already exists. Please use a unique title.");
        }
        //3.generate new pre
        data.store[newPreTitle] = {
            title: newPreTitle,
            thumbnail: '',
            content: [
                { elements: [] } // initial empty element
            ]
        };
        //3. put new store to server
        const res=await putstore(data.store);
        console.log('success send data to server');
        console.log('res:'+res);
        //4.after add new pre, show update current pre
        getPresentation();
        handleClose();
    }
    return (
        <div>
            <div>here is dashboard</div>
            <LogoutButton></LogoutButton>
            <Button onClick={handleOpen}>Create new Presentation</Button>
            <MediaCard presentation={presentation}></MediaCard>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Presentation Title:
                    </Typography>
                    <TextField id="outlined-basic" label="Title:" variant="outlined" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                    <Button onClick={()=>createNewPre(title)}>Submit</Button>
                </Box>
            </Modal>
        </div>
    )
}

export {DashboardPage}