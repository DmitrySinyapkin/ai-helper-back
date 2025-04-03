import jwt, { SignOptions } from 'jsonwebtoken'
import { User } from '../types/user.js'

const JWT_SECRET = process.env.JWT_SECRET!
const REFRESH_SECRET = process.env.REFRESH_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ? Number(process.env.JWT_EXPIRES_IN) : 3600
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN ? Number(process.env.REFRESH_EXPIRES_IN) : 604800

const generateToken = (user: Pick<User, 'id' | 'email'>, secret: string, expiresIn: number) => {
  const options: SignOptions = { expiresIn }
  return jwt.sign({ id: user.id, email: user.email }, secret, options)
}

export const generateAccessToken = (user: Pick<User, 'id' | 'email'>) => generateToken(user, JWT_SECRET, JWT_EXPIRES_IN) 

export const generateRefreshToken = (user: Pick<User, 'id' | 'email'>) => generateToken(user, REFRESH_SECRET, REFRESH_EXPIRES_IN)

const verifyToken = (token: string, secret: string) => {
    try {
        return jwt.verify(token, secret)
      } catch (err) {
        return null
      }
}

export const verifyAccessToken = (token: string) => verifyToken(token, JWT_SECRET)

export const verifyRefreshToken = (token: string) => verifyToken(token, REFRESH_SECRET)
