import { Request, Response } from 'express'
import chatService from '../services/chatService'

class ChatContriller {
    async createCompletion(req: Request, res: Response): Promise<any> {
        const { prompt, model, url } = req.body

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt required' })
        }

        const completion = await chatService.createCompletion(prompt, model, url)

        if (completion) {
            return res.status(200).json(completion)
        } else {
            return res.status(400).json({ message: 'Error creating completion' })
        }
    }
}

export default new ChatContriller()
