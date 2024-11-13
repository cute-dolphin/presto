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
import { CreateNewSlide } from './CreateNewSlide';
import { AddTextEle } from './AddTextEle';

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
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const navigate=useNavigate();
    const {title}=useParams();
    const decodedTitle = decodeURIComponent(title);
    const [index,setIndex]=useState(0);
    const [sildscount,setSlidsCount]=useState(1);
    //get current presentation information //presentation structure{title:,content:[{text:''}]}
    const [presentation,setPresentation]=useState({});
    const [preNewTitle,setPreTitle]=useState(decodedTitle);
    //2.3.1 use to edit
    const [editElementData, setEditElementData] = useState(null);
    const [editElementIndex, setEditElementIndex] = useState(null);

    //update presentation state
    const getPresentation=async()=>{
        const data=await getstore();
        setPresentation(data.store[decodedTitle]);
    }

    //clear editElement state
    const clearEditElementData = () => {
        setEditElementData(null);
        setEditElementIndex(null);
    };

    React.useEffect(()=>{
        getPresentation();
    },[]);
    React.useEffect(() => {
        if (presentation.content) {
          setSlidsCount(presentation.content.length);
        } else {
          setSlidsCount(0);
        }
      }, [presentation]);
    
    const keydown=(e)=>{
        if(e.key==='ArrowLeft'){
            toPreviousSlid();
        }else if (e.key==='ArrowRight'){
            toNextSlid();
        }
    }    

    React.useEffect(()=>{
        window.addEventListener('keydown',keydown);
        return ()=>{
            window.removeEventListener('keydown',keydown);
        }
    },[sildscount,index]);


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

    //2.2.5  moving between
    const toPreviousSlid=()=>{
        console.log(sildscount);
        setIndex((pre)=>(pre>=1?pre-1:pre));
        console.log(presentation);
    }

    const toNextSlid=()=>{
        setIndex((next)=>(next<sildscount-1?next+1:next));
    }

    //2.2.6 deleteCurrentSlide  //1.getstore 2.find target data 3.delete target data 4.if(final slide)
    const deleteCurrentSlide=async()=>{
        const data=await getstore();
        const currentPre=data.store[presentation.title];
        //if slidecount===1, means only one slide now ,should display a model to ask whether delete all pre
        if (sildscount === 1) {
            setConfirmDeleteModalOpen(true);
            return;
        }
        currentPre.content.splice(index, 1);
        putstore(data.store);
        getPresentation();
        if (index >= currentPre.content.length) {
            setIndex(currentPre.content.length - 1);
        }
    }
    //confirm delete presentation
    const confirmDeletePresentation = async () => {
        const data = await getstore();
        delete data.store[presentation.title];
        await putstore(data.store);
        setConfirmDeleteModalOpen(false);
        navigate('/dashboard');
    };

    //2.3.1 double click, edit element
    const handleDoubleClick = (element, elementIndex) => {
        setEditElementData(element);
        setEditElementIndex(elementIndex);
    };

    //2.3.1 right click, delete element
    const handleRightClick = async (elementIndex, event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this element?");
        if (confirmDelete) {
            const data = await getstore();
            const currentPre = data.store[presentation.title];
            const currentSlide = currentPre.content[index];

            // delete element
            currentSlide.elements.splice(elementIndex, 1);
            await putstore(data.store);
            getPresentation();
        }
    };

    return (
        <>
            <div>
                <LogoutButton/>&nbsp;|&nbsp;<Button variant="outlined" onClick={()=>{navigate('/dashboard')}}>Back</Button>
                &nbsp;|&nbsp;<AlertDialog title={presentation.title}/>&nbsp;|&nbsp;
                <Button variant="outlined" onClick={handleOpen}>Edit Presentation Title</Button>&nbsp;|&nbsp;
                <CreateNewSlide presentation={presentation} onUpdate={getPresentation}/>
            </div>
            <div><h1>Title:&nbsp;&nbsp;{presentation.title}</h1></div>
            <div>{/* display SingleSlid*/}
            <div style={{ width: '100%', height: '500px', border: '2px solid black', position: 'relative' }}>
                {presentation.content && presentation.content[index]?.elements?.map((element, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${element.position.y}%`,
                            left: `${element.position.x}%`,
                            width: `${element.width}%`,
                            height: `${element.height}%`,
                            fontSize: `${element.fontSize}em`,
                            color: element.color,
                            fontFamily: element.fontFamily,
                            border: '1px solid grey',
                        }}
                        //2.3.1 add double click(edit) and right click(delete) function
                        onDoubleClick={() => handleDoubleClick(element, i)}
                        onContextMenu={(e) => handleRightClick(i, e)}
                    >
                        {element.type === 'text' && element.text}
                    </div>
                ))}
            </div>

                <div>{/*store two button, previous and next*/}
                    {sildscount>1&&(index>0)&&<Button variant="outlined" onClick={()=>toPreviousSlid()}>Previous</Button>} 
                    {sildscount>1&&(index+1<sildscount)&&<Button variant="outlined" onClick={()=>toNextSlid()}>Next</Button>}
                </div>
                <div>{/*2.2.6 store a button to delete current slide, write a component--deleteCurrentSlide*/ }
                    <Button variant="outlined" onClick={()=>deleteCurrentSlide()}>Delete Current slide</Button>
                </div>
                
                <div>page: {index+1}</div>

                <div>
                    <AddTextEle 
                        presentation={presentation} 
                        index={index} 
                        onUpdate={getPresentation}
                        editElementData={editElementData}
                        editElementIndex={editElementIndex}
                        clearEditElementData={clearEditElementData}
                    />
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
            
            <Modal
                open={confirmDeleteModalOpen}
                onClose={() => setConfirmDeleteModalOpen(false)}
                aria-labelledby="confirm-delete-modal-title"
                aria-describedby="confirm-delete-modal-description"
            >
                <Box sx={style}>
                    <Typography id="confirm-delete-modal-title" variant="h6" component="h2">
                        Confirm Deletion
                    </Typography>
                    <Typography id="confirm-delete-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete the entire presentation?
                    </Typography>
                    <Button variant="contained" color="error" onClick={confirmDeletePresentation}>Yes, Delete</Button>
                    <Button onClick={() => setConfirmDeleteModalOpen(false)}>Cancel</Button>
                </Box>
            </Modal>
        </>
        
        
    )
}
export {SingleSlid};