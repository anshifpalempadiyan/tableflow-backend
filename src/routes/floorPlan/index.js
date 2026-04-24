import express from 'express'
import layoutCreation from '../../controllers/floorPlan/layoutCreation.js'
import layoutSectionDisabled from '../../controllers/floorPlan/layoutSectionDisabled.js'


const router = express.Router()

router.post('/create' , layoutCreation )
router.patch('/disable', layoutSectionDisabled )


export default router