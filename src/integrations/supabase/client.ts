
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yggfsfjwnrirlwhduchb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2ZzZmp3bnJpcmx3aGR1Y2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5NDc3MzgsImV4cCI6MjA2MDUyMzczOH0.E7thBHAOSjB-gERSgwg7yeZbMq-8cwXWewmBcJ_OeyA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
