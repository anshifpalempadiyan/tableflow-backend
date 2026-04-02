import jwt, { decode } from 'jsonwebtoken'


const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization']
  console.log("Raw Header:", authHeader);
  let token = authHeader && authHeader.split(' ')[1]



    if (!token && req.cookies) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = decoded
    next()
  })



}

export default authenticateToken
