import { Request, Response } from 'express'
import authService from "../services/authService"

class AuthController {
    async register(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const { data, error } = await authService.register(email, password)

        if (error) {
            return res.status(500).json({ message: error.message })
        }

        return res.status(201).json(data)
    }
}

export default new AuthController()
