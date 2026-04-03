import jwt from 'jsonwebtoken'



const generateRefreshToken = ({ id }) =>{
    return jwt.sign( { id } , process.env.REFRESH_TOKEN_SECRET , { expiresIn : "10m" })
}
export default generateRefreshToken