import React, {useState, useEffect} from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
const Blogs = () => {
  const [Blogs, setBlogs ] = useState([])

  //get all blogs
  const GetAllBlogs = async () => {
    try {
      const {data} = await axios.get('/api/v1/blog/all-blog')
      if(data.success){
        setBlogs(data?.blogs)
      }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    GetAllBlogs()
  },[])
  return (
    <div>
      {Blogs && Blogs.map((blog, index) => <BlogCard
      key={index}
      id={blog._id}
      isUser = {localStorage.getItem("USERID") === blog.user._id}
      title={blog.title}
      description = {blog.description}
      image = {blog.image}
      username = {blog.user.username}
      time = {blog.createdAt}
      /> )}
      
    </div>
  )
}

export default Blogs