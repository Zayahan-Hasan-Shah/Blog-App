const mongoose = require("mongoose")

const connectDB = async () => {
    try{
    await mongoose.connect(process.env.MONGO__URL)
    console.log(`Connected to Mongo Database  ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`Mongo Connection Error`)
    }
}

module.exports = connectDB