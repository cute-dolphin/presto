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
            theme: {},
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
            <div id='dashboardWelcome'>here is dashboard</div>
            <LogoutButton></LogoutButton>
            <Button id='createPresentation' onClick={handleOpen}>Create new Presentation</Button>
            <MediaCard presentation={presentation}></MediaCard>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-presentation-modal-title"
                aria-describedby="create-presentation-modal-description"
            >
                <Box sx={style}>
                    <Typography id="create-presentation-modal-title" variant="h6">
                        Create New Presentation
                    </Typography>
                    <TextField
                        id="presentation-title"
                        label="Title"
                        aria-label="Presentation Title"
                        variant="outlined"
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        id="presentation-description"
                        label="Description"
                        aria-label="Presentation Description"
                        variant="outlined"
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                    <Button
                        onClick={createNewPre}
                        aria-label="Create new presentation"
                    >
                        Create
                    </Button>
                    <Button
                        onClick={handleClose}
                        aria-label="Cancel creation"
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}

export {DashboardPage}