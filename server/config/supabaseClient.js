const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url') {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('⚠️  Supabase URL or Key is missing. Supabase integration will be skipped.');
}

module.exports = supabase;
