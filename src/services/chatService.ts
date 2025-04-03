import { MODELS } from "../constants/openrouter"
import { getChatCompletion } from "../utils/openai"
import { getMinifiedHtmlFromUrl } from "../utils/getHTML"

class ChatService {
    async createCompletion(prompt: string, model: string = MODELS[0], url?: string): Promise<any> {
        let html: string | undefined = undefined

        if (url) {
            const content = await getMinifiedHtmlFromUrl(url)

            if (content) {
                html = content
            }
        }

        const  completion = await getChatCompletion(prompt, model, html)

        if (completion) {
            return completion
        }

        return null
    }
}

export default new ChatService()
