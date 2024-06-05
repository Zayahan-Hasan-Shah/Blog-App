const express = require('express')
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, SingleBlogUserController } = require('../controller/blogController')



//router object
const router = express.Router()

// routes

// get all blog || method : get
router.get('/all-blog', getAllBlogsController)

// create blog || method : Post
router.post('/create-blog', createBlogController)

// update blog || method : put
router.put('/update-blog/:id', updateBlogController)

// get single blog || method : get
router.get('/get-blog/:id', getBlogByIdController)

// delete blog || method : delete
router.delete('/delete-blog/:id', deleteBlogController)

// get single user blog || method : get
router.get('/user-blog/:id', SingleBlogUserController)

module.exports = router