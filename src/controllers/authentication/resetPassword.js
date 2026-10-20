import Otp from "../../models/emailOTPModel.js";
import User from "../../models/user.js";
import bcrypt from 'bcrypt'
import checkOtp from '../../helpers/authenticationHelpers/checkOtp.js'





const resetPassword = async (req, res) => {

    try {
        const { otp, newPassword } = req.body
        const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''



        if (!otp || !email || !newPassword) {
            return res.status(400).json({ status: false, msg: 'all fields are required' })
        }


        const result = await checkOtp(email, otp)
        if (!result.ok) {
            return res.status(400).json({ status: false, error: result.error });
        }

        await Otp.deleteOne({ email });

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUser = await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword } })

        return res.status(201).json({ status: true, msg: "User password updated" })

    } catch (error) {
        return res.status(404).json({ status: false, msg: "ERROR user not updated" })

    }

}

export default resetPassword

// const user = await Otp.findOne({ email })

// if (!user || user.otp.toString() !== otp.toString() ) {

//     return res.status(400).json({ status : false , error: 'Invalid OTP' });
// }

// if (user.createdAt.getTime() + 60 * 60 * 1000 < Date.now()) {
//     return res.status(400).json({ status : false , error: 'OTP has expired' });
// }
