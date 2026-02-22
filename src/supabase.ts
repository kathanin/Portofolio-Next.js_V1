import { createClient } from "@supabase/supabase-js";

// [Perubahan 1: Mendefinisikan Interface / Skema Database Supabase]
// Ini akan membuat TypeScript mengenali struktur tabel Anda secara otomatis
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string | number;
          Title: string;
          Description: string;
          Img: string;
          Link: string;
          Github: string;
          TechStack: string[];
          Features: string[];
        };
      };
      certificates: {
        Row: {
          id: string | number;
          Img: string;
        };
      };
      portfolio_comments: {
        Row: {
          id: string | number;
          content: string;
          user_name: string;
          profile_image: string | null;
          is_pinned: boolean;
          created_at: string;
        };
        Insert: {
          content: string;
          user_name: string;
          profile_image?: string | null;
          is_pinned?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

// [Perubahan 2: Perubahan Pemanggilan Variabel Environment Next.js]
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL:", supabaseUrl);
  console.error("Supabase Anon Key:", supabaseKey);
  throw new Error(
    "Supabase URL and Anon Key are required. Check your .env.local file and ensure they are prefixed with NEXT_PUBLIC_.",
  );
}

// [Perubahan 3: Menyisipkan tipe <Database> ke dalam createClient]
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
