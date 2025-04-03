import { ChatCompletion } from "openai/resources"
import openai from "../config/openai/client.js"
import { MODELS, OPENROUTER_BASE_URL } from "../constants/openrouter.js"

export const getChatCompletion = async (prompt: string, model: string = MODELS[0], html?: string): Promise<Partial<ChatCompletion> | null> => {
    try {
        openai.baseURL = getBaseURL(model)

        const  completion = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: "user",
                    content: html ? `${prompt}: ${html}` : prompt
                }
            ]
        })
    
        if (completion) {
            return completion
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

const getBaseURL = (model: string) => {
    return model.includes('google') && process.env.OPENROUTER_PROXY_BASE_URL
        ? process.env.OPENROUTER_PROXY_BASE_URL
        : OPENROUTER_BASE_URL
}
