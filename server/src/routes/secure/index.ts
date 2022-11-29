import { Router, Request, Response, NextFunction } from "express"
import ensureAuthenticated from '../../middlewares/ensureAuthenticated'
import postRoutes from './post.routes'
import addressRoutes from './address.routes'

const router = Router()

router.use("/", ensureAuthenticated)
router.use('/posts', postRoutes)
router.use('/address', addressRoutes)

export default router