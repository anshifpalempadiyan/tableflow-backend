import Otp from '../../models/emailOTPModel.js'




const MAX_ATTEMPTS = 5

const checkOtp = async ( email , otp ) => {

    const otpDoc = await Otp.findOneAndUpdate(
        { email },
        { $inc : { attempts : 1 } },
        { new : true }
    )

      if (!otpDoc) {
        return { ok: false, error: 'Invalid or expired OTP' }
    }

    if (otpDoc.attempts > MAX_ATTEMPTS) {
        await Otp.deleteOne({ email })
        return { ok: false, error: 'Too many attempts. Request a new OTP' }
    }

       if (otp === undefined || otp === null || otpDoc.otp.toString() !== String(otp)) {
        return { ok: false, error: 'Invalid OTP' }
    }

    return { ok: true }
}

export default checkOtp