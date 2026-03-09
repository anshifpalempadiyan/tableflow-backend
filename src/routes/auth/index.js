import express from 'express'
import signupAuthentication from '../../controllers/authentication/signup.js'


const router = express.Router()

router.post('/signup',signupAuthentication)




export default router