import React from 'react';

export default function CtaSection({ onExploreClick, onOpenAdvisor }) {
  return (
    <section className="w-full px-margin py-space-xl max-w-7xl mx-auto mb-space-xl">
      <div className="relative w-full rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-xl border border-surface-container-high/60">
        {/* Glow ambient background */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-secondary-container/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-sm max-w-xl text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start gap-space-xs text-tertiary">
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            <span className="font-label-badge text-label-badge uppercase tracking-wider">
              Next Cohorts Start This Monday
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Ready to Turbocharge Your Engineering Velocity?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Join 48,000+ ambitious developers mastering production tech stacks in 14 days with hands-on senior engineering mentors.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-space-md w-full md:w-auto">
          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md transition-all shadow-lg flex items-center justify-center gap-space-xs font-bold"
          >
            <span className="material-symbols-outlined text-lg">bolt</span>
            <span>Browse All Sprints</span>
          </button>
          <button
            type="button"
            onClick={onOpenAdvisor}
            className="w-full sm:w-auto px-space-lg py-space-md rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-lg text-secondary">chat</span>
            <span>Talk to Learning Advisor</span>
          </button>
        </div>
      </div>
    </section>
  );
}

