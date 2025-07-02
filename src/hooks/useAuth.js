import { useState, useEffect } from 'react';
import { supabase, getCurrentUser, getUserProfile } from '@/lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user: currentUser, error: userError } = await getCurrentUser();
        
        if (userError) {
          throw userError;
        }

        if (currentUser) {
          setUser(currentUser);
          
          // Get user profile
          const { data: profileData, error: profileError } = await getUserProfile(currentUser.id);
          
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          setProfile(profileData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          
          try {
            const { data: profileData, error: profileError } = await getUserProfile(session.user.id);
            
            if (profileError && profileError.code !== 'PGRST116') {
              throw profileError;
            }
            
            setProfile(profileData);
          } catch (err) {
            setError(err.message);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  return {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
    isPatient: profile?.role === 'patient',
    isEmployee: profile?.role === 'employee',
    isAdmin: profile?.role === 'admin',
    updateProfile
  };
};