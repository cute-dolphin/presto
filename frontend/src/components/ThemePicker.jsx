import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

const ThemePicker = () => {
    const [open, setOpen] = useState(false);
    const [backgroundType, setBackgroundType] = useState('color');
    const [color, setColor] = useState('#ffffff');
    const [gradient, setGradient] = useState('linear-gradient(to right, #ff7e5f, #feb47b)');
    const [imageUrl, setImageUrl] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        console.log('themepicker function')
        console.log(backgroundType)
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>Change Presentation Theme</Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6">Select Theme Style</Typography>
                    <Select
                        value={backgroundType}
                        onChange={(e) => setBackgroundType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="color">Solid Color</MenuItem>
                        <MenuItem value="gradient">Gradient</MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                    </Select>

                    {backgroundType === 'color' && (
                        <TextField
                            label="Color"
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            fullWidth
                        />
                    )}

                    {backgroundType === 'gradient' && (
                        <TextField
                            label="Gradient"
                            value={gradient}
                            onChange={(e) => setGradient(e.target.value)}
                            fullWidth
                        />
                    )}

                    {backgroundType === 'image' && (
                        <TextField
                            label="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            fullWidth
                        />
                    )}

                    <Button onClick={handleClose}>Submit</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Box>
            </Modal>
        </div>
    )
}

export {ThemePicker}