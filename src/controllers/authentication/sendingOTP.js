import sendingEmail from '../../helpers/authenticationHelpers/sendingEmail.js'
import Otp from '../../models/emailOTPModel.js'
import User from '../../models/user.js'
import crypto from 'crypto'







const sendingOTP = async (req, res) => {



    try {

        const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
        if (!email) {
            return res.status(400).json({ status: false, msg: "Enter valid credientials" })
        }


        const otp = crypto.randomInt(100000, 1000000)

        await Otp.deleteOne({ email })
        await Otp.create({ email, otp })
        await sendingEmail(email, otp)

        return res.status(200).json({ status: true, msg: 'OTP sent to your email' })


        // const userData = await User.findOne({ email })
        // console.log("the otp again", otp)

        // const otpUserData = await Otp.findOne({ email })

        // if (otpUserData) {

        //     const changeUserOTP = await Otp.updateOne({ email }, { $set: { otp } })
        //     await sendingEmail(email, otp);
        //     console.log("OTP updated")

        // } else {

        //     const otpData = await new Otp({ email, otp }).save()
        //     await sendingEmail(email, otp);
        //     console.log("OTP created")

        // }

        // if (userData) {

        //     res.status(200).json({ status: true, msg: 'OTP sented for the password update!' });

        // } else {

        //     return res.status(400).json({ status: true, msg: "OTP sented for the email verification!" })

        // }



    } catch (error) {
        console.log("Error in sendingOTP", error.message)
        res.status(500).json({ status: false, error: 'Error processing your request' });

    }

}

export default sendingOTP