import express from 'express'
import usersController from '../controllers/usersController.js'

const router = express.Router()

router.get('/', usersController.getUserList)
router.get('/:id', usersController.getUserById)
router.get('/info/me', usersController.getMe)

export default router
