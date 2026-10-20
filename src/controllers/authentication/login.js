import bcrypt from 'bcrypt'
import User from '../../models/user.js'
import jwt from 'jsonwebtoken'
import generateAccessToken from '../../helpers/authenticationHelpers/generateAccessToken.js'
import RefreshToken from "../../models/refreshToken.js"
import generateRefreshToken from '../../helpers/authenticationHelpers/generateRefreshToken.js'
import cookieBase from '../../helpers/authenticationHelpers/cookieOptions.js'






const loginAuthentication = async (req, res) => {
    try {

        const { password } = req.body
        const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''


        if (typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ status: false, msg: "Invalid input" })
        }

        const userData = await User.findOne({ email })
        if (userData) {
            const isPasswordMatching = await bcrypt.compare(password, userData.password)
            if (isPasswordMatching) {
                const userRefreshTokenData = await RefreshToken.findOne({ userId: userData._id })
                const id = userData._id
                // if (userRefreshTokenData) {
                    const accessToken = generateAccessToken({ id })
                    const refreshToken = generateRefreshToken({ id })
                    res.cookie('accessToken', accessToken, { ...cookieBase , maxAge: 15 * 60 * 1000 })
                    res.cookie('refreshToken', refreshToken, { ...cookieBase , maxAge: 7 * 24 * 60 * 60 * 1000 })
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
                
                    await RefreshToken.updateOne({ userId: userData._id }, { $set: { refreshToken } }, { upsert: true })
                    return res.status(200).json({ msg: `Welcome ${userData.userName} team`, status: true, userData: { id, userName: userData.userName, email: userData.email } })
                // } else {
                //     console.log("User refresh token history not found")
                //     return res.status(403).json({ msg: "User is restricted from the platform", status: false })
                // }




            } else {
                return res.status(401).json({ status: false, msg: "Invalid email or password”" })
            }
        } else {
            return res.status(401).json({ status: false, msg: "Invalid email or password”" })
        }


    } catch (error) {
        console.log("Error in the login", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }

}


export default loginAuthentication


