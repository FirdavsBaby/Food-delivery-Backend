import {Router} from 'express'
import { isAuth } from '../../middlewares/isAuth.js'
import { currentUser } from '../../middlewares/current-user.js'
import { isAdmin } from '../../middlewares/isAdmin.js'
import { isVerified } from '../../middlewares/isVerified.js'
import { ConfirmRestoran, getAllRestorans, getOneRestoran, getQueue } from '../controllers/restoran.controller.js'
import { isUser } from '../../middlewares/isUser.js'


const router =  Router()


router.get("/restorans/queue", isAuth, currentUser, isVerified,isAdmin, getQueue)
router.put("/restoran/confirm/:id", isAuth, currentUser, isVerified, isAdmin, ConfirmRestoran)
router.get("/restorans", isAuth, currentUser, isUser,getAllRestorans)
router.get("/restoran/:id", isAuth, currentUser, getOneRestoran)



export default router