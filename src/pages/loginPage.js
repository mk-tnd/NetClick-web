import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Head from '../component/Head'
import axios from '../config/axios'
import RemoveRedEyeSharpIcon from '@material-ui/icons/RemoveRedEyeSharp';
import { useMyContext } from '../context/MyContext'
function LoginPage() {

  const history = useHistory()

  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState({
    type: 'password',
    status: false
  })
  function handleTextChange(event) {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const { dispatch } = useMyContext()

  async function login() {
    const res = await axios.post('/user/login', input)
    const { data: { message, token, id } } = res
    dispatch({ type: 'getToken', token, user: id })
    setInput({ email: '', password: '' })
    history.push('/profile')
  }

  function handleShowPassword(event) {
    const { id, nearestViewportElement } = event.target
    if (showPassword.status) {
      setShowPassword({ status: false, type: 'password' })
    } else {
      if (id || nearestViewportElement) {
        setShowPassword({ status: true, type: id })
      }
    }

  }
  return (
    <div>
      <div className='App' style={{
        backgroundImage: `url(https://cdn.hipwallpaper.com/i/98/21/dUyCkp.jpg)`,
        backgroundSize: 'covered'
      }}>
        <Head />
        <div className=' flex ' style={{ width: '100%', height: '93.5vh' }}>
          <div style={{ width: '25vw' }} ></div>
          <div style={{ width: '50vw' }} className='flex justify-center items-center'>
            <div className='bg-black opacity-90 flex flex-col items-center' style={{ width: '500px', height: '500px' }}>
              <div className='self-start'>
                <h1 className='text-gray-200 text-4xl mt-10 ml-5 sm:ml-10  font-medium'>Sign In</h1>
              </div>
              <div className='flex flex-col mt-11'>
                <div>
                  <input placeholder='Email' value={input.email} onChange={(e) => handleTextChange(e)} name='email' className='rounded bg-gray-900 p-2 text-white' style={{ width: '300px', height: '30px' }}></input>
                </div>
                <div className='mt-7'>
                  <div id='text' onClick={(e) => handleShowPassword(e)} className='absolute' style={{ marginLeft: '270px', marginTop: '1px' }}>
                    <RemoveRedEyeSharpIcon id='text' className='text-white hover:text-black' />
                  </div>
                  <input type={showPassword.type} placeholder='Password' value={input.password} onChange={(e) => handleTextChange(e)} name='password' className='rounded bg-gray-900 p-2 text-white' style={{ width: '300px', height: '30px' }}></input>
                </div>
                <div className='self-center'>
                  <button onClick={login} className='text-white bg-red-500 mt-10  pt-2 pb-2 pl-5 pr-5 text-center' style={{ width: '200px' }}>Sign in</button>
                </div>
                <div className='text-center mt-4'>
                  <span className='text-gray-400'>New to Netclick ?</span> <a href='profile' className='text-white'>Sign up</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '25vw' }} ></div>
        </div>
      </div>
    </div >
  )
}

export default LoginPage


