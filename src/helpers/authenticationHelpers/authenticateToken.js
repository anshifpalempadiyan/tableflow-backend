import jwt, { decode } from 'jsonwebtoken'


const authenticateToken = (req, res, next) => {
  // console.log(req,"req")
  // console.log(process.env.ACCESS_TOKEN_SECRET)
  // console.log("on step one")
  const authHeader = req.headers['authorization']
  console.log("Raw Header:", authHeader);
  // console.log(authHeader,"authHeader")
  let token = authHeader && authHeader.split(' ')[1]
  console.log(token,"token")


    if (!token && req.cookies) {
      console.log(req.cookies,"cookeig")
    token = req.cookies.accessToken;
    console.log(token,"theeeeeeeeeeeeeeeeeeeeeeeeeen")
  }

  if (!token) {
    console.log("error in here")
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(decoded)
    if (err) {
      console.log("error in here seccond ",err)
      return res.sendStatus(403)
    }
    console.log(req.decoded,"req,user")
    req.user = decoded
    next()
  })



}

export default authenticateToken

  // try {

  //   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  //   console.log(decoded, "decoded")
  //   req.user = decoded
  //   next()

  // } catch (error) {
  //   console.log(error)
  //   return res.status(400).send("Invalid Token")
  // }




  // if (!token) {
  //   return res.status(401).send('Access denied. No token rovided.')
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  //   req.user = decoded
  //   next()

  // } catch (error) {
  //   return res
  // }