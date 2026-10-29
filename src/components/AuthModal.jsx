import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, loginWithSupabase, signupWithSupabase, switchDemoRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (authMode === 'signup') {
      const res = await signupWithSupabase(email, password, fullName);
      if (!res?.success) {
        setErrorMessage(res?.error || 'Registration failed');
      }
    } else {
      const res = await loginWithSupabase(email, password);
      if (!res?.success) {
        setErrorMessage(res?.error || 'Invalid credentials');
      }
    }
    setLoading(false);
  };

  const handleQuickDemo = (role) => {
    switchDemoRole(role);
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-surface-container text-on-surface p-space-xl shadow-2xl border border-surface-container-high">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-outline hover:text-on-surface p-1"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2 mb-space-md">
          <img
            alt="SkillSprint Logo"
            className="h-7 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VCSU_rAjl3gK4o4UvIX60uquLFF_jTIQdjFtZqpoBByyaddBAUfwtSVaakFSk9-ErfuxthMfUjDBfQt9wYtaxmLPy67rODxAXeBvPDX2j7wjVlXKTvnOcDDmGfO276LKjylsNCGLucXFmcU6qW_25oGXN6mI8yw9BdNwyCw1VeOD2spRiJBxHWI2LFQlroXH_nezCeDa_m4QeyhIcse-JoqrDT9whHOt48_wHXCtHlrbBBZmA3tqjyIOU"
          />
          <span className="font-headline-sm text-headline-sm text-lg font-bold">SkillSprint Auth</span>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-surface-container-low p-1 mb-space-md border border-surface-container-highest">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
              authMode === 'signin'
                ? 'bg-surface-container-high text-on-surface shadow-sm'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
              authMode === 'signup'
                ? 'bg-surface-container-high text-on-surface shadow-sm'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-error-container/30 border border-error/30 text-error text-xs mb-space-md">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm text-xs">
          {authMode === 'signup' && (
            <div>
              <label className="block text-outline font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none focus:border-secondary"
              />
            </div>
          )}

          <div>
            <label className="block text-outline font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@skillsprint.io"
              className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="block text-outline font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none focus:border-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-semibold hover:bg-primary transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating with Supabase...' : authMode === 'signin' ? 'Sign In to Sprint' : 'Create Sprint Account'}
          </button>
        </form>

        {/* Quick Demo Access */}
        <div className="mt-space-lg pt-space-md border-t border-surface-container-high/60 text-center">
          <span className="text-[11px] text-outline uppercase tracking-wider block mb-2 font-semibold">
            Instant Demo Profiles
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="px-2.5 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-secondary text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>Demo Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="px-2.5 py-1.5 rounded-lg bg-tertiary/10 hover:bg-tertiary/20 border border-tertiary/30 text-tertiary text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">school</span>
              <span>Demo Student</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

