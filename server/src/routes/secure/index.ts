import { Router, Request, Response, NextFunction } from "express"
import ensureAuthenticated from '../../middlewares/ensureAuthenticated'
import postRoutes from './post.routes'
import addressRoutes from './address.routes'
import familyRoutes from './family.routes'

const router = Router()

router.use("/", ensureAuthenticated)
router.use('/posts', postRoutes)
router.use('/address', addressRoutes)
router.use('/family', familyRoutes)

export default router