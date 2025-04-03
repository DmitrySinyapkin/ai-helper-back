import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).send({ message: 'Authorization required' })

    try {
        const decoded = verifyAccessToken(token)

        if (!decoded) return res.status(403).send({ message: 'Invalid access token' })

        req.body.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Invalid credentials' })
    }
}
