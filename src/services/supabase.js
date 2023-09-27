import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pdselwjhhojvthszriij.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkc2Vsd2poaG9qdnRoc3pyaWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4MDk2MjMsImV4cCI6MjAxMTM4NTYyM30.rus6j1GTvuCUOKhhL2ADnFARQMOOJ55rhxA9kWQMAKM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase