import React, { useState, useEffect } from 'react'
import axios from '../config/axios'
import service from '../service/localStorage'
import EditIcon from '@material-ui/icons/Edit';
import Fade from '@material-ui/core/Fade';
import ProfileModal from '../component/ProfileModal'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

function ProfilePage() {
  const [open, setOpen] = useState({
    status: false,
    mode: '',
    id: ''
  });
  const [profile, setProfile] = useState()
  const [edit, setEdit] = useState(false)
  const { setToken, setUser } = service
  async function getProfile() {
    const respond = await axios.get(`/profile`)
    const { data: { data } } = respond
    setProfile(data)
  }

  useEffect(async () => {
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJwYWxtQGVtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjIxMjY3MDE5LCJleHAiOjE2MjM4NTkwMTl9.m-RIpl8PDQHywp8yTYldGEFTCv50KoguG5_2e48KpDI')
    setUser(2)
    getProfile()

  }, [])

  const handleOpen = (event) => {

    const { title, id, } = event.target


    setOpen({ status: true, mode: title, id })

  };
  return (
    <div>
      <div className="App">
        <div className="text-red-500 h-1/10 text-3xl pt-6 pl-8 font-medium italic " >
          <h1>NETCLICK</h1>
        </div>
        <div>
          {
            edit ? (
              <Fade in={edit}>
                <div>
                  <h3 className='text-white text-7xl 2xl:pt-28 xl:pt-7 text-center'>Manage Profile :</h3>
                </div>
              </Fade>
            ) : (

              <div>
                <h3 className='text-white text-7xl 2xl:pt-28 xl:pt-7 text-center'> Who's watching?</h3>
              </div>

            )
          }

        </div>
        <div className='flex justify-center space-x-10 pt-10'>

          {
            profile?.map((item) => {

              return (
                <div>
                  {
                    edit ? (
                      <Fade in={edit}>
                        <div>
                          {
                            edit && (
                              <>
                                <div onClick={(e) => handleOpen(e)} id={item.id} title="Edit Profile" style={{ width: '200px', height: '200px', position: 'absolute', zIndex: '1', color: 'white' }} className={`bg-gray-800 opacity-60 flex justify-center items-center`}>
                                  <div>
                                    <button onClick={(e) => handleOpen(e)} title="Edit Profile" id={item.id} className="border-white border-2  hover:text-black-500 hover:border-2 hover:border-black focus:outline-none">Edit</button>
                                  </div>
                                </div>

                              </>)
                          }
                          <img style={{ width: '200px', height: '200px', position: 'relative', }} src={item.profilePicture || "https://www.metalbridges.com/wp-content/uploads/2017/01/netflixcover.jpg"} />

                        </div>
                      </Fade>
                    ) : (
                      <div>
                        <img style={{ width: '200px', height: '200px' }} src={item.profilePicture || "https://www.metalbridges.com/wp-content/uploads/2017/01/netflixcover.jpg"} />
                      </div>
                    )
                  }
                  {
                    edit ? (
                      <Fade in={edit}>
                        <h2 class='text-center mt-1 text-gray-400'>{item.profileName}</h2>
                      </Fade>
                    ) : (
                      <div>
                        <h2 class='text-center mt-1 text-gray-400'>{item.profileName}</h2>
                      </div>
                    )
                  }
                  <div>
                    <ProfileModal profile={profile} getProfile={getProfile} item={item} open={open} setOpen={setOpen} />
                  </div>
                </div>
              )
            })

          }
          {
            profile?.length < 4 && (

              <div>
                <div title='Add Profile' style={{ width: '200px', height: '200px' }} className='flex justify-center items-center' >
                  <div>
                    <button title='Add Profile' onClick={(e) => handleOpen(e)} style={{ width: '200px', height: '200px' }} className='hover:bg-white text-7xl'>+</button>
                  </div>
                </div>
                <div>
                  <h2 class='text-center mt-1 text-gray-400'>Add Profile</h2>
                </div>
              </div>

            )
          }
        </div>
        {
          edit ? (
            <Fade in={edit}>
              <div className='text-center pt-10'>
                <button onClick={() => setEdit(false)} class='bg-white text-black text-2xl p-4  hover:bg-red-600 hover:text-white'>Done</button>
              </div>
            </Fade>
          ) : (
            <div className='text-center pt-10'>
              <button onClick={() => setEdit(true)} class='text-gray-400 border-gray-400 text-2xl p-4 border-solid border-2 hover:border-solid hover:border-2 hover:border-white hover:text-white'>MANAGE PROFILES</button>
            </div>
          )
        }
      </div>

    </div >
  )
}

export default ProfilePage

















