import React from 'react';

export default function MethodologySection() {
  return (
    <section className="w-full px-margin py-space-xl bg-surface-container-lowest my-space-xl border-y border-surface-container-high/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-wider">
            The Anti-Course Philosophy
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs mb-space-sm">
            Why Sprints Outperform Traditional Courses
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Passive video tutorials have a 4% completion rate. SkillSprint is built on high-velocity experiential momentum, active feedback loops, and production constraints.
          </p>
        </div>

        {/* Bento-style 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Pillar 1 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-sm hover:bg-surface-container transition-colors border border-surface-container-high/40">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-2xl">timer</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface text-lg font-bold">
              Micro-Cycles, Deep Work
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Daily 45-minute sprint briefs. Zero filler lectures. Clear, bounded milestones that fit alongside your full-time job.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-sm hover:bg-surface-container transition-colors border border-surface-container-high/40">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-2xl">commit</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface text-lg font-bold">
              Real Production Repos
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              No generic todo apps. Fork actual enterprise boilerplates, implement critical features, and commit straight to your public GitHub.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-sm hover:bg-surface-container transition-colors border border-surface-container-high/40">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">rate_review</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface text-lg font-bold">
              1:1 PR Reviews
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Staff and Principal engineers review every pull request within 4 hours. Receive line-by-line feedback on architecture and performance.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-sm hover:bg-surface-container transition-colors border border-surface-container-high/40">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary-fixed">
              <span className="material-symbols-outlined text-2xl">verified_user</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface text-lg font-bold">
              Verifiable Credentials
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Earn cryptographically signed, on-chain and LinkedIn-verified sprint honors recognized by hiring managers at leading tech companies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

