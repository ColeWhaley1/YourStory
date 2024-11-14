
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ukkarufgugovsopasjud.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_API_KEY;

if(!supabaseKey){
    console.error("Supabase key not initialized!");
    throw new Error("Supabase key not initialized!");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;