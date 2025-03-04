import bcrypt from 'bcryptjs'
import supabase from '../config/supabase/client'
import { User } from '../types/user'

class AuthController {
    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await supabase.from('users').insert({ email, password: hashedPassword }).select()
        return user
    }
}

export default new AuthController()
