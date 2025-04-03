import express from 'express'
import chatController from '../controllers/chatController.js'

const router = express.Router()

router.post('/completions', chatController.createCompletion)

export default router
