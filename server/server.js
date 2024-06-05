// main file of server
const express = require('express')
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require('dotenv')
const connectDB = require('./Config/db')

// dotenv config
dotenv.config()

// router import
const userRoutes = require('./routes/userRoutes')
const blogRoutes= require('./routes/blogRoutes')

// Mongodb Connection
connectDB()

// object
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan())

// routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/blog', blogRoutes)

PORT = process.env.PORT || 8080


//listen
app.listen(PORT, ()=>{
    console.log( `Server is running ${process.env.DEV__MODE}  on  port` , PORT)
})