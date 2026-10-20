import RefreshToken from "../../models/refreshToken.js"
import cookieBase from '../../helpers/authenticationHelpers/cookieOptions.js'




const logoutAuthentication = async (req, res) => {

    try {

        const refreshToken = req.cookies?.refreshToken

        res.clearCookie('accessToken', cookieBase)
        res.clearCookie('refreshToken', cookieBase)


        if (refreshToken) {
            await RefreshToken.deleteOne({ refreshToken })
        }

        return res.json({ status: true, msg: "Logged out successfully" })


    } catch (error) {

        console.log("Error in the login", error.message)
        return res.status(500).json({ status: false, error: "Internal Server Error" });

    }




}


export default logoutAuthentication

// res.clearCookie('accessToken', { path: '/' })
//         res.clearCookie('refreshToken', { path: '/' })

//         const refreshToken = req.cookies?.refreshToken


//         if (!refreshToken) {
//             return res.json({ status: true, msg: "Logged out successfully" });
//         }


//         await RefreshToken.deleteOne({ refreshToken: refreshToken } )

//         return res.json({ status : true , msg : "Refresh token deleted" })
