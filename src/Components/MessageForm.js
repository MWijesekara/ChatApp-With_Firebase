 import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

function Message_form( {handleSubmit , text, setText}) {
  const [isOpen,setOpen] = useState(false);
  const [age,SetRetype] = useState("");

  function handleChange(Req){
    SetRetype(Req);
  }

  return (
    <div className='message_form'>
        <div>
            <input type="text" placeholder='Enter Message' value={text} onChange={e =>setText(e.target.value)}/>
        </div>
        <div>
            <button className='btn' onClick={handleSubmit}>Send</button>
            <button className='btn' style={{background:'red'}} onClick={() => setOpen(true)}>Request</button>
            <Dialog open={isOpen} onClose={()=>setOpen(false)} >
            <DialogTitle>Requirement Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Add details about your requirement change
          </DialogContentText>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={(e)=>handleChange(e.target.value)}
          >
            <MenuItem value={"SpeedUp"}>SpeedUp</MenuItem>
            <MenuItem value={"Req_change"}>Requirement Change</MenuItem>
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
          </FormControl>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>setOpen(false)}>Submit</Button>
        </DialogActions>

            </Dialog>
      
    </div>
        </div>
            
    

  )
}

export default Message_form


