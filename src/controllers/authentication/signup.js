import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../../models/user.js'



const signupAuthentication = async (req, res) => {
    try {
        const { userName, password, email } = req.body

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'all fields are required' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await new User({ userName, password: hashedPassword, email }).save()
        return res.status(201).json({ msg: "User created" })


        // const payload = { userName , email }
        // const secret = process.env.JWT_SECRET
    } catch (error) {
        console.log("Error in the signup", error.message)
        res.status(500).json({ error: "Internal Server Error" })

    }

}

export default signupAuthentication

