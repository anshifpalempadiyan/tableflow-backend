import RefreshToken from "../../models/refreshToken.js"



const logoutAuthentication = async( req , res ) => {
    try {
        const refreshToken = req.cookies?.refreshToken
        const refreshTokenData = await RefreshToken.findOneAndDelete({ refreshToken : refreshToken })

        if ( !refreshTokenData ) {
            return res.json({ msg : "Refresh token not found"})
        } else {
            return res.json({ msg : "Refresh token deleted"})
        }
        
    } catch (error) {
        console.log("Error in the login", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
    
    


}


export default logoutAuthentication