import express from 'express'
import AuthRoutes from './auth/index.js'
import FloorRoutes from './floorPlan/index.js'



const router = express.Router()

router.get('/', ( req , res ) =>{
    res.json({ msg : "This is v1"})
})

router.use('/auth', AuthRoutes)
router.use('/floor' , FloorRoutes)

export default router