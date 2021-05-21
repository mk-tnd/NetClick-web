import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from '../config/axios'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SingleVideoModal() {

  const [video, setVideo] = useState()
  async function getSingleVideo() {
    const res = await axios.get('/video/single/1')
    const { data: { data } } = res
    setVideo(data)
  }

  useEffect(() => {
    getSingleVideo()
  }, [])
  const [open, setOpen] = useState(true)


  const handleClose = () => {
    setOpen(false);
  };


  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className='text-white'>
            <div className='mb-5 '>
              <h2 id="transition-modal-title" className='text-center text-2xl'>{video?.name}</h2>
            </div>
            <div style={{
              width: '100%', height: '100%', objectFit: "cover",
              objectPosition: "50% 50%"
            }}>
              <iframe width="560" height="315" src={video?.vname + '?control=0&autoplay=1&muted=1'} allowFullScreen />
            </div>
            <div className=' ml-5 mr-5 mb-5 mt-5 '>
              <h2>Category : {video?.Category.name}</h2>
              {
                video?.description && (
                  <h2>Description : {video?.description}</h2>
                )
              }
            </div>
          </div>
        </Fade>
      </Modal >
    </div >
  )
}

export default SingleVideoModal