import sendingEmail from '../../helpers/authenticationHelpers/sendingEmail.js'
import Otp from '../../models/emailOTPModel.js'
import User from '../../models/user.js'






const sendingOTP = async (req, res) => {



    try {

        const { email } = req.body
        console.log("userEmail", email)
        if (!email) {
            return res.status(400).json({ status: false, msg: "Enter valid credientials" })
        }

        const userData = await User.findOne({ email })

        const otp = Math.floor(100000 + Math.random() * 900000)
        console.log("the otp again", otp)

        const otpUserData = await Otp.findOne({ email })

        if (otpUserData) {

            const changeUserOTP = await Otp.updateOne({ email }, { $set: { otp } })
            await sendingEmail(email, otp);
            console.log("OTP updated")

        } else {

            const otpData = await new Otp({ email, otp }).save()
            await sendingEmail(email, otp);
            console.log("OTP created")

        }

        if (userData) {

            res.status(200).json({ status: true, msg: 'OTP sented for the password update!' });

        } else {

            return res.status(400).json({ status: true, msg: "OTP sented for the email verification!" })

        }



    } catch (error) {

        res.status(500).json({ status: false, error: 'Error processing your request' });

    }

}

export default sendingOTP