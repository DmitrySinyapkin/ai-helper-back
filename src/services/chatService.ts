import { ChatCompletion } from "openai/resources"
import openai from "../config/openai/client"
import { MODELS } from "../constants/openrouter"

class ChatService {
    async createCompletion(prompt: string, model: string = MODELS[0], html: string): Promise<ChatCompletion> {
        const  completion = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: "user",
                    content: html ? `${prompt}: ${html}` : prompt
                }
            ]
        })

        return completion
    }
}

export default new ChatService()
