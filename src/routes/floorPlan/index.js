import express from 'express'
import layoutCreation from '../../controllers/floorPlan/layoutCreation.js'
import layoutSectionDisabled from '../../controllers/floorPlan/layoutSectionDisabled.js'
import layoutSectionEnabling from '../../controllers/floorPlan/layoutSectionEnabling.js'


const router = express.Router()

router.post('/create' , layoutCreation )
router.patch('/disable', layoutSectionDisabled )
router.patch('/enable' , layoutSectionEnabling )


export default router