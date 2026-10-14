import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();






const sendingEmail = async (userEmail, otp) => {

    try {
        
        const emailTemplate = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
                <h2 style="color: #333333; margin-bottom: 20px; text-align: center;">Welcome to Tableflow</h2>
      
                <p style="color: #555555; font-size: 16px; line-height: 1.5;">
                    Hello, <br><br>
                    Please use the verification code below to securely log in to your account. This code will expire in <strong>10 minutes</strong>.
                </p>
      
                <div style="text-align: center; margin: 30px 0;">
                    <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #ffffff; background-color: #00466a; padding: 15px 25px; border-radius: 6px;">
                        ${otp}
                    </span>
                </div>
      
                <p style="color: #777777; font-size: 14px; text-align: center; border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 30px;">
                        If you didn't request this code, you can safely ignore this email.
                </p>
      
            </div>
        </div>
    `;

    const transporter = nodemailer.createTransport({

        secure: false,
        service: 'gmail',
        auth: {

            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Your Tableflow Verification Code',
        text: `Your login code is: ${otp}. It will expire in 10 minutes.`,
        html: emailTemplate
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);

    } catch (error) {

        console.error("Error inside sendingEmail:", error);
        throw new Error("Failed to send verification email");
        
    }


}

export default sendingEmail