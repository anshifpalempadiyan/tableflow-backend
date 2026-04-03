import jwt, { decode } from 'jsonwebtoken'
import RefreshToken from '../../models/refreshToken.js';


const authenticateToken = async (req, res, next) => {

  const authHeader = req.headers['authorization']
  let token = authHeader && authHeader.split(' ')[1]



  if (!token && req.cookies) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.sendStatus(401)
  }
  // const refreshTokenData = await RefreshToken.findOne({ refreshToken : token })
  // if ( refreshTokenData ) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = decoded
    next()
  })
  // } else {
  //   return res.sendStatus(403)
  // }

  



}

export default authenticateToken
