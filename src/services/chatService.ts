import { MODELS } from "../constants/openrouter.js"
import { getChatCompletion } from "../utils/openai.js"
import { getMinifiedHtmlFromUrl } from "../utils/getHTML.js"
import { CustomError, ValidationError } from "../types/errors.js"

class ChatService {
    async createCompletion(prompt: string, model: string = MODELS[0], url?: string): Promise<any> {
        // Validate inputs
        if (!prompt || prompt.trim().length === 0) {
            throw new ValidationError('Prompt cannot be empty', 'prompt');
        }

        if (prompt.length > 10000) {
            throw new ValidationError('Prompt too long (max 10000 characters)', 'prompt');
        }

        if (model && !MODELS.includes(model)) {
            throw new ValidationError(`Invalid model. Available models: ${MODELS.join(', ')}`, 'model');
        }

        if (url) {
            try {
                new URL(url); // Validate URL format
            } catch {
                throw new ValidationError('Invalid URL format', 'url');
            }
        }

        let html: string | undefined = undefined;

        // Fetch HTML if URL provided
        if (url) {
            try {
                html = await getMinifiedHtmlFromUrl(url);
            } catch (error: any) {
                if (error instanceof CustomError) {
                    throw error;
                }
                throw new CustomError(
                    `Failed to fetch content from URL: ${error.message}`,
                    400,
                    'URL_PROCESSING_ERROR'
                );
            }
        }

        // Get completion from OpenRouter
        try {
            const completion = await getChatCompletion(prompt, model, html);
            return completion;
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(
                `Failed to get completion: ${error.message}`,
                500,
                'COMPLETION_ERROR'
            );
        }
    }
}

export default new ChatService()
