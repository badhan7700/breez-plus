// The shape of one row in the `profiles` table (see supabase/migrations).
export type Profile = {
  id: string;
  email: string;
  full_name: string;
  department: string;
  coins: number;
  created_at: string;
  updated_at: string;
};
