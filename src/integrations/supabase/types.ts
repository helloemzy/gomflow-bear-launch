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
      analytics_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_frameworks: {
        Row: {
          brand_archetype: string | null
          communication_style: Json | null
          content_pillars: Json | null
          created_at: string | null
          framework_type: string
          id: string
          personality_traits: Json | null
          target_audience: Json | null
          updated_at: string | null
          user_id: string
          value_proposition: string | null
        }
        Insert: {
          brand_archetype?: string | null
          communication_style?: Json | null
          content_pillars?: Json | null
          created_at?: string | null
          framework_type?: string
          id?: string
          personality_traits?: Json | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id: string
          value_proposition?: string | null
        }
        Update: {
          brand_archetype?: string | null
          communication_style?: Json | null
          content_pillars?: Json | null
          created_at?: string | null
          framework_type?: string
          id?: string
          personality_traits?: Json | null
          target_audience?: Json | null
          updated_at?: string | null
          user_id?: string
          value_proposition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_frameworks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      content_templates: {
        Row: {
          category: string
          content_types: string[] | null
          created_at: string | null
          id: string
          industry_tags: string[] | null
          is_active: boolean | null
          name: string
          prompt_template: string
          structure: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content_types?: string[] | null
          created_at?: string | null
          id?: string
          industry_tags?: string[] | null
          is_active?: boolean | null
          name: string
          prompt_template: string
          structure: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content_types?: string[] | null
          created_at?: string | null
          id?: string
          industry_tags?: string[] | null
          is_active?: boolean | null
          name?: string
          prompt_template?: string
          structure?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      generated_content: {
        Row: {
          content: string
          content_type: string
          created_at: string | null
          engagement_metrics: Json | null
          id: string
          status: string | null
          template_used: string | null
          topic: string
          updated_at: string | null
          user_id: string
          voice_signature_used: Json | null
        }
        Insert: {
          content: string
          content_type: string
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          status?: string | null
          template_used?: string | null
          topic: string
          updated_at?: string | null
          user_id: string
          voice_signature_used?: Json | null
        }
        Update: {
          content?: string
          content_type?: string
          created_at?: string | null
          engagement_metrics?: Json | null
          id?: string
          status?: string | null
          template_used?: string | null
          topic?: string
          updated_at?: string | null
          user_id?: string
          voice_signature_used?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_posts: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          body_content: string
          content_type: string
          created_at: string | null
          hashtags: string[] | null
          headline: string
          id: string
          news_article_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          body_content: string
          content_type: string
          created_at?: string | null
          hashtags?: string[] | null
          headline: string
          id?: string
          news_article_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          body_content?: string
          content_type?: string
          created_at?: string | null
          hashtags?: string[] | null
          headline?: string
          id?: string
          news_article_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_posts_news_article_id_fkey"
            columns: ["news_article_id"]
            isOneToOne: false
            referencedRelation: "news_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      linkedin_connections: {
        Row: {
          access_token: string
          created_at: string | null
          id: string
          is_active: boolean | null
          linkedin_id: string
          refresh_token: string | null
          token_expires_at: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          linkedin_id: string
          refresh_token?: string | null
          token_expires_at: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          linkedin_id?: string
          refresh_token?: string | null
          token_expires_at?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "linkedin_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          article_url: string
          content: string | null
          created_at: string | null
          id: string
          processed: boolean | null
          published_at: string | null
          relevance_score: number | null
          rss_feed_id: string
          summary: string | null
          title: string
        }
        Insert: {
          article_url: string
          content?: string | null
          created_at?: string | null
          id?: string
          processed?: boolean | null
          published_at?: string | null
          relevance_score?: number | null
          rss_feed_id: string
          summary?: string | null
          title: string
        }
        Update: {
          article_url?: string
          content?: string | null
          created_at?: string | null
          id?: string
          processed?: boolean | null
          published_at?: string | null
          relevance_score?: number | null
          rss_feed_id?: string
          summary?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_articles_rss_feed_id_fkey"
            columns: ["rss_feed_id"]
            isOneToOne: false
            referencedRelation: "rss_feeds"
            referencedColumns: ["id"]
          },
        ]
      }
      phone_otp_logs: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          otp_code: string
          phone_number: string
          used: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          otp_code: string
          phone_number: string
          used?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          otp_code?: string
          phone_number?: string
          used?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phone_otp_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posting_schedule: {
        Row: {
          created_at: string | null
          generated_post_id: string
          id: string
          platform: string | null
          posted_at: string | null
          scheduled_time: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          generated_post_id: string
          id?: string
          platform?: string | null
          posted_at?: string | null
          scheduled_time: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          generated_post_id?: string
          id?: string
          platform?: string | null
          posted_at?: string | null
          scheduled_time?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posting_schedule_generated_post_id_fkey"
            columns: ["generated_post_id"]
            isOneToOne: false
            referencedRelation: "generated_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posting_schedule_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posting_tiers: {
        Row: {
          display_name: string
          features: Json
          max_rss_feeds: number
          posts_per_week: number
          price_monthly: number
          price_yearly: number
          tier_name: string
        }
        Insert: {
          display_name: string
          features: Json
          max_rss_feeds: number
          posts_per_week: number
          price_monthly: number
          price_yearly: number
          tier_name: string
        }
        Update: {
          display_name?: string
          features?: Json
          max_rss_feeds?: number
          posts_per_week?: number
          price_monthly?: number
          price_yearly?: number
          tier_name?: string
        }
        Relationships: []
      }
      rss_feeds: {
        Row: {
          created_at: string | null
          feed_name: string
          feed_url: string
          id: string
          is_active: boolean | null
          keywords: string[] | null
          last_fetched_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          feed_name: string
          feed_url: string
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          last_fetched_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          feed_name?: string
          feed_url?: string
          id?: string
          is_active?: boolean | null
          keywords?: string[] | null
          last_fetched_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rss_feeds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_history: {
        Row: {
          canceled_at: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          status: string
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: string
          trial_ends_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier: string
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_tier_fkey"
            columns: ["tier"]
            isOneToOne: false
            referencedRelation: "posting_tiers"
            referencedColumns: ["tier_name"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          analytics_data: Json | null
          created_at: string | null
          id: string
          last_login: string | null
          last_voice_analysis: string | null
          preferences: Json | null
          total_content_generated: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analytics_data?: Json | null
          created_at?: string | null
          id?: string
          last_login?: string | null
          last_voice_analysis?: string | null
          preferences?: Json | null
          total_content_generated?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analytics_data?: Json | null
          created_at?: string | null
          id?: string
          last_login?: string | null
          last_voice_analysis?: string | null
          preferences?: Json | null
          total_content_generated?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_info: string | null
          expires_at: string
          id: string
          refresh_token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          device_info?: string | null
          expires_at: string
          id: string
          refresh_token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          device_info?: string | null
          expires_at?: string
          id?: string
          refresh_token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          brand_framework: Json | null
          company: string | null
          created_at: string | null
          email: string
          email_verification_expires: string | null
          email_verification_token: string | null
          email_verified: boolean | null
          first_name: string
          id: string
          industry: string | null
          is_verified: boolean | null
          last_name: string
          linkedin_url: string | null
          password_hash: string
          phone_number: string | null
          phone_verified: boolean | null
          posting_tier: string | null
          reset_token_expires: string | null
          reset_token_hash: string | null
          role: string | null
          status: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string | null
          verification_token: string | null
        }
        Insert: {
          brand_framework?: Json | null
          company?: string | null
          created_at?: string | null
          email: string
          email_verification_expires?: string | null
          email_verification_token?: string | null
          email_verified?: boolean | null
          first_name: string
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          last_name: string
          linkedin_url?: string | null
          password_hash: string
          phone_number?: string | null
          phone_verified?: boolean | null
          posting_tier?: string | null
          reset_token_expires?: string | null
          reset_token_hash?: string | null
          role?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          verification_token?: string | null
        }
        Update: {
          brand_framework?: Json | null
          company?: string | null
          created_at?: string | null
          email?: string
          email_verification_expires?: string | null
          email_verification_token?: string | null
          email_verified?: boolean | null
          first_name?: string
          id?: string
          industry?: string | null
          is_verified?: boolean | null
          last_name?: string
          linkedin_url?: string | null
          password_hash?: string
          phone_number?: string | null
          phone_verified?: boolean | null
          posting_tier?: string | null
          reset_token_expires?: string | null
          reset_token_hash?: string | null
          role?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string | null
          verification_token?: string | null
        }
        Relationships: []
      }
      voice_transcriptions: {
        Row: {
          audio_duration: number | null
          characteristics: Json | null
          created_at: string | null
          id: string
          transcript: string
          updated_at: string | null
          user_id: string
          voice_signature: Json | null
        }
        Insert: {
          audio_duration?: number | null
          characteristics?: Json | null
          created_at?: string | null
          id?: string
          transcript: string
          updated_at?: string | null
          user_id: string
          voice_signature?: Json | null
        }
        Update: {
          audio_duration?: number | null
          characteristics?: Json | null
          created_at?: string | null
          id?: string
          transcript?: string
          updated_at?: string | null
          user_id?: string
          voice_signature?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_transcriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
    Enums: {},
  },
} as const
