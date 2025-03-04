import jwt from 'jsonwebtoken'
import { User } from '../types/user'

const JWT_SECRET = process.env.JWT_SECRET!
const REFRESH_SECRET = process.env.REFRESH_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN! || '1h'
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN! || '7d'

export const generateAccessToken = (user: Pick<User, 'id' | 'email'>) =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

export const generateRefreshToken = (user: Pick<User, 'id' | 'email'>) =>
  jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN })

const verifyToken = (token: string, secret: string) => {
    try {
        return jwt.verify(token, secret)
      } catch (err) {
        return null
      }
}

export const verifyAccessToken = (token: string) => verifyToken(token, JWT_SECRET)

export const verifyRefreshToken = (token: string) => verifyToken(token, REFRESH_SECRET)
