import RefreshToken from "../../models/refreshToken.js"



const logoutAuthentication = async( req , res ) => {
    try {
        const refreshToken = req.cookies?.refreshToken
        const refreshTokenData = await RefreshToken.findOneAndUpdate({ refreshToken : refreshToken } , { $set: { refreshToken: null } })

        if ( !refreshTokenData ) {
            return res.json({ status : false , msg : "Refresh token not found"})
        } else {
            res.clearCookie('accessToken' , { path : '/' })
            res.clearCookie('refreshToken' , { path : '/' })
            return res.json({ status : true , msg : "Refresh token deleted"})
        }
        
    } catch (error) {
        console.log("Error in the login", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
    
    


}


export default logoutAuthentication