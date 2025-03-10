import bcrypt from 'bcryptjs'
import supabase from '../config/supabase/client'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt'
import { User, Token, JwtPayload } from '../types/user'

class AuthService {
    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await supabase.from('users').insert({ email, password: hashedPassword }).select().single()
        return user
    }

    async login(email: string, password: string): Promise<Token | undefined>  {
        const { data, error } = await supabase.from('users').select('*').eq('email', email).single()

        if (!data || error) return undefined

        const user = data as User

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return undefined
        }

        const access = generateAccessToken({ id: user.id, email: user.email })
        const refresh = generateRefreshToken({ id: user.id, email: user.email })

        return {
            access,
            refresh
        }
    }

    refreshToken(refreshToken: string): Token | undefined {
        const user = verifyRefreshToken(refreshToken) as JwtPayload
        
        if (user?.id && user?.email) {
            const newAccessToken = generateAccessToken({ id: user.id, email: user.email })
            return { 
                access: newAccessToken,
                refresh: refreshToken
            }
        } else {
            return undefined
        }
    }
}

export default new AuthService()
