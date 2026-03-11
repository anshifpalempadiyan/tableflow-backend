import bcrypt from 'bcrypt'





const loginAuthentication = () => {
    const { email , password , userName } = req.body
    // const secret = process.env.JWT_SECRET

    if ( !email || !password || !userName ) {
        return res.status(400).json({ msg : "Enter valid credientials"})
    }

    

    // const accessToken = JsonWebTokenError.sign({ email , userName }) 
}


export default loginAuthentication