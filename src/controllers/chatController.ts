import { Request, Response } from 'express'
import chatService from '../services/chatService.js'
import { asyncHandler } from '../utils/errorHandler.js'
import { ValidationError } from '../types/errors.js'

class ChatController {
    createCompletion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { prompt, model, url } = req.body

        if (!prompt) {
            throw new ValidationError('Prompt is required', 'prompt');
        }

        const completion = await chatService.createCompletion(prompt, model, url);
        res.status(200).json(completion);
    });
}

export default new ChatController()
