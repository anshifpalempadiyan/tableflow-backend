// import jwt from 'jsonwebtoken'
import jwt, { decode } from 'jsonwebtoken'




const refreshAuthentication = (req , res ) => {
    if ( req.cookies?.refreshToken ) {
        const Token = req.cookies.refreshToken

        jwt.verify( Token , process.env.REFRESH_TOKEN_SECRET , ( err , decode ) => {
            if (err) {
                return res.status(406).json({ msg : 'Unauthorized'})
            }else{
                const { userName } = decode
                const accessToken = jwt.sign({ userName } , process.env.ACCESS_TOKEN_SECRET , { expiresIn : '10m'})
                res.cookie('accessToken' , accessToken , {
                    httpOnly : true , 
                    secure : true,
                })
                return res.json({ accessToken })
            }
        })
    }else{
        return res.status(406).json({ msg : 'No refresh Unauthorized' })
    }

}

export default refreshAuthentication

