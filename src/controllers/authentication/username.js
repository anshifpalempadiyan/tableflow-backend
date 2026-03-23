import User from '../../models/user.js'


const username = async (req , res ) => {
   console.log("dfidhifhheihdfiierihfg th ioihioh h d")
   console.log(req.user.userName)
   const username = req.user.userName
   const userData = await User.findOne({ userName : username } , { password : 0 })
   console.log(userData, "userdate")
   res.json({ userData})



}


export default username