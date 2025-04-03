import supabase from '../config/supabase/client.js'
import { Note } from '../types/notes.js'

class NotesService {
    async getNoteList(user_id: number) {
        try {
            const { data, error } = await supabase.from('notes').select('*').eq('user_id', user_id)

            if (error) {
                return undefined
            }
            
            return data
        } catch (error) {
            return undefined
        }
    }

    async createNote(note: Pick<Note, 'user_id' | 'url' | 'content' | 'title'>) {
        try {
            const { data, error } = await supabase.from('notes').insert(note).select().single()

            if (error) {
                return undefined
            }

            return data
        } catch (error) {
            return undefined
        }
    }

    async getNoteById(id: number) {
        try {
            const { data, error } = await supabase.from('notes').select('*').eq('id', id).single()

            if (error) {
                return undefined
            }
            
            return data
        } catch (error) {
            return undefined
        }
    }

    async updateNote(note: Pick<Note, 'id' | 'url' | 'content' | 'title'>) {
        try {
            const { data, error } = await supabase.from('notes').update(note).eq('id', note.id).select().single()

            if (error) {
                return undefined
            }
            
            return data
        } catch (error) {
            return undefined
        }
    }

    async deleteNote(id: number): Promise<{ message: 'success' | 'error' }> {
        try {
            const { error } = await supabase.from('notes').delete().eq('id', id)

            if (error) {
                return { message: 'error' }
            }

            return { message: 'success' }
        } catch (error) {
            return { message: 'error' }
        }
    }
}

export default new NotesService()
