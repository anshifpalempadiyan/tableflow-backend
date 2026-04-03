import jwt from 'jsonwebtoken'



const generateRefreshToken = ({ userName }) =>{
    return jwt.sign( { userName } , process.env.REFRESH_TOKEN_SECRET , { expiresIn : "10m" })
}
export default generateRefreshToken