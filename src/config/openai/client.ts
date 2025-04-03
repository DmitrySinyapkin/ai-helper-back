import OpenAI from "openai"
import { OPENROUTER_BASE_URL } from "../../constants/openrouter"

const openai = new OpenAI({
    //baseURL: OPENROUTER_BASE_URL,
    apiKey: process.env.OPENROUTER_API_KEY
})

export default openai
