import React, { useState } from 'react';
import { subscribeNewsletter } from '../lib/api';

export default function Footer({ onNavigate, onOpenAdvisor }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    await subscribeNewsletter(email);
    setLoading(false);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant border-t border-surface-container-high/40">
      <div className="w-full px-margin py-space-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-xl mb-space-xl">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => onNavigate('browse')}>
              <img
                alt="SkillSprint Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VCSU_rAjl3gK4o4UvIX60uquLFF_jTIQdjFtZqpoBByyaddBAUfwtSVaakFSk9-ErfuxthMfUjDBfQt9wYtaxmLPy67rODxAXeBvPDX2j7wjVlXKTvnOcDDmGfO276LKjylsNCGLucXFmcU6qW_25oGXN6mI8yw9BdNwyCw1VeOD2spRiJBxHWI2LFQlroXH_nezCeDa_m4QeyhIcse-JoqrDT9whHOt48_wHXCtHlrbBBZmA3tqjyIOU"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                SkillSprint
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-outline max-w-sm">
              High-velocity accelerated education for engineers and digital professionals. Master mission-critical skills via cohort sprints and real-world execution.
            </p>

            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-semibold">
                Weekly Skill Drops
              </span>
              <form onSubmit={handleSubscribe} className="flex items-center max-w-sm bg-surface-container rounded-lg p-space-xs border border-surface-container-highest/60 focus-within:border-secondary">
                <input
                  className="bg-transparent px-space-sm py-space-xs w-full text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none"
                  placeholder="developer@skillsprint.io"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading || subscribed}
                />
                <button
                  className="px-space-md py-space-xs rounded bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-fixed transition-colors font-semibold shrink-0 disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {subscribed ? 'Joined!' : loading ? '...' : 'Join'}
                </button>
              </form>
              {subscribed && (
                <span className="text-xs text-tertiary">✓ Subscribed to weekly sprint drops!</span>
              )}
            </div>
          </div>

          {/* Sprint Categories */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Sprint Categories</span>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Full-Stack Architecture</button>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">AI &amp; Model Engineering</button>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Cloud Native &amp; DevOps</button>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Systems Programming</button>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Design Systems &amp; Tokens</button>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Certifications</span>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Micro-Credentials</button>
            <button onClick={() => onNavigate('my-sprints')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Sprint Cohort Honors</button>
            <button onClick={() => onNavigate('for-teams')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Enterprise Accreditation</button>
            <button onClick={() => alert('Credentials verification is cryptographically signed and stored in Supabase & GitHub commits.')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Verify Credentials</button>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Platform</span>
            <button onClick={() => onNavigate('learning-paths')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Skill Path Navigator</button>
            <button onClick={() => onNavigate('browse')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Bootcamp Cohorts</button>
            <button onClick={() => onNavigate('for-teams')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Enterprise Sprints</button>
            <button onClick={() => onNavigate('community')} className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Developer Discord</button>
            <button onClick={onOpenAdvisor} className="text-left font-body-sm text-body-sm text-secondary hover:text-secondary-fixed transition-colors flex items-center gap-1">
              <span>Book a Mentor</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">Company</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">About SkillSprint</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Engineering Mentors</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Hiring Partner Network</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Privacy Policy</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Terms of Service</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container-high/40">
          <p className="font-body-sm text-body-sm text-outline">
            © 2026 SkillSprint Technologies, Inc. Connected to Supabase Cloud Engine.
          </p>
          <div className="flex items-center gap-space-md">
            <a
              aria-label="Code Repository"
              className="p-space-xs rounded-lg text-outline hover:text-secondary hover:bg-surface-container transition-colors"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-lg">terminal</span>
            </a>
            <button
              onClick={() => onNavigate('community')}
              aria-label="Community Forum"
              className="p-space-xs rounded-lg text-outline hover:text-secondary hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-lg">forum</span>
            </button>
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Supabase Cloud"
              className="p-space-xs rounded-lg text-outline hover:text-secondary hover:bg-surface-container transition-colors flex items-center gap-1 text-xs"
            >
              <span className="material-symbols-outlined text-lg">database</span>
              <span>Supabase</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

