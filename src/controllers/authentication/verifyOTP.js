import Otp from "../../models/emailOTPModel.js";
import checkOtp from "../../helpers/authenticationHelpers/checkOtp.js"






const verifyOTP = async (req, res) => {

    try {

        const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : ''
        const { otp } = req.body

        if (!email || !otp) {
            return res.status(400).json({ status: false, error: 'Email and OTP are required' })
        }


        const result = await checkOtp(email, otp)
        if (!result.ok) {
            return res.status(400).json({ status: false, error: result.error })
        }

        return res.status(200).json({ status: true, msg: 'Email verified successfully!' })

    } catch (error) {

        console.log("Error in verifyOTP", error.message)
        return res.status(500).json({ status: false, error: 'Verification failed' })
    }

}

export default verifyOTP


// const user = await Otp.findOne({ email })

// if (!user || user.otp.toString() !== otp.toString() ) {

//     return res.status(400).json({ status : false , error: 'Invalid OTP' });
// }

// if (user.createdAt.getTime() + 60 * 60 * 1000 < Date.now()) {
//     return res.status(400).json({ status : false , error: 'OTP has expired' });
// }

// res.status(200).json({ status: true , msg: 'Email verified successfully!' });