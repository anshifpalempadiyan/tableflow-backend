



const signupAuthentication = async ( req , res ) => {
    try {
        const { userName , password , email } = req.body

        if ( !userName || !email || !password ) {
            return res.status(400).json({ message : 'all fields are required'})
        }
    } catch (error) {
        
    }

}

export default signupAuthentication