import jwt from 'jsonwebtoken'



const generateAccessToken = ({ id }) => {
    return jwt.sign(  { id }  , process.env.ACCESS_TOKEN_SECRET , { expiresIn : "40s"})

} 

export default generateAccessToken