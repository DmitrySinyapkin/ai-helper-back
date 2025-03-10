import express from 'express'
import notesController from '../controllers/notesController'

const router = express.Router()

router.get('/', notesController.getNoteList)
router.post('/', notesController.createNote)
router.get('/:id', notesController.getNoteById)
router.put('/:id', notesController.updateNote)
router.delete('/:id', notesController.deleteNote)

export default router
