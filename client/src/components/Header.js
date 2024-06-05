import React, { useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authAction } from '../redux/store'
const Header = () => {
    // global state
    const isLogin = useSelector((state) => state.isLogin)
    // normal state
    const [value, setValue] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //logout
    const handleLogout = () => {
        try {
            dispatch(authAction.logut())
            alert("Logout Successfully!")
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>
                        ZHS Blog App
                    </Typography>

                    {
                        isLogin && (
                            <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
                                <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                                    <Tab label='Blogs' LinkComponent={Link} to="/blogs" />
                                    <Tab label='My Blogs' LinkComponent={Link} to="/my-blogs" />
                                    <Tab label='Create Blog' LinkComponent={Link} to="/create-blog" />
                                </Tabs>
                            </Box>
                        )
                    }

                    <Box display={'flex'} marginLeft={'auto'}>
                        {
                            !isLogin && (
                                <>
                                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/login'>Login</Button>
                                    <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to='/register'>Register</Button>
                                </>
                            )
                        }
                        
                        {
                            isLogin && (
                                <Button sx={{ margin: 1, color: 'white' }} onClick={handleLogout} >Logout</Button>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header