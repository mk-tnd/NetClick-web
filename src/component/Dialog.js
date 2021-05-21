import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMyContext } from '../context/MyContext'
import axios from '../config/axios'


export default function AlertDialog(props) {

  const { open, setOpen, getProfile } = props
  const { openDialog, setOpenDialog } = useMyContext()

  const handleClose = async (event) => {

    const { outerText } = event.target
    if (outerText === 'AGREE') {
      console.log(open)
      await axios.put(`/profile/editProfile/` + open?.id, { profileStatus: 'Deleted' })
      getProfile()
      setOpen(false)
    } else if (outerText === 'DISAGREE') {
      setOpenDialog(false)
    }
  }

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-white bg-gray-900 ' >{"Delete this profile?"}</DialogTitle>
        <DialogActions className=' bg-gray-900 ' >
          <Button id="Agree " onClick={handleClose} color="secondary">
            Agree
          </Button>
          <Button id="DisAgree" onClick={handleClose} color="secondary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}