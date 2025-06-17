import { ChatCompletion } from "openai/resources"
import openai from "../config/openai/client.js"
import { MODELS, OPENROUTER_BASE_URL } from "../constants/openrouter.js"
import { handleOpenRouterError } from "./errorHandler.js"

export const getChatCompletion = async (prompt: string, model: string = MODELS[0], html?: string): Promise<Partial<ChatCompletion>> => {
    try {
        openai.baseURL = getBaseURL(model)

        const completion = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: "user",
                    content: html ? `${prompt}: ${html}` : prompt
                }
            ]
        })
    
        if (!completion) {
            throw new Error('No completion received from OpenRouter API');
        }

        return completion;
    } catch (error: any) {
        console.log(error);
        // Re-throw the error so it can be handled by the service layer
        throw handleOpenRouterError(error);
    }
}

const getBaseURL = (model: string) => {
    return model.includes('google') && process.env.OPENROUTER_PROXY_BASE_URL
        ? process.env.OPENROUTER_PROXY_BASE_URL
        : OPENROUTER_BASE_URL
}
