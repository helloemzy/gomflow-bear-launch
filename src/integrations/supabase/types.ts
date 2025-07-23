export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      countries: {
        Row: {
          code: string
          created_at: string
          currency_code: string
          currency_symbol: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          currency_code: string
          currency_symbol: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          currency_code?: string
          currency_symbol?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          delivered_at: string | null
          error_message: string | null
          external_message_id: string | null
          id: string
          message_type: Database["public"]["Enums"]["message_type"]
          platform: Database["public"]["Enums"]["platform_type"]
          sent_at: string | null
          status: Database["public"]["Enums"]["message_status"] | null
          submission_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          delivered_at?: string | null
          error_message?: string | null
          external_message_id?: string | null
          id?: string
          message_type: Database["public"]["Enums"]["message_type"]
          platform: Database["public"]["Enums"]["platform_type"]
          sent_at?: string | null
          status?: Database["public"]["Enums"]["message_status"] | null
          submission_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          delivered_at?: string | null
          error_message?: string | null
          external_message_id?: string | null
          id?: string
          message_type?: Database["public"]["Enums"]["message_type"]
          platform?: Database["public"]["Enums"]["platform_type"]
          sent_at?: string | null
          status?: Database["public"]["Enums"]["message_status"] | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          auto_close_on_deadline: boolean | null
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          deadline: string
          description: string | null
          id: string
          is_active: boolean | null
          max_orders: number | null
          min_orders: number | null
          payment_methods: Json
          price: number
          slug: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_close_on_deadline?: boolean | null
          created_at?: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          deadline: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_orders?: number | null
          min_orders?: number | null
          payment_methods?: Json
          price: number
          slug: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_close_on_deadline?: boolean | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"]
          deadline?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_orders?: number | null
          min_orders?: number | null
          payment_methods?: Json
          price?: number
          slug?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          gateway: Database["public"]["Enums"]["payment_gateway"]
          gateway_payment_id: string
          gateway_status: string
          id: string
          paid_at: string | null
          payment_method: string | null
          submission_id: string
          webhook_data: Json | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          gateway: Database["public"]["Enums"]["payment_gateway"]
          gateway_payment_id: string
          gateway_status: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          submission_id: string
          webhook_data?: Json | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"]
          gateway?: Database["public"]["Enums"]["payment_gateway"]
          gateway_payment_id?: string
          gateway_status?: string
          id?: string
          paid_at?: string | null
          payment_method?: string | null
          submission_id?: string
          webhook_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_connections: {
        Row: {
          config: Json
          connection_type: Database["public"]["Enums"]["connection_type"]
          created_at: string | null
          id: string
          is_active: boolean | null
          platform: Database["public"]["Enums"]["platform_type"]
          user_id: string
        }
        Insert: {
          config?: Json
          connection_type: Database["public"]["Enums"]["connection_type"]
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform: Database["public"]["Enums"]["platform_type"]
          user_id: string
        }
        Update: {
          config?: Json
          connection_type?: Database["public"]["Enums"]["connection_type"]
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          platform?: Database["public"]["Enums"]["platform_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "platform_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      platform_posts: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          platform: Database["public"]["Enums"]["platform_type"]
          post_id: string | null
          post_url: string | null
          status: Database["public"]["Enums"]["post_status"] | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          platform: Database["public"]["Enums"]["platform_type"]
          post_id?: string | null
          post_url?: string | null
          status?: Database["public"]["Enums"]["post_status"] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          platform?: Database["public"]["Enums"]["platform_type"]
          post_id?: string | null
          post_url?: string | null
          status?: Database["public"]["Enums"]["post_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_posts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          country: Database["public"]["Enums"]["country_code"]
          created_at: string | null
          discord_enabled: boolean | null
          email: string
          name: string
          phone: string
          plan: Database["public"]["Enums"]["user_plan"] | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          telegram_enabled: boolean | null
          timezone: string
          updated_at: string | null
          user_id: string
          username: string
          whatsapp_enabled: boolean | null
        }
        Insert: {
          country?: Database["public"]["Enums"]["country_code"]
          created_at?: string | null
          discord_enabled?: boolean | null
          email: string
          name: string
          phone: string
          plan?: Database["public"]["Enums"]["user_plan"] | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          telegram_enabled?: boolean | null
          timezone?: string
          updated_at?: string | null
          user_id: string
          username: string
          whatsapp_enabled?: boolean | null
        }
        Update: {
          country?: Database["public"]["Enums"]["country_code"]
          created_at?: string | null
          discord_enabled?: boolean | null
          email?: string
          name?: string
          phone?: string
          plan?: Database["public"]["Enums"]["user_plan"] | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          telegram_enabled?: boolean | null
          timezone?: string
          updated_at?: string | null
          user_id?: string
          username?: string
          whatsapp_enabled?: boolean | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          buyer_email: string | null
          buyer_name: string
          buyer_phone: string
          buyer_platform: Database["public"]["Enums"]["platform_type"] | null
          buyer_platform_id: string | null
          checkout_session_id: string | null
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          id: string
          last_reminder_sent: string | null
          order_id: string
          payment_gateway: Database["public"]["Enums"]["payment_gateway"] | null
          payment_intent_id: string | null
          payment_reference: string
          payment_url: string | null
          quantity: number
          reminder_count: number | null
          source_platform: string | null
          status: Database["public"]["Enums"]["submission_status"] | null
          total_amount: number
          updated_at: string | null
          utm_source: string | null
        }
        Insert: {
          buyer_email?: string | null
          buyer_name: string
          buyer_phone: string
          buyer_platform?: Database["public"]["Enums"]["platform_type"] | null
          buyer_platform_id?: string | null
          checkout_session_id?: string | null
          created_at?: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          id?: string
          last_reminder_sent?: string | null
          order_id: string
          payment_gateway?:
            | Database["public"]["Enums"]["payment_gateway"]
            | null
          payment_intent_id?: string | null
          payment_reference: string
          payment_url?: string | null
          quantity: number
          reminder_count?: number | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          total_amount: number
          updated_at?: string | null
          utm_source?: string | null
        }
        Update: {
          buyer_email?: string | null
          buyer_name?: string
          buyer_phone?: string
          buyer_platform?: Database["public"]["Enums"]["platform_type"] | null
          buyer_platform_id?: string | null
          checkout_session_id?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"]
          id?: string
          last_reminder_sent?: string | null
          order_id?: string
          payment_gateway?:
            | Database["public"]["Enums"]["payment_gateway"]
            | null
          payment_intent_id?: string | null
          payment_reference?: string
          payment_url?: string | null
          quantity?: number
          reminder_count?: number | null
          source_platform?: string | null
          status?: Database["public"]["Enums"]["submission_status"] | null
          total_amount?: number
          updated_at?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_payment_reference: {
        Args: { country_prefix: string }
        Returns: string
      }
      get_order_stats: {
        Args: { order_uuid: string }
        Returns: Json
      }
      get_user_dashboard_stats: {
        Args: { user_uuid: string }
        Returns: Json
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      connection_type: "group" | "channel" | "webhook"
      country_code: "PH" | "MY"
      currency_code: "PHP" | "MYR"
      message_status: "pending" | "sent" | "failed" | "delivered"
      message_type: "reminder" | "confirmation" | "query_response" | "custom"
      payment_gateway: "paymongo" | "billplz"
      platform_type: "whatsapp" | "telegram" | "discord" | "web"
      post_status: "posted" | "failed" | "deleted"
      submission_status: "pending" | "paid" | "failed" | "expired" | "cancelled"
      subscription_status: "active" | "inactive" | "cancelled"
      user_plan: "free" | "pro" | "gateway" | "business"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      connection_type: ["group", "channel", "webhook"],
      country_code: ["PH", "MY"],
      currency_code: ["PHP", "MYR"],
      message_status: ["pending", "sent", "failed", "delivered"],
      message_type: ["reminder", "confirmation", "query_response", "custom"],
      payment_gateway: ["paymongo", "billplz"],
      platform_type: ["whatsapp", "telegram", "discord", "web"],
      post_status: ["posted", "failed", "deleted"],
      submission_status: ["pending", "paid", "failed", "expired", "cancelled"],
      subscription_status: ["active", "inactive", "cancelled"],
      user_plan: ["free", "pro", "gateway", "business"],
    },
  },
} as const
