const express = require('express')
const { getAllUser, registerController, loginController } = require('../controller/userController')

// router object
const router = express.Router()

// get all user || method : get
router.get('/all-users', getAllUser)

// create/register user || method : post
router.post('/register', registerController)

// login user || method : post
router.post('/login', loginController)

module.exports = router
