import { Box, Button, InputLabel, TextField, Typography,  } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const CreateBlog = () => {
    const id = localStorage.getItem("USERID")

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    })

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(inputs)
        try {
            const {data} = await axios.post('/api/v1/blog/create-blog', {
                title: inputs.title,
                description : inputs.description,
                image : inputs.image,
                user : id
            })
            if(data?.success){
                alert("Blog Created")
                navigate('/my-blogs')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={'50%'} border={3} borderRadius={10} padding={3} margin={'auto'} boxShadow={'10px 10px 20px #ccc'} marginTop={'20px'} display={'flex'} flexDirection={'column'}>
                    <Typography variant='h3' textAlign={'center'} fontWeight={'bold'} padding={3} color={'grey'}>
                        Create Blog
                    </Typography>
                    <InputLabel sx={{ mb: 2, mt: 2, fontSize: "24px", fontWeight: "bold" }} >
                        Title
                    </InputLabel>
                    <TextField value={inputs.title} onChange={handleChange} name='title' margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 2, mt: 2, fontSize: "24px", fontWeight: "bold" }} >
                        Description
                    </InputLabel>
                    <TextField value={inputs.description} onChange={handleChange} name='description' margin='normal' variant='outlined' required />
                    <InputLabel sx={{ mb: 2, mt: 2, fontSize: "24px", fontWeight: "bold" }} >
                        Image
                    </InputLabel>
                    <TextField value={inputs.image} onChange={handleChange} name='image' margin='normal' variant='outlined' required />
                    <Button type='submit' color='primary' variant='contained'  >Submit</Button>
                </Box>
            </form>
        </>
    )
}

export default CreateBlog