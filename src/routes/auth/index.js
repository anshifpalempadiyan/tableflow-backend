import express from 'express'
import signupAuthentication from '../../controllers/authentication/signup.js'
import loginAuthentication from '../../controllers/authentication/login.js'


const router = express.Router()

router.post('/signup',signupAuthentication)
router.post('/login',loginAuthentication)




export default router