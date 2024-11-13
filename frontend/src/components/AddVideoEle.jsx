import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getstore, putstore } from './dataProvider';

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

const AddVideoEle = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetEditState();
        setOpen(false);
    };

    const [videoUrl, setVideoUrl] = useState('');
    const [videoWidth, setVideoWidth] = useState(50);
    const [videoHeight, setVideoHeight] = useState(50);
    const [autoPlay, setAutoPlay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (props.editElementData && props.editElementData.type === 'video') {
            setVideoUrl(props.editElementData.url);
            setVideoWidth(props.editElementData.width);
            setVideoHeight(props.editElementData.height);
            setAutoPlay(props.editElementData.autoPlay);
            setIsEditing(true);
        }
    }, [props.editElementData]);

    const resetEditState = () => {
        setVideoUrl('');
        setVideoWidth(50);
        setVideoHeight(50);
        setAutoPlay(false);
        setIsEditing(false);
        props.clearEditElementData(); 
    };

    const handleSubmit = async () => {
        const data = await getstore();
        const currentPre = data.store[props.presentation.title];
        const currentSlide = currentPre.content[props.index];

        currentSlide.elements = currentSlide.elements || [];

        if (isEditing && props.editElementIndex !== null) {
            const element = currentSlide.elements[props.editElementIndex];
            element.url = videoUrl;
            element.width = videoWidth;
            element.height = videoHeight;
            element.autoPlay = autoPlay;
            await putstore(data.store);
            props.onUpdate();
            resetEditState();
        } else {
            const newElement = {
                type: 'video',
                url: videoUrl,
                width: videoWidth,
                height: videoHeight,
                autoPlay: autoPlay,
                position: { x: 0, y: 0 },
                layer: currentSlide.elements.length,
            };
            currentSlide.elements.push(newElement);
            await putstore(data.store);
            props.onUpdate();
            handleClose();   
        }

    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Add new Video Element</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6">Add or Edit Video Element</Typography>
                    <TextField label="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} fullWidth />
                    <TextField label="Width (%)" type="number" value={videoWidth} onChange={(e) => setVideoWidth(e.target.value)} fullWidth />
                    <TextField label="Height (%)" type="number" value={videoHeight} onChange={(e) => setVideoHeight(e.target.value)} fullWidth />
                    <Button variant="contained" onClick={() => setAutoPlay(!autoPlay)}>
                        {autoPlay ? 'Disable Auto-Play' : 'Enable Auto-Play'}
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>

            <Modal open={isEditing} onClose={() => resetEditState()}>
            <Box sx={style}>
                    <Typography variant="h6">Edit Video Element</Typography>
                    <TextField label="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} fullWidth />
                    <TextField label="Width (%)" type="number" value={videoWidth} onChange={(e) => setVideoWidth(e.target.value)} fullWidth />
                    <TextField label="Height (%)" type="number" value={videoHeight} onChange={(e) => setVideoHeight(e.target.value)} fullWidth />
                    <Button variant="contained" onClick={() => setAutoPlay(!autoPlay)}>
                        {autoPlay ? 'Disable Auto-Play' : 'Enable Auto-Play'}
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => resetEditState()}>Cancel</Button>
                </Box>
            </Modal>       
        </div>
    );
};

export { AddVideoEle };
