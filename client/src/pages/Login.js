import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/store'

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handlechange = (e) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [e.target.name]: e.target.value
    }))
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    // console.log(inputs)
    try {
      const { data } = await axios.post('/api/v1/user/login',
        {
          email: inputs.email,
          password: inputs.password
        })

      if (data.success) {
        localStorage.setItem('USERID', data?.user._id)
        dispatch(authAction.login())
        alert("User Login successfully!")
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <Box
          maxWidth={450}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={5}
          boxShadow={'0px 15px 20px #ccc'}
          padding={3}
          borderRadius={6}
        >
          <Typography variant='h3' padding={3} textAlign={'center'}>Login</Typography>
          <TextField onChange={handlechange} value={inputs.email} placeholder='email' name='email' margin='normal' type={'email'} required />
          <TextField onChange={handlechange} value={inputs.password} placeholder='password' name='password' margin='normal' type={'password'} required />
          <Button type='submit' color='primary' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>Submit</Button>
          <Button onClick={() => navigate('/register')} color='primary' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }}>Don't have a account? Please register</Button>
        </Box>
      </form>
    </>
  )
}

export default Login