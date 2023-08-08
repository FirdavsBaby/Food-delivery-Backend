import {Router} from 'express'
import { isAuth } from '../../middlewares/isAuth.js'
import { currentUser } from '../../middlewares/current-user.js'
import { deleteMenu, getAllMenu, getOneMenu, getRestoranMenu, newMenuItem, updateMenu } from '../controllers/menu.controller.js'
import { isRestoran } from '../../middlewares/isRestoran.js'
import { isVerified } from '../../middlewares/isVerified.js'


const router =  Router()

router.get("/menu", isAuth, currentUser, getAllMenu)
router.get("/menu/me", isAuth, currentUser, getRestoranMenu)
router.post("/menu/new", isAuth, currentUser, isVerified,isRestoran ,newMenuItem)
router.put("/menu/update/:id", isAuth, currentUser, isVerified,isRestoran, updateMenu)
router.get("/menu/item/:id", isAuth, currentUser, getOneMenu)
router.delete("/menu/delete/:id", isAuth, currentUser, isVerified ,isRestoran ,deleteMenu)

export default router