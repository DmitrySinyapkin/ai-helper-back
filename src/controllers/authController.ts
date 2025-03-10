import { Request, Response } from 'express'
import authService from "../services/authService"

class AuthController {
    async register(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const { data, error } = await authService.register(email, password)

        if (error) {
            return res.status(500).json({ message: error.message })
        }

        return res.status(201).json(data)
    }

    async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const token = await authService.login(email, password)

        if (token?.access && token?.refresh) {
            return res.json(token)
        } else {
            return res.status(403).json({ message: 'Invalid credentials' })
        }
    }

    refreshToken(req: Request, res: Response): any {
        const { refresh } = req.body

        if (!refresh) {
            return res.status(401).json({ message: 'No refresh token provided' })
        }

        const token = authService.refreshToken(refresh)

        if (token?.access && token.refresh) {
            return res.json(token)
        } else {
            return res.status(403).json({ message: 'Invalid refresh token' })
        }
    }
}

export default new AuthController()
