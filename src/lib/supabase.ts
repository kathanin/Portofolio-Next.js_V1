import { createClient } from "@supabase/supabase-js";

// 1. Ini adalah cara profesional: Mendefinisikan Skema Tabel Database
export type Database = {
  public: {
    Tables: {
      portfolio_comments: {
        Row: {
          id: number;
          created_at: string;
          content: string;
          user_name: string;
          profile_image: string | null;
          is_pinned: boolean;
        };
        Insert: {
          id?: number; // Optional karena Supabase membuatkannya otomatis
          created_at?: string; // Optional karena otomatis diisi waktu saat ini
          content: string;
          user_name: string;
          profile_image?: string | null;
          is_pinned?: boolean;
        };
        Update: {
          id?: number;
          created_at?: string;
          content?: string;
          user_name?: string;
          profile_image?: string | null;
          is_pinned?: boolean;
        };
      };
      // Jika nanti Anda ingin menambahkan tabel projects/certificates, bisa diletakkan di bawah sini
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. Terapkan tipe <Database> tersebut ke dalam createClient
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
