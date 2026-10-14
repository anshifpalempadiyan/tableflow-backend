import Otp from "../../models/emailOTPModel.js";






const verifyOTP = async ( req , res ) => {

    const { email, otp } = req.body

    try {

        const user = await Otp.findOne({ email })

        if (!user || user.otp.toString() !== otp.toString() ) {

            return res.status(400).json({ status : false , error: 'Invalid OTP' });
        }

        if (user.createdAt.getTime() + 60 * 60 * 1000 < Date.now()) {
            return res.status(400).json({ status : false , error: 'OTP has expired' });
        }

        res.status(200).json({ status: true , msg: 'Email verified successfully!' });

    } catch (error) {

        console.log(error, "error")
        res.status(500).json({ status : false , error: 'Verification failed' });
    }

}

export default verifyOTP