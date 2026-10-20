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
import rateLimit from 'express-rate-limit'


const makeLimiter = ( limit ) => rateLimit({

    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { status: false, msg: 'Too many requests. Try again later.', error: 'Too many requests. Try again later.' }

})

const loginLimiter = makeLimiter(10)
const otpSendLimiter = makeLimiter(5)
const otpCheckLimiter = makeLimiter(20)


const router = express.Router()

router.post('/signup' , otpCheckLimiter ,signupAuthentication)
router.post('/login' , loginLimiter ,loginAuthentication)
router.get('/username' , authenticateToken ,username)
router.post('/refresh', refreshAuthentication)
router.delete('/logout' , logoutAuthentication )
router.post('/sending-otp' , otpSendLimiter , sendingOTP )
router.post('/verify-otp' , otpCheckLimiter , verifyOTP)
router.post('/reset-password' , otpCheckLimiter , resetPassword)




export default router