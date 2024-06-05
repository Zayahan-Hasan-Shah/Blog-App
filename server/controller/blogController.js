const mongoose = require('mongoose')
const BlogModels = require('../Models/BlogModels')
const userModels = require('../Models/UserModels')


// controllers

// get all blog controller
exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await BlogModels.find({}).populate('user')
        if (!blogs) {
            return res.status(200).send({
                success: true,
                message: "No Blogs Found!",
            })
        }
        return res.status(200).send({
            success: true,
            message: "All Blogs list Found!",
            blogsCount: blogs.length,
            blogs
        })
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error while getting all blogs",
            error
        })
    }
}

// create blog controller
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body

        // validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Kindly fullfil all the fields",
            })
        }
        const existinguser = await userModels.findById(user)

        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "unable to find user"
            })
        }
        const newBlog = new BlogModels({ title, description, image, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        existinguser.blogs.push(newBlog)
        await existinguser.save({ session })
        await session.commitTransaction()
        await newBlog.save()
        return res.status(201).send({
            success: true,
            message: "Blog created!",
            newBlog
        })
    }
    catch (error) {
        return res.status(400).send({
            success: false,
            message: "Error while vreating blog",
            error
        })
    }
}

// update blog controller
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body
        const Blog = await BlogModels.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Blog Updated!",
            Blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Blog can't be updated",
            error
        })
    }
}

// get blog by id controller
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params
        const GetSingleBlog = await BlogModels.findById(id)
        if (!GetSingleBlog) {
            return res.status(404).send({
                success: false,
                message: "No blog found of this id",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Single blog id has been found",
            GetSingleBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Cannot get the single blog",
            error
        })
    }
}

// delete blog controller
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await BlogModels.findOneAndDelete(req.params.id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully!",

        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error occur while deleting blog",
            error
        })
    }
}

// single user blog
exports.SingleBlogUserController = async (req,res) => {
    try {
        const userBlog = await userModels.findById(req.params.id).populate('blogs')
        if(!userBlog){
            return res.status(404).send({
                success : false,
                message : "No blog found with this id",
            })
        }
        return res.status(200).send({
            success : true,
            messsage : "blogs of single user",
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success : false,
            message : "Error while getting single blog of user",
            error
        })
        
    }
}