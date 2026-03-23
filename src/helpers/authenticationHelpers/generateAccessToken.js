import jwt from 'jsonwebtoken'



const generateAccessToken = ({ userName }) => {
    return jwt.sign(  { userName }  , process.env.ACCESS_TOKEN_SECRET , { expiresIn : "40s"})

} 

export default generateAccessToken