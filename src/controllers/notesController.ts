import { Request, Response } from 'express'
import notesService from '../services/notesService.js'

class NotesController {
    async getNoteList(req: Request, res: Response): Promise<any> {
        const { user } = req.body

        const notes = await notesService.getNoteList(user.id)

        if (notes) {
            return res.status(200).json(notes)
        }

        return res.status(500).json({ message: 'Error getting user notes' })
    }

    async createNote(req: Request, res: Response): Promise<any> {
        const { user, url, content, title } = req.body

        if (!content) {
            return res.status(400).json({ message: 'Content field required' })
        }

        const newNote = {
            user_id: user.id,
            url: url || null,
            title: title || null,
            content: content,
        }

        const note = await notesService.createNote(newNote)

        if (note) {
            return res.status(201).json(note)
        }

        return res.status(500).json({ message: 'Error creating new note' })
    }

    async getNoteById(req: Request, res: Response): Promise<any> {
        const { user } = req.body
        const id = Number(req.params.id)

        const note = await notesService.getNoteById(id)

        if (note) {
            if (note.user_id === user.id) {
                return res.status(200).json(note)
            }
            return res.status(403).json({ message: 'Invalid credentials' })
        }

        return res.status(500).json({ message: 'Error getting note' })
    }

    async updateNote(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const { user, content, url, user_id, title } = req.body

        if (user_id !== user.id) {
            return res.status(403).json({ message: 'Invalid credentials' })
        }

        const note = {
            id: Number(id),
            content,
            url,
            title
        }

        const updated = await notesService.updateNote(note)

        if (updated) {
            return res.status(200).json(updated)
        }
    }

    async deleteNote(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const { user } = req.body

        const note = await notesService.getNoteById(Number(id))

        if (note) {
            if (note.user_id === user.id) {
                const deleted = await notesService.deleteNote(Number(id))

                if (deleted.message === 'success') {
                    return res.status(200).json({ message: 'Note deleted' })
                }

                return res.status(500).json({ message: 'Error deleting note' })
            }

            return res.status(403).json({ message: 'Invalid credentials' })
        }

        return res.status(204).json({ message: 'Note not found' })
    }
}

export default new NotesController()
