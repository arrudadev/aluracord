import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
