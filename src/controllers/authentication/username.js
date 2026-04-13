import User from '../../models/user.js'


const username = async (req , res ) => {
   const id = req.user.id
   const userData = await User.findOne({ _id : id } , { password : 0 })
   console.log(userData,"userdata")
   res.json({ userData})



}


export default username