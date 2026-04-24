import express from 'express'
import layoutCreation from '../../controllers/floorPlan/layoutCreation.js'
import layoutSectionDisabled from '../../controllers/floorPlan/layoutSectionDisabled.js'
import layoutSectionEnabling from '../../controllers/floorPlan/layoutSectionEnabling.js'
import floorPlanGet from '../../controllers/floorPlan/floorPlanGet.js'


const router = express.Router()

router.get('/get' , floorPlanGet)
router.post('/create' , layoutCreation )
router.patch('/disable', layoutSectionDisabled )
router.patch('/enable' , layoutSectionEnabling )



export default router