import express from 'express'
import layoutSectionDisabled from '../../controllers/floorPlan/layoutSectionDisabled.js'
import layoutSectionEnabling from '../../controllers/floorPlan/layoutSectionEnabling.js'
import floorPlanGet from '../../controllers/floorPlan/floorPlanGet.js'
import authenticateToken from '../../helpers/authenticationHelpers/authenticateToken.js'
import layoutCreationt from '../../controllers/floorPlan/layoutCreation.js'
import layoutEdit from '../../controllers/floorPlan/layoutEdit.js'





const router = express.Router()

router.use(authenticateToken)


router.get('/get' , floorPlanGet)
router.post('/create' , layoutCreationt )
router.patch('/layout' , layoutEdit )
router.patch('/disable', layoutSectionDisabled )
router.patch('/enable' , layoutSectionEnabling )



export default router