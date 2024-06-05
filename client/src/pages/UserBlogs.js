import React, { useState, useEffect } from 'react'
import axios from "axios"
import BlogCard from '../components/BlogCard'
const UserBlogs = () => {
    const [userblogs, setUserBlogs] = useState()

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('USERID')
            console.log(id)
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`)
            console.log(data)
            if (data?.success) {
                setUserBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserBlogs()
    }, [])
    return (
        <div>{userblogs && userblogs.length > 0 ? (
            userblogs.map((blog, index) => 
            <BlogCard
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
        />)
        ) : (<h1>You haven't created any blog yet!</h1>)}
        </div>
    )
}

export default UserBlogs