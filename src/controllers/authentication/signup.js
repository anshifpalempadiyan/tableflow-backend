import bcrypt from 'bcrypt'
import User from '../../models/user.js'
import RefreshToken from '../../models/refreshToken.js'
import generateRefreshToken from '../../helpers/authenticationHelpers/generateRefreshToken.js'
import generateAccessToken from '../../helpers/authenticationHelpers/generateAccessToken.js'



const signupAuthentication = async (req, res) => {
    try {
        const { userName, password, email } = req.body

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'all fields are required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await new User({ userName, password: hashedPassword, email }).save()
        // console.log(user._id,"user mongo id ")
        if ( user ) {
            const accessToken = generateAccessToken({ userName })
                res.cookie('accessToken' , accessToken , {
                    httpOnly : true , 
                    secure : true,
                })
            const refreshToken = generateRefreshToken({ userName })
                res.cookie('refreshToken' , refreshToken , { 
                    httpOnly : true,
                    secure : true ,
                    // sameSite : 'None',
                    // maxAge : 24 * 60 *  60 * 1000
                })
            const newUser = await new RefreshToken({ userId : user._id , refreshToken : refreshToken }).save()
            console.log(   "new user token created  ")
            return res.status(201).json({ msg: "User created" })
        } else  {
            return res.status(404).json({ msg : "ERROR user not created"})
        }


    } catch (error) {
        console.log("Error in the signup", error.message)
        res.status(500).json({ error: "Internal Server Error" })

    }

}

export default signupAuthentication

