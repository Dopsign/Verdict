export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SubscriptionTier = "free" | "starter" | "pro" | null;

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          trial_start_date: string | null;
          daily_usage_count: number;
          daily_usage_reset_at: string | null;
          total_usage: number;
          subscription_status: SubscriptionTier;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          trial_start_date?: string | null;
          daily_usage_count?: number;
          daily_usage_reset_at?: string | null;
          total_usage?: number;
          subscription_status?: SubscriptionTier;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          trial_start_date?: string | null;
          daily_usage_count?: number;
          daily_usage_reset_at?: string | null;
          total_usage?: number;
          subscription_status?: SubscriptionTier;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      analyses: {
        Row: {
          id: string;
          user_id: string;
          input_text: string;
          output_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          input_text: string;
          output_json: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          input_text?: string;
          output_json?: Json;
          created_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Analysis = Database["public"]["Tables"]["analyses"]["Row"];
