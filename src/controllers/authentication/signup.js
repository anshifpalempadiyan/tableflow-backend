import bcrypt from 'bcrypt'
import User from '../../models/user.js'
import RefreshToken from '../../models/refreshToken.js'
import generateRefreshToken from '../../helpers/authenticationHelpers/generateRefreshToken.js'
import generateAccessToken from '../../helpers/authenticationHelpers/generateAccessToken.js'
import Otp from '../../models/emailOTPModel.js'
import checkOtp from '../../helpers/authenticationHelpers/checkOtp.js'
import cookieBase from '../../helpers/authenticationHelpers/cookieOptions.js'



const signupAuthentication = async (req, res) => {
    try {
        const { password, otp } = req.body
        const userName = typeof req.body.userName === 'string' ? req.body.userName.trim() : ''
        const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''


        if (!userName || !email || typeof password !== 'string' || !otp) {
            return res.status(400).json({ message: 'all fields are required' })
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' })
        }

        const result = await checkOtp(email, otp)
        if (!result.ok) {
            return res.status(400).json({ message: result.error })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await new User({ userName, password: hashedPassword, email }).save()

        await Otp.deleteOne({ email })

        if (user) {
            const id = user._id
            const accessToken = generateAccessToken({ id })
            const refreshToken = generateRefreshToken({ id })
            res.cookie('accessToken', accessToken, { ...cookieBase , maxAge: 15 * 60 * 1000 })
            res.cookie('refreshToken', refreshToken, { ...cookieBase , maxAge:  7 * 24 * 60 * 60 * 1000 })
            //     {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: isProd ? 'none' : 'lax',
            //     maxAge: 15 * 60 * 1000
            // }
            
            //     {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: isProd ? 'none' : 'lax',
            //     maxAge: 7 * 24 * 60 * 60 * 1000
            // }
            
            await  RefreshToken.updateOne({ userId: id } , { $set : { refreshToken }} , { upsert : true })
            return res.status(201).json({ status: true, msg: "User created" })
        } else {
            return res.status(404).json({ status: false, msg: "ERROR user not created" })
        }


    } catch (error) {

        if (error.code === 11000) {
            return res.status(409).json({ message: 'An account with this email or username already exists' })
        }

        console.log("Error in the signup", error.message)
        res.status(500).json({ error: "Internal Server Error" })

    }

}

export default signupAuthentication

