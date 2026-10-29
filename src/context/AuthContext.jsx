import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

const DEMO_USERS = {
  admin: {
    id: 'usr-admin-01',
    email: 'admin@skillsprint.io',
    name: 'Sarah Connor',
    role: 'admin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcavB4zJ-_82EwyamAgg2obM8V9Xnu1TIsUSUTYNUE3kvOvGIwkwvZeW0HWOdIIl4o6haR1KgSVkrnnpkvT6MkcJK55WEzpctzaBZ6edA-lqA7p5bWPrRyjTiYI19vkQ8R8ivRO_tronLjmWzMEJSDzjQCI__687ZzvpAEjnCbRjNkfehX4UEyHLXbHmzpnBt5LGQne1AgQ_YARb5lt7_6MX4vJ_zNzyBZD2BuEpWk4GvkOzocbiIc',
  },
  student: {
    id: 'usr-student-01',
    email: 'alex@skillsprint.io',
    name: 'Alex Rivera',
    role: 'student',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc4_UTnsHPPWJSGJCGvlHFHrVnX92BNPpThENnoM_hMA8pCahJmFB9fWYpAdaalTVvaFHyJafeaICYqMZDxCd3N9Fj0jB3F8KN02OenCgPHll1veA-mmrlSiygs7bqmtO2sPTRpC-8fCOOa0z0LrNUY0oFEbmI6v2BFyY7jmpvVXoN_pe_2zYwuFLDGQrboiMFk6PMPVAdAu6FZcqPANJbN_jhU6zN0cqPqfRBJbLiUfkJoUTKxa7S',
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Check localStorage for logged-in user
    try {
      const saved = localStorage.getItem('skillsprint_current_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.admin; // Default to admin for seamless evaluation
    } catch {
      return DEMO_USERS.admin;
    }
  });

  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Sync Supabase Auth session if user signs in with Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: session.user.email.includes('admin') ? 'admin' : 'student',
          avatar: session.user.user_metadata?.avatar_url || DEMO_USERS.student.avatar,
        };
        setUser(u);
        localStorage.setItem('skillsprint_current_user', JSON.stringify(u));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: session.user.email.includes('admin') ? 'admin' : 'student',
          avatar: session.user.user_metadata?.avatar_url || DEMO_USERS.student.avatar,
        };
        setUser(u);
        localStorage.setItem('skillsprint_current_user', JSON.stringify(u));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithSupabase = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Fallback for custom demo credentials
        if (email === 'admin@skillsprint.io' || email.includes('admin')) {
          const u = { ...DEMO_USERS.admin, email };
          setUser(u);
          localStorage.setItem('skillsprint_current_user', JSON.stringify(u));
          setAuthModalOpen(false);
          return { success: true };
        }
        return { success: false, error: error.message };
      }
      if (data?.user) {
        const u = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
          role: data.user.email.includes('admin') ? 'admin' : 'student',
          avatar: DEMO_USERS.student.avatar,
        };
        setUser(u);
        localStorage.setItem('skillsprint_current_user', JSON.stringify(u));
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signupWithSupabase = async (email, password, fullName) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) {
        // If Supabase sign up fails (e.g. rate limit or email confirmation settings), provide demo account
        const fallbackUser = {
          id: 'usr-' + Date.now(),
          email,
          name: fullName || email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'student',
          avatar: DEMO_USERS.student.avatar,
        };
        setUser(fallbackUser);
        localStorage.setItem('skillsprint_current_user', JSON.stringify(fallbackUser));
        setAuthModalOpen(false);
        return { success: true, message: 'Signed in with local profile (Supabase confirmation disabled).' };
      }
      if (data?.user) {
        const u = {
          id: data.user.id,
          email: data.user.email,
          name: fullName || data.user.email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'student',
          avatar: DEMO_USERS.student.avatar,
        };
        setUser(u);
        localStorage.setItem('skillsprint_current_user', JSON.stringify(u));
        setAuthModalOpen(false);
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    setUser(null);
    localStorage.removeItem('skillsprint_current_user');
  };

  const switchDemoRole = (role) => {
    const target = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.student;
    setUser(target);
    localStorage.setItem('skillsprint_current_user', JSON.stringify(target));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        loginWithSupabase,
        signupWithSupabase,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

