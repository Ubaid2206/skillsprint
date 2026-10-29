import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ currentView, setCurrentView, onOpenAdvisor, searchQuery, setSearchQuery }) {
  const { user, logout, switchDemoRole, setAuthModalOpen, setAuthMode } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/40">
      <div className="h-20 w-full px-margin flex items-center justify-between gap-space-lg max-w-7xl mx-auto">
        {/* Brand & Nav */}
        <div className="flex items-center gap-space-lg">
          <div 
            className="flex items-center gap-space-sm cursor-pointer select-none"
            onClick={() => setCurrentView('browse')}
          >
            <img 
              alt="SkillSprint Logo" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1VCSU_rAjl3gK4o4UvIX60uquLFF_jTIQdjFtZqpoBByyaddBAUfwtSVaakFSk9-ErfuxthMfUjDBfQt9wYtaxmLPy67rODxAXeBvPDX2j7wjVlXKTvnOcDDmGfO276LKjylsNCGLucXFmcU6qW_25oGXN6mI8yw9BdNwyCw1VeOD2spRiJBxHWI2LFQlroXH_nezCeDa_m4QeyhIcse-JoqrDT9whHOt48_wHXCtHlrbBBZmA3tqjyIOU"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">SkillSprint</span>
            <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-badge text-label-badge font-bold">PRO</span>
          </div>

          <nav className="hidden xl:flex items-center gap-space-xs">
            <button 
              onClick={() => setCurrentView('browse')} 
              className={`px-space-md py-space-xs transition-colors rounded-lg font-label-md text-label-md ${
                currentView === 'browse' 
                  ? 'bg-surface-container-high text-on-surface font-bold' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Browse Courses
            </button>
            <button 
              onClick={() => {
                setCurrentView('browse');
                const el = document.getElementById('spotlightSection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              Sprint Bootcamps
            </button>
            <button 
              onClick={() => setCurrentView('learning-paths')} 
              className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
                currentView === 'learning-paths' 
                  ? 'bg-surface-container-high text-on-surface font-bold' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Learning Paths
            </button>
            <button 
              onClick={() => setCurrentView('for-teams')} 
              className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
                currentView === 'for-teams' 
                  ? 'bg-surface-container-high text-on-surface font-bold' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              For Teams
            </button>
            <button 
              onClick={() => setCurrentView('community')} 
              className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-colors ${
                currentView === 'community' 
                  ? 'bg-surface-container-high text-on-surface font-bold' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Community
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg hidden md:block">
          <div className="relative flex items-center w-full bg-surface-container rounded-lg px-space-md py-space-xs text-on-surface-variant shadow-[0_1px_8px_rgba(0,0,0,0.04)] focus-within:ring-1 focus-within:ring-secondary/50">
            <span className="material-symbols-outlined text-outline mr-space-sm text-lg">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none" 
              placeholder="Search 120+ sprint courses, skills, instructors..." 
              type="text"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-outline hover:text-on-surface mr-2 text-xs"
              >
                ✕
              </button>
            )}
            <kbd className="ml-auto px-space-xs py-0.5 bg-surface-container-high rounded text-on-surface-variant font-label-badge text-label-badge border border-surface-container-highest">⌘K</kbd>
          </div>
        </div>

        {/* Right CTA / Auth Controls */}
        <div className="flex items-center gap-space-md">
          {/* Admin Dashboard shortcut button if admin */}
          {user?.role === 'admin' && (
            <button 
              onClick={() => setCurrentView('admin')}
              className={`hidden sm:flex items-center gap-space-xs px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                currentView === 'admin'
                  ? 'bg-primary-container text-on-primary-container border-primary'
                  : 'border-secondary/40 text-secondary hover:bg-secondary/10'
              }`}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>Admin Panel</span>
            </button>
          )}

          {/* My Sprints button */}
          <button 
            onClick={() => setCurrentView('my-sprints')}
            className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-lg transition-colors font-label-md text-label-md ${
              currentView === 'my-sprints'
                ? 'bg-surface-bright text-secondary font-bold ring-1 ring-secondary/40'
                : 'bg-surface-container-high hover:bg-surface-bright text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-tertiary text-lg">bolt</span>
            <span>My Sprints</span>
          </button>

          {/* Advisor Quick Trigger */}
          <button 
            onClick={onOpenAdvisor}
            title="Book Advisor"
            className="hidden lg:flex p-space-xs rounded-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-xl">support_agent</span>
          </button>

          {/* User Profile / Auth Dropdown */}
          {user ? (
            <div className="relative">
              <div 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-space-xs pl-space-xs cursor-pointer group"
              >
                <div className="relative">
                  <img 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/40 group-hover:ring-primary transition-all" 
                    src={user.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAcavB4zJ-_82EwyamAgg2obM8V9Xnu1TIsUSUTYNUE3kvOvGIwkwvZeW0HWOdIIl4o6haR1KgSVkrnnpkvT6MkcJK55WEzpctzaBZ6edA-lqA7p5bWPrRyjTiYI19vkQ8R8ivRO_tronLjmWzMEJSDzjQCI__687ZzvpAEjnCbRjNkfehX4UEyHLXbHmzpnBt5LGQne1AgQ_YARb5lt7_6MX4vJ_zNzyBZD2BuEpWk4GvkOzocbiIc"}
                  />
                  <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-surface-container-lowest ${
                    user.role === 'admin' ? 'bg-secondary' : 'bg-tertiary'
                  }`}></span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-base group-hover:text-on-surface">
                  {profileDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </div>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-3 w-72 rounded-xl bg-surface-container-high border border-outline-variant/30 shadow-2xl p-space-sm z-50"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-space-sm py-space-xs border-b border-surface-container-highest/60 mb-2">
                    <p className="font-label-md text-label-md text-on-surface font-semibold truncate">{user.name}</p>
                    <p className="font-body-sm text-body-sm text-outline truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin' 
                          ? 'bg-secondary/20 text-secondary border border-secondary/30' 
                          : 'bg-tertiary/20 text-tertiary border border-tertiary/30'
                      }`}>
                        {user.role === 'admin' ? '⚡ Platform Admin' : '🎓 Enrolled Student'}
                      </span>

                      {/* Demo role switch toggle */}
                      <button 
                        onClick={() => switchDemoRole(user.role === 'admin' ? 'student' : 'admin')}
                        className="text-[11px] text-primary hover:underline flex items-center gap-0.5"
                      >
                        <span className="material-symbols-outlined text-xs">sync_alt</span>
                        <span>Switch to {user.role === 'admin' ? 'Student' : 'Admin'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setCurrentView('my-sprints');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-left text-sm text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-tertiary text-base">bolt</span>
                      <span>My Sprints & Progress</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-left text-sm text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-secondary text-base">dashboard_customize</span>
                      <span>Admin Control Center</span>
                    </button>

                    <button
                      onClick={onOpenAdvisor}
                      className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-left text-sm text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary text-base">calendar_month</span>
                      <span>Book Diagnostic Advisor</span>
                    </button>

                    <div className="border-t border-surface-container-highest/60 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg text-left text-sm text-error hover:bg-error-container/20 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('signin');
                  setAuthModalOpen(true);
                }}
                className="px-space-md py-space-xs rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setAuthModalOpen(true);
                }}
                className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md transition-colors font-semibold"
              >
                Join Free
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

