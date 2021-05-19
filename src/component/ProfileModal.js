import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Input from '@material-ui/core/Input'
import SelectorFitnessLevel from './SelectorFitnessLevel'
import axios from '../config/axios'
import service from '../service/localStorage'
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


function ProfileModal(props) {

  const { open, setOpen, getProfile, profile } = props



  const [state, setState] = useState({
    profileType: '',
  });

  const classes = useStyles();



  const handleClose = () => {
    setOpen(false);
  };

  const [input, setInput] = useState({
    profileName: ""
  })




  function handleTextChange(event) {
    const { value, id } = event.target
    setInput({ [id]: value })
  }
  function handleFile(event) {
    const { files } = event.target
    setInput({ ...input, file: files[0] })
  }

  async function submitEdit() {

    const { profileName, file, profileType } = input
    const formData = new FormData()
    let res;
    if (file) {
      formData.append('image', file)
      formData.append('profileName', profileName)
      formData.append('profileType', profileType)
      open.mode === 'Edit Profile' ? res = await axios.put(`/profile/editProfile/` + open?.id, formData) : res = await axios.post(`profile/newProfile`, formData)
      console.log(res)
    } else {
      open.mode === 'Edit Profile' ? res = await axios.put(`/profile/editProfile/` + open?.id, { profileName, profileType }) : res = await axios.post(`profile/newProfile`, { profileName, profileType })
      console.log(res)
    }
    getProfile()
    setInput({ profileName: "" })
    setState({ profileType: '' })
    setOpen(false)
  }
  function cancelEdit() {
    setOpen(false)
    setInput({ profileName: "" })
    setState({ profileType: '' })
  }

  async function deleteProfile() {
    const isConfirm = window.confirm('Do you confirm to delete this profile?')
    if (isConfirm) {
      const res = await axios.put(`/profile/editProfile/` + open?.id, { profileStatus: 'Deleted' })
      console.log(res)
      getProfile()
      setOpen(false)
    } else {
      return
    }
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open.status}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open.status}>
          <div className='bg-white text-gray-400'>
            <div className='mt-3'>
              <h2 id="transition-modal-title" className='text-center'>{open.mode}</h2>
            </div>
            <div className='flex ml-5 mr-5 mt-4 mb-5'>
              {
                profile?.filter((item) => item.id == open.id)?.map((item) => {
                  return (
                    <>
                      <div>
                        <img style={{
                          width: '90px', height: '80px',
                          objectFit: "cover",
                          objectPosition: "50% 50%"
                        }} src={item?.profilePicture || "https://www.metalbridges.com/wp-content/uploads/2017/01/netflixcover.jpg"} />

                      </div>
                      <div className='flex flex-col ml-3'>
                        <Input onChange={(e) => handleTextChange(e)} value={input.profileName} id='profileName' style={{ backgroundColor: '#666', color: 'white' }} />
                        <Input onChange={(e) => handleFile(e)} type='file' class='text-gray-400 mt-2' />
                        <div className='mt-3'>
                          <SelectorFitnessLevel state={state} setState={setState} setInput={setInput} input={input} />
                        </div>
                        <div className='mt-3'>
                          <button onClick={submitEdit} className='bg-white p-1 text-black hover:bg-red-600 hover:text-white'>Record</button>
                          <button onClick={cancelEdit} className='ml-4 mr-4 text-gray-400 border-gray-400 p-1 border-solid border-2 hover:border-solid hover:border-2 hover:border-red-600 hover:text-red-600'>Cancel</button>
                          <button onClick={deleteProfile} className='text-gray-400 border-gray-400 p-1 border-solid border-2 hover:border-solid hover:border-2 hover:border-red-600 hover:text-red-600'>Delete</button>
                        </div>
                      </div>
                    </>
                  )
                })
              }
              {
                open.mode === 'Add Profile' && (
                  <div className='flex ml-5 mr-5 mt-4 mb-5'>
                    <div >
                      <img style={{
                        width: '90px', height: '80px',
                        objectFit: "cover",
                        objectPosition: "50% 50%"
                      }} src={"https://www.metalbridges.com/wp-content/uploads/2017/01/netflixcover.jpg"} />

                    </div>
                    <div className='flex flex-col ml-3'>
                      <Input onChange={(e) => handleTextChange(e)} value={input.profileName} id='profileName' style={{ backgroundColor: '#666', color: 'white' }} />
                      <Input onChange={(e) => handleFile(e)} type='file' class='text-gray-400 mt-2' />
                      <div className='mt-3'>
                        <SelectorFitnessLevel state={state} setState={setState} setInput={setInput} input={input} />
                      </div>
                      <div className='mt-3'>
                        <button onClick={submitEdit} className='bg-white p-1 text-black hover:bg-red-600 hover:text-white'>Record</button>
                        <button onClick={cancelEdit} className='ml-4 mr-4 text-gray-400 border-gray-400 p-1 border-solid border-2 hover:border-solid hover:border-2 hover:border-red-600 hover:text-red-600'>Cancel</button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </Fade>
      </Modal >
    </div >
  )
}

export default ProfileModal
