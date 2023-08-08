import {Router} from 'express'
import { isAuth } from '../../middlewares/isAuth.js'
import { currentUser } from '../../middlewares/current-user.js'
import { isVerified } from '../../middlewares/isVerified.js'
import { AddToCart, AllPurchases, MinusCount, MyPurchase, PurchasesHistory, QueuePurchase, RemoveFromCart, confirmation, getCart, getMe, newPayment, newPurchase, raiting } from '../controllers/user.controller.js'
import { isRestoran } from '../../middlewares/isRestoran.js'
import { isUser } from '../../middlewares/isUser.js'



const router =  Router()

router.get("/me", isAuth, currentUser, getMe)
router.put("/cart/add/:id", isAuth, currentUser, isVerified, isUser, AddToCart)
router.get("/cart", isAuth, currentUser, isVerified, getCart)
router.put("/cart/minus/:id", isAuth, currentUser, isVerified, MinusCount)
router.delete("/cart/delete/:id", isAuth, currentUser, isVerified, RemoveFromCart)
router.post("/cart/payment", isAuth, currentUser, isVerified, newPayment)
router.post("/cart/purchase/", isAuth, currentUser, isVerified, isUser ,newPurchase)
router.get("/cart/purchases", isAuth, currentUser, isVerified, AllPurchases)
router.get("/cart/purchases/queue", isAuth, currentUser, isVerified, isRestoran, QueuePurchase)
router.put("/cart/purchase/confirm/:id", isAuth, currentUser, isVerified, isRestoran, confirmation)
router.get("/cart/purchases/me", isAuth, currentUser, isVerified, isUser,MyPurchase)
router.put("/cart/purchase/raiting/:id", isAuth, currentUser, isVerified, isUser, raiting)
router.get("/cart/purchases/history", isAuth, currentUser, isVerified, isUser, PurchasesHistory)
export default router