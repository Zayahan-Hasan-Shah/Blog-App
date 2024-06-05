
const userModels = require('../Models/UserModels')
const bcrypt = require('bcrypt')

// create/register user
exports.registerController = async (req,res) => {
    try{
        const {username, email, password} = req.body
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                message : "Kindly fill all the credentials",
                success : false
            })
        }

        // existing user
        const existingUser = await userModels.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success : false,
                message : "User already exist"
            })
        }

        console.log(password)
        const hashedPAssword = await bcrypt.hash(password, 10)
        // save new user
        const user = new userModels({username, email, password : hashedPAssword})
        await user.save() 
        return res.status(201).send({
            message: "User's account has been created",
            success : true,
            user
        }) 
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message : "Error in register callback",
            success : false,
            error
        })
    }
}

// get all user
exports.getAllUser = async (req, res) => {
    try{
        const users = await userModels.find({})
        return res.status(500).send({
            userCount : users.length,
            success : true,
            message : "All user data",
            users
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success : false,
            message : "Error in get all users",
            error
        })
    }
}


// login user
exports.loginController = async (req, res)=> {
    try{
        const {email, password} = req.body

        // validation
        if(!email || !password){
            return res.send(400).send({
                success : false,
                message : "Please enter the give credentials",

            })
        }

        const user = await userModels.findOne({email})
        if(!user){
            return res.status(200).send({
                success : false,
                message : "Email is not registered"
            })
        }

        // password
        const isMAtch = await bcrypt.compare(password, user.password)
        if(!isMAtch){
            return res.status(401).send({
                success : false,
                message : "Invalid username or password",

            })
        }

        return res.status(200).send({
            success : true,
            message : "Login successfully!",
            user
        })
    }
    catch(error){
        return res.status(500).send({
            success : false,
            message : "Error in login callback",
            error
        })
    }
}