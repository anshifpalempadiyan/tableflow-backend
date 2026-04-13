import express from 'express'
import layoutCreation from '../../controllers/floorPlan/layoutCreation.js'


const router = express.Router()

router.post('/create' , layoutCreation )


export default router