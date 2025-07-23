import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export interface AuthUser extends User {
  full_name?: string;
  country_id?: string;
  whatsapp_number?: string;
  total_orders_completed?: number;
  total_earnings?: number;
  rating?: number;
  member_since?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          // Fetch additional user data from our profiles table
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setUser({ ...session.user, ...userData });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data: userData }) => {
            setUser({ ...session.user, ...userData });
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, userData: {
    full_name: string;
    country_id: string;
    whatsapp_number?: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: userData
      }
    });

    if (data.user && !error) {
      // Create user profile in our profiles table
      await supabase.from('profiles').insert({
        user_id: data.user.id,
        email: data.user.email,
        name: userData.full_name,
        username: userData.full_name.toLowerCase().replace(/\s+/g, ''),
        phone: userData.whatsapp_number || '',
        country: 'PH' // Default to Philippines, will be updated from country_id later
      });
    }

    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  };
}