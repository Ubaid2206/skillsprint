import React from 'react';

export default function DomainNavigator({ activeDomain, setActiveDomain }) {
  const domains = [
    { id: 'all', label: 'All Sprints', icon: 'dashboard', iconColor: 'text-on-surface' },
    { id: 'ai', label: 'AI & Machine Learning', icon: 'smart_toy', iconColor: 'text-secondary', badge: 'HOT' },
    { id: 'web3', label: 'Full-Stack & Web3', icon: 'code', iconColor: 'text-primary' },
    { id: 'backend', label: 'System Design & DevOps', icon: 'dns', iconColor: 'text-secondary' },
    { id: 'design', label: 'UI/UX & Product Design', icon: 'palette', iconColor: 'text-primary' },
    { id: 'data', label: 'Data & Analytics', icon: 'query_stats', iconColor: 'text-tertiary' },
    { id: 'executive', label: 'Executive & Tech Lead', icon: 'workspace_premium', iconColor: 'text-outline' },
  ];

  return (
    <section className="w-full px-margin py-space-md bg-surface-container-lowest sticky top-20 z-40 shadow-sm border-b border-surface-container-high/50">
      <div className="max-w-7xl mx-auto flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none" id="domainNavContainer">
        {domains.map((item) => {
          const isActive = activeDomain === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveDomain(item.id)}
              className={`px-space-md py-space-xs rounded-lg font-label-md text-label-md flex items-center gap-space-xs shrink-0 transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-sm font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isActive ? 'text-on-primary-container' : item.iconColor}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`px-1.5 py-0.2 rounded font-label-badge text-label-badge ${
                  isActive ? 'bg-surface-container text-on-surface' : 'bg-tertiary-container text-on-tertiary'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

