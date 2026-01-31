import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Form submissions will only use Web3Forms.');
}

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Types for database tables
export interface FormSubmission {
    id?: string;
    name: string;
    email: string;
    message?: string;
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
    created_at?: string;
}

export interface ChatLead {
    id?: string;
    name?: string;
    email?: string;
    linkedin_url?: string;
    company?: string;
    role?: string;
    conversation_summary?: string;
    lead_score?: number;
    utm_source?: string;
    referrer?: string;
    created_at?: string;
}

// Utility functions
export const saveFormSubmission = async (data: FormSubmission): Promise<boolean> => {
    if (!supabase) return false;

    const urlParams = new URLSearchParams(window.location.search);

    const { error } = await supabase.from('form_submissions').insert({
        ...data,
        utm_source: urlParams.get('utm_source') || undefined,
        utm_medium: urlParams.get('utm_medium') || undefined,
        utm_campaign: urlParams.get('utm_campaign') || undefined,
        referrer: document.referrer || undefined,
    });

    if (error) {
        console.error('Supabase insert error:', error);
        return false;
    }

    return true;
};

export const saveChatLead = async (data: ChatLead): Promise<boolean> => {
    if (!supabase) return false;

    const urlParams = new URLSearchParams(window.location.search);

    const { error } = await supabase.from('chat_leads').insert({
        ...data,
        utm_source: urlParams.get('utm_source') || undefined,
        referrer: document.referrer || undefined,
    });

    if (error) {
        console.error('Supabase chat lead insert error:', error);
        return false;
    }

    return true;
};

export const getRecentSubmissions = async (limit: number = 5): Promise<Pick<FormSubmission, 'name' | 'created_at'>[]> => {
    if (!supabase) return [];

    const { data, error } = await supabase
        .from('form_submissions')
        .select('name, created_at')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Supabase fetch error:', error);
        return [];
    }

    return data || [];
};
