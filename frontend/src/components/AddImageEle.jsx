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

const AddImageEle = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        resetEditState();
        setOpen(false);
    };

    const [imageUrl, setImageUrl] = useState('');
    const [imageWidth, setImageWidth] = useState(50);
    const [imageHeight, setImageHeight] = useState(50);
    const [altText, setAltText] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (props.editElementData && props.editElementData.type === 'image') {
            setImageUrl(props.editElementData.url);
            setImageWidth(props.editElementData.width);
            setImageHeight(props.editElementData.height);
            setAltText(props.editElementData.alt);
            setIsEditing(true);
        }
    }, [props.editElementData]);

    const resetEditState = () => {
        setImageUrl('');
        setImageWidth(50);
        setImageHeight(50);
        setAltText('');
        setIsEditing(false);
        props.clearEditElementData(); 
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const data = await getstore();
        const currentPre = data.store[props.presentation.title];
        const currentSlide = currentPre.content[props.index];

        currentSlide.elements = currentSlide.elements || [];

        if (isEditing && props.editElementIndex !== null) {
            const element = currentSlide.elements[props.editElementIndex];
            element.url = imageUrl;
            element.width = imageWidth;
            element.height = imageHeight;
            element.alt = altText;
            await putstore(data.store);
            props.onUpdate();
            resetEditState();
        } else {
            const newElement = {
                type: 'image',
                url: imageUrl,
                width: imageWidth,
                height: imageHeight,
                alt: altText,
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
            <Button variant="outlined" onClick={handleOpen}>Add new Image Element</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6">Add new Image Element</Typography>
                    <TextField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} fullWidth />
                    <Button component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    <TextField label="Width (%)" type="number" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} fullWidth />
                    <TextField label="Height (%)" type="number" value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} fullWidth />
                    <TextField label="Alt Text" value={altText} onChange={(e) => setAltText(e.target.value)} fullWidth />
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>

            <Modal open={isEditing} onClose={() => resetEditState()}>
                <Box sx={style}>
                <Box sx={style}>
                    <Typography variant="h6">Edit Image Element</Typography>
                    <TextField label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} fullWidth />
                    <Button component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    <TextField label="Width (%)" type="number" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} fullWidth />
                    <TextField label="Height (%)" type="number" value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} fullWidth />
                    <TextField label="Alt Text" value={altText} onChange={(e) => setAltText(e.target.value)} fullWidth />
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => resetEditState()}>Cancel</Button>
                </Box>
                </Box>
            </Modal>        
        </div>
    );
};

export { AddImageEle };
