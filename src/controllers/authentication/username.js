import User from '../../models/user.js'


const username = async (req , res ) => {

   const username = req.user.userName
   const userData = await User.findOne({ userName : username } , { password : 0 })
   res.json({ userData})



}


export default username