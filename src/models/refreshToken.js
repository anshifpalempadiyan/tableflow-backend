import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
    {
        refreshToken : {
            type : String,
            required : true,
            unique : true 
        },
       
    },
    {
        timestamps : true 
    }
)

const RefresToken = mongoose.model("RefresToken",refreshTokenSchema)

export default RefresToken