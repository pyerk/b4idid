export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string | null
          event_date: string | null
          event_type: string
          id: string
          message: string
          status: string
          updated_at: string | null
        }
        Insert: {
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          event_date?: string | null
          event_type: string
          id?: string
          message: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          event_date?: string | null
          event_type?: string
          id?: string
          message?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      galleries: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          photo_id: string
          price: number
          print_size: string
          quantity: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          photo_id: string
          price: number
          print_size: string
          quantity?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          photo_id?: string
          price?: number
          print_size?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string
          id: string
          shipping_address: Json | null
          status: string
          stripe_checkout_session_id: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name: string
          id?: string
          shipping_address?: Json | null
          status?: string
          stripe_checkout_session_id?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          id?: string
          shipping_address?: Json | null
          status?: string
          stripe_checkout_session_id?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      photos: {
        Row: {
          created_at: string | null
          description: string | null
          gallery_id: string
          id: string
          image_url: string
          is_available_for_print: boolean | null
          order_index: number | null
          thumbnail_url: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          gallery_id: string
          id?: string
          image_url: string
          is_available_for_print?: boolean | null
          order_index?: number | null
          thumbnail_url?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          gallery_id?: string
          id?: string
          image_url?: string
          is_available_for_print?: boolean | null
          order_index?: number | null
          thumbnail_url?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      print_products: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          photo_id: string
          price: number
          size: string
          stripe_price_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          photo_id: string
          price: number
          size: string
          stripe_price_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          photo_id?: string
          price?: number
          size?: string
          stripe_price_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "print_products_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "photos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

