import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getstore,putstore } from './dataProvider';

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

const AddTextEle=(props)=>{
    //model control
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //store the input params
    const [newText, setNewText] = useState('');
    const [textWidth, setTextWidth] = useState(50);
    const [textHeight, setTextHeight] = useState(10);
    const [fontSize, setFontSize] = useState(1);
    const [textColor, setTextColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial');

    //submit callback function
    const handleSubmit = async () => {
        const data = await getstore();
        const currentPre = data.store[props.presentation.title];
        const currentSlide = currentPre.content[props.index];

        // initial elements array
        currentSlide.elements = currentSlide.elements || [];

        // create new text element
        const newElement = {
            type: 'text',
            text: newText,
            width: textWidth,
            height: textHeight,
            fontSize,
            color: textColor,
            fontFamily,
            position: { x: 0, y: 0 },
            layer: currentSlide.elements.length
        };

        // add new elements into element array
        currentSlide.elements.push(newElement);

        // put data
        await putstore(data.store);
        props.onUpdate();
        handleClose();

        // 重置输入框
        setNewText('');
        setTextWidth(50);
        setTextHeight(10);
        setFontSize(1);
        setTextColor('#000000');
        setFontFamily('Arial');
    };
    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Add new text Element</Button> 
            <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6">Add new Text Element</Typography>
                <TextField label="Text" value={newText} onChange={(e) => setNewText(e.target.value)} fullWidth />
                <TextField label="Width (%)" type="number" value={textWidth} onChange={(e) => setTextWidth(e.target.value)} fullWidth />
                <TextField label="Height (%)" type="number" value={textHeight} onChange={(e) => setTextHeight(e.target.value)} fullWidth />
                <TextField label="Font Size (em)" type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} fullWidth />
                <TextField label="Text Color (HEX)" value={textColor} onChange={(e) => setTextColor(e.target.value)} fullWidth />
                <Select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} fullWidth>
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                    <MenuItem value="Courier New">Courier New</MenuItem>
                </Select>
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </Box>
        </Modal>
        </div>
    )
}

export {AddTextEle};