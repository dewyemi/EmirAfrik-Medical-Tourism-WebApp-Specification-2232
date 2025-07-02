import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database schema setup
export const initializeDatabase = async () => {
  try {
    // Enable RLS on all tables
    const tables = [
      'user_profiles',
      'workflow_steps', 
      'patients',
      'inquiries',
      'packages',
      'payments',
      'aftercare_reports',
      'messages'
    ];

    for (const table of tables) {
      await supabase.rpc('enable_rls', { table_name: table });
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Auth helpers
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database operations
export const createUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      id: userId,
      ...profileData
    })
    .select()
    .single();
  
  return { data, error };
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const getWorkflowSteps = async () => {
  const { data, error } = await supabase
    .from('workflow_steps')
    .select('*')
    .eq('is_active', true)
    .order('step_number');
  
  return { data, error };
};

export const getPackages = async () => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createInquiry = async (inquiryData) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiryData)
    .select()
    .single();
  
  return { data, error };
};

export const getPatientData = async (userId) => {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      user_profiles(full_name, email),
      assigned_employee:user_profiles!assigned_employee(full_name)
    `)
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

export const updatePatientStep = async (patientId, newStep) => {
  const { data, error } = await supabase
    .from('patients')
    .update({ current_step: newStep })
    .eq('id', patientId)
    .select()
    .single();
  
  return { data, error };
};

export const getMessages = async (patientId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at');
  
  return { data, error };
};

export const createMessage = async (messageData) => {
  const { data, error } = await supabase
    .from('messages')
    .insert(messageData)
    .select()
    .single();
  
  return { data, error };
};

export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);
  
  return { data, error };
};

export const getFileUrl = (bucket, path) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};