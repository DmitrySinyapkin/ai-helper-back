import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', )
router.post('/refresh', )
router.post('/logout', )

export default router
