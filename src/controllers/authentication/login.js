import bcrypt from 'bcrypt'
import User from '../../models/user.js'
import jwt from 'jsonwebtoken'
import generateAccessToken from '../../helpers/authenticationHelpers/generateAccessToken.js'
import RefreshToken from "../../models/refreshToken.js"






const loginAuthentication = async (req, res) => {
    try {

        const { email, password, userName } = req.body

        if (!email || !password || !userName) {
            return res.status(400).json({ msg: "Enter valid credientials" })
        }

        const userData = await User.findOne({ email, userName })
        if (userData) {
            const isPasswordMatching = await bcrypt.compare(password, userData.password)
            if (isPasswordMatching) {
                // console.log("username of access ",{userName})
                const accessToken = generateAccessToken({ userName })
                res.cookie('accessToken' , accessToken , {
                    httpOnly : true , 
                    secure : true,
                })
                // console.log("username of refresh ",{userName})
                const refreshToken = jwt.sign({ userName }, process.env.REFRESH_TOKEN_SECRET)
                const userRefreshTokenData = await RefreshToken.findOne({ userId : userData._id })
                if ( userRefreshTokenData ) {
                    const existingUserData = await RefreshToken.updateOne({ userId : userData._id } , { $set : { refreshToken : refreshToken }})
                    console.log( existingUserData , "user already existed and updated the token ")
                } else {
                    const newUser = await new RefreshToken({ userId : userData._id , refreshToken : refreshToken }).save()
                    console.log( newUser , "new user token created  ")
                }
                console.log(refreshToken,"tokekldkfjdkjfkjdjfjdjdk")
                res.cookie('refreshToken' , refreshToken , { 
                    httpOnly : true,
                    secure : true ,
                    // sameSite : 'None',
                    // maxAge : 24 * 60 *  60 * 1000
                })
                return res.status(200).json({ msg: `Welcome ${userName}`, accessToken: accessToken, refreshToken: refreshToken })
            } else {
                return res.status(404).json({ msg: "Wrong password" })
            }
        } else {
            return res.status(400).json({ msg: "User not found" })
        }

        // const accessToken = JsonWebTokenError.sign({ email , userName }) 

    } catch (error) {
        console.log("Error in the login", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }

}


export default loginAuthentication


