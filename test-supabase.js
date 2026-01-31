const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic manual env parser
const envPath = path.join(__dirname, '.env');
const env = {};
if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });
}

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log('Checking tables for project:', supabaseUrl);

    const { data: formSubmissions, error: formError } = await supabase
        .from('form_submissions')
        .select('id')
        .limit(1);

    if (formError) {
        console.log('form_submissions table error:', formError.message);
    } else {
        console.log('form_submissions table exists!');
    }

    const { data: chatLeads, error: chatError } = await supabase
        .from('chat_leads')
        .select('id')
        .limit(1);

    if (chatError) {
        console.log('chat_leads table error:', chatError.message);
    } else {
        console.log('chat_leads table exists!');
    }
}

checkTables();
