import {Router} from 'express'
import { isAuth } from '../../middlewares/isAuth.js'
import { currentUser } from '../../middlewares/current-user.js'
import { deleteUser, getAllUser, getStats, newAdmin } from '../controllers/admin.controller.js'
import { isSuper_admin } from '../../middlewares/isSuper-admin.js'
import { isAdmin } from '../../middlewares/isAdmin.js'


const router =  Router()

router.post("/admin/new", isAuth, currentUser, isSuper_admin ,newAdmin)
router.get("/admin/all-users", isAuth, currentUser, isSuper_admin, getAllUser)
router.delete("/admin/delete/:id", isAuth, currentUser, isSuper_admin, deleteUser)
router.get("/stats", isAuth, currentUser, isAdmin, getStats)

export default router