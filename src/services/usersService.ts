import supabase from '../config/supabase/client.js'

class UsersService {
    async getUserList() {
        try {
            const { data, error } = await supabase.from('users').select('id, email, created_at')

            if (error) {
                return undefined
            }
            
            return data
        } catch (error) {
            return undefined
        }
    }

    async getUserById(id: number) {
        try {
            const { data, error } = await supabase.from('users').select('id, email, created_at').eq('id', id).single()

            if (error) {
                return undefined
            }
            
            return data
        } catch (error) {
            return undefined
        }
    }
}

export default new UsersService()
