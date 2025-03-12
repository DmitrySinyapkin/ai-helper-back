import express from 'express'
import usersController from '../controllers/usersController'

const router = express.Router()

router.get('/', usersController.getUserList)
router.get('/:id', usersController.getUserById)

export default router
