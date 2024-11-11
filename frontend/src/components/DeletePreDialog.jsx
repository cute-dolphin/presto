import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getstore,putstore } from './dataProvider';
import { useNavigate } from 'react-router-dom';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePre=async()=>{
    const currentPre=await getstore();
    console.log(currentPre);
    console.log(props.title);
    delete currentPre.store[props.title];
    putstore(currentPre.store);
    handleClose();
    navigate('/dashboard')
  }
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete current Presentation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete current Presentation?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deletePre} >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
