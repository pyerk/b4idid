export type Database = {
  public: {
    Tables: {
      galleries: {
        Row: {
          id: string
          title: string
          description: string | null
          cover_image_url: string | null
          date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          cover_image_url?: string | null
          date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          cover_image_url?: string | null
          date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      photos: {
        Row: {
          id: string
          gallery_id: string
          image_url: string
          thumbnail_url: string | null
          title: string | null
          description: string | null
          order_index: number
          is_available_for_print: boolean
          created_at: string
        }
        Insert: {
          id?: string
          gallery_id: string
          image_url: string
          thumbnail_url?: string | null
          title?: string | null
          description?: string | null
          order_index?: number
          is_available_for_print?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          gallery_id?: string
          image_url?: string
          thumbnail_url?: string | null
          title?: string | null
          description?: string | null
          order_index?: number
          is_available_for_print?: boolean
          created_at?: string
        }
      }
    }
  }
}

