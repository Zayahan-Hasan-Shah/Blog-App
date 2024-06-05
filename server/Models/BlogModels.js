const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true, 'Title is require']
    },
    description:{
        type:String,
        require:[true, "Description of title is require"]
    },
    image : {
        type:String,
        require:[true, "Image related to title and description is require"]
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref : 'User',
        require : [true, "User id is require"]
    }

},{timestamps:true})

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel