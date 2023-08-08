import {Router} from 'express'
import { isAuth } from '../../middlewares/isAuth.js'
import { currentUser } from '../../middlewares/current-user.js'
import { isVerified } from '../../middlewares/isVerified.js'
import { isCourier } from '../../middlewares/isCourier.js'
import { EndPurchase, History, PurchaseAtCourier, QueuePurchase, confirmationPurchase } from '../controllers/courier.controller.js'



const router =  Router()

router.get("/courier/purchases", isAuth, currentUser, isVerified, isCourier, QueuePurchase)
router.get("/courier/confirmed/purchase", isAuth, currentUser, isVerified, isCourier, PurchaseAtCourier)
router.get("/courier/purchases/history", isAuth, currentUser, isVerified, isCourier, History)

router.put("/courier/confirm/:id", isAuth, currentUser, isVerified, isCourier, confirmationPurchase)
router.put("/courier/end/:id", isAuth, currentUser, isVerified, isCourier, EndPurchase)

export default router