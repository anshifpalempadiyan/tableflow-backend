import express from 'express'
import signupAuthentication from '../../controllers/authentication/signup.js'
import loginAuthentication from '../../controllers/authentication/login.js'
import username from '../../controllers/authentication/username.js'
import authenticateToken from '../../helpers/authenticationHelpers/authenticateToken.js'
import refreshAuthentication from '../../controllers/authentication/refresh.js'
import logoutAuthentication from '../../controllers/authentication/logout.js'
import sendingOTP from '../../controllers/authentication/sendingOTP.js'
import verifyOTP from '../../controllers/authentication/verifyOTP.js'
import resetPassword from '../../controllers/authentication/resetPassword.js'


const router = express.Router()

router.post('/signup',signupAuthentication)
router.post('/login'  ,loginAuthentication)
router.get('/username', authenticateToken ,username)
router.post('/refresh', refreshAuthentication)
router.delete('/logout' , logoutAuthentication )
router.post('/sending-otp' , sendingOTP )
router.post('/verify-otp' , verifyOTP)
router.post('/reset-password' , resetPassword)




export default router