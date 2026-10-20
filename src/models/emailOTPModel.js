import mongoose from "mongoose";


const otpSchema = new mongoose.Schema(

    {

        otp: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 600
        },
        attempts: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

const Otp = mongoose.model("Otp", otpSchema)

export default Otp