import * as React from 'react';
import { useState,useEffect } from 'react';
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
import { AddImageEle } from './AddImageEle';
import { AddVideoEle } from './AddVideoEle';
import { ThemePicker } from './ThemePicker';

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
  //2.3.2 use to store content type to display
  const [editType, setEditType] = useState(null);
  //2.4.2 store background
  const [background, setBackground] = useState('#ffffff');
  //update presentation state
  const getPresentation=async()=>{
    const data=await getstore();
    setPresentation(data.store[decodedTitle]);
  }
  //clear editElement state
  const clearEditElementData = () => {
    setEditElementData(null);
    setEditElementIndex(null);
    setEditType(null);
  };
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
  //2.2.5  moving between
  const toPreviousSlid=()=>{
    console.log(sildscount);
    setIndex((pre)=>(pre>=1?pre-1:pre));
    console.log(presentation);
    console.log(index);
  }
  const toNextSlid=()=>{
    setIndex((next)=>(next<sildscount-1?next+1:next));
  }
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
    setEditType(element.type);
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
  //2.4.2 background update
  const themeUpdate=()=>{
    if(presentation.theme.backgroundType==='color'){
      setBackground(presentation.theme.color);
    }else if (presentation.theme.backgroundType=== 'gradient') {
      setBackground(presentation.theme.gradient);
    } else if (presentation.theme.backgroundType === 'image') {
      const imageFormat=`url(${presentation.theme.imageUrl}) no-repeat center center / cover`;
      setBackground(imageFormat);
    }else if(!presentation.theme){
      setBackground('#ffffff');
    }
  }
  React.useEffect(() => {
    if (presentation.theme) {
      themeUpdate();
    }
  }, [presentation]);
    //2.4.4 url update
    
    useEffect(() => {
        const slideIndexFromUrl = new URLSearchParams(location.search).get('slide');
        if (slideIndexFromUrl) {
            setIndex(parseInt(slideIndexFromUrl, 10));
        }
        getPresentation();
    }, []);

    useEffect(() => {
        if (presentation.content && presentation.content.length > 1) {
            navigate(`${location.pathname}?slide=${index + 1}`, { replace: true });
        }
    }, [index, presentation]);
    

    //2.4.3 React-based preview function
    const Preview = ({ presentation, background, index, setIndex }) => {
        return (
            <div style={{ width: '100vw', height: '100vh', background: background, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000 }}>
                    <Button variant="outlined" onClick={handlePreviewClose}>Close Preview</Button>
                </div>
                <div style={{ width: '100%', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
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
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {element.type === 'text' && element.text}
                            {element.type === 'image' && (
                                <img
                                    src={element.url}
                                    alt={element.alt}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            )}
                            {element.type === 'video' && (
                                <iframe
                                    src={`${element.url}${element.autoPlay ? '?autoplay=1' : ''}`}
                                    width="100%"
                                    height="100%"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="Video Element"
                                ></iframe>
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', zIndex: 1000 }}>
                    {index > 0 && <Button variant="outlined" onClick={() => setIndex(prev => prev - 1)}>Previous</Button>}
                    <Typography variant="h6" component="div" style={{ margin: '0 20px' }}>Slide {index + 1} of {sildscount}</Typography>
                    {index < sildscount - 1 && <Button variant="outlined" onClick={() => setIndex(prev => prev + 1)}>Next</Button>}
                </div>
            </div>
        );
    }

    //2.4.3 Open the preview in the same React app
    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePreviewOpen = () => {
        setPreviewOpen(true);
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);
    };

    return (
        <>
            {previewOpen ? (
                <Preview presentation={presentation} background={background} index={index} setIndex={setIndex} />
            ) : (
                <div>{/* presentation level control button*/}
                    <LogoutButton/>&nbsp;|&nbsp;<Button variant="outlined" onClick={()=>{navigate('/dashboard')}}>Back</Button>
                    &nbsp;|&nbsp;<AlertDialog title={presentation.title}/>&nbsp;|&nbsp;
                    <Button variant="outlined" onClick={handleOpen}>Edit Presentation Title</Button>&nbsp;|&nbsp;
                    <CreateNewSlide presentation={presentation} onUpdate={getPresentation}/>&nbsp;|&nbsp;
                    <Button variant="outlined" onClick={handlePreviewOpen}>Preview Presentation</Button>
                </div>
            )}

            <div>{/* theme picker*/}
                <ThemePicker presentation={presentation} onUpdate={getPresentation} themeUpdate={themeUpdate}/>
            </div>

            <div><h1>Title:&nbsp;&nbsp;{presentation.title}</h1></div>

            <div>{/* display SingleSlid*/}
            <div style={{ width: '100%', height: '500px', border: '2px solid black', position: 'relative', background:background}}>
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
                            overflow: 'hidden',
                            textOverflow: 'ellipsis', 
                            whiteSpace: 'nowrap', 
                        }}
                        //2.3.1 add double click(edit) and right click(delete) function
                        onDoubleClick={() => handleDoubleClick(element, i)}
                        onContextMenu={(e) => handleRightClick(i, e)}
                    >


                        {element.type === 'text' && element.text}{/* display text */}

                        {/* display image */}
                        {element.type === 'image' && (
                            <img
                                src={element.url}
                                alt={element.alt}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        )}

                        {/* display vedio */}
                        {element.type === 'video' && (
                            <div style={{ width: '100%', height: '100%', border: '1px solid grey' }}>
                                <iframe
                                    src={`${element.url}${element.autoPlay ? '?autoplay=1' : ''}`}
                                    width="100%"
                                    height="100%"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="Video Element"
                                ></iframe>
                            </div>
                        )}
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

                <div>{/*add element*/}
                    <AddTextEle 
                        presentation={presentation} 
                        index={index} 
                        onUpdate={getPresentation}
                        editElementData={editElementData}
                        editElementIndex={editElementIndex}
                        clearEditElementData={clearEditElementData}
                    />

          <AddImageEle
            presentation={presentation}
            index={index}
            onUpdate={getPresentation}
            editElementData={editElementData}
            editElementIndex={editElementIndex}
            clearEditElementData={clearEditElementData}
          />

          <AddVideoEle
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
          <TextField id="edit-presentation-title" label="Title:" variant="outlined" onChange={(e)=>setPreTitle(e.target.value)} value={preNewTitle}/>
          <Button id='edit-presentation-title-submit' onClick={()=>editPreTitle(preNewTitle)}>Submit</Button>
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
