// import jwt from 'jsonwebtoken'
import jwt, { decode } from 'jsonwebtoken'
import generateAccessToken from '../../helpers/authenticationHelpers/generateAccessToken.js'
import RefreshToken from '../../models/refreshToken.js'




const refreshAuthentication = async (req, res) => {
    if (req.cookies?.refreshToken) {
        const Token = req.cookies.refreshToken
        const refreshTokenData = await RefreshToken.findOne({ refreshToken: Token })
        if (refreshTokenData) {
            jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
                if (err) {
                    return res.status(406).json({ msg: 'Unauthorized' })
                } else {
                    const { id } = decode
                    const accessToken = generateAccessToken({ id })
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite : 'lax',
                        maxAge : 15 * 60 * 1000
                    })
                    return res.json({ accessToken })
                }
            })
        } else {
            return res.status(404).json({ msg : "This user is restricted"})
        }

    } else {
        return res.status(406).json({ msg: 'No refresh Unauthorized' })
    }

}

export default refreshAuthentication

