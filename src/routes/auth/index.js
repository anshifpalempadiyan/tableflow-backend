import express from 'express'
import signupAuthentication from '../../controllers/authentication/signup.js'
import loginAuthentication from '../../controllers/authentication/login.js'
import username from '../../controllers/authentication/username.js'
import authenticateToken from '../../helpers/authenticationHelpers/authenticateToken.js'
import refreshAuthentication from '../../controllers/authentication/refresh.js'


const router = express.Router()

router.post('/signup',signupAuthentication)
router.post('/login'  ,loginAuthentication)
router.get('/username', authenticateToken ,username)
router.post('/refresh', refreshAuthentication)




export default router