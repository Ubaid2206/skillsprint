import React from 'react';

export default function CommunityView({ onOpenAdvisor }) {
  const events = [
    {
      title: 'Weekly Live PR Review Clinic',
      host: 'Marcus Sterling (Ex-Scale / Stripe)',
      time: 'Every Thursday, 6:00 PM EST',
      tag: 'LIVE STREAM',
      desc: 'Watch a staff architect break down sprint pull requests live, profiling memory leaks and optimizing SQL queries.',
    },
    {
      title: 'AI Agent Whiteboard & Architecture Tear-Down',
      host: 'Dr. Elena Vance (Ex-DeepMind)',
      time: 'Next Tuesday, 1:00 PM EST',
      tag: 'WORKSHOP',
      desc: 'Interactive whiteboarding of multi-agent state machines with failure recovery loops and real-world vector clustering.',
    },
    {
      title: 'Staff Engineer Promotion Q&A Panel',
      host: 'Sophie Chen & Seraphina Vance',
      time: 'Bi-weekly Friday, 5:00 PM EST',
      tag: 'FIRESIDE',
      desc: 'Open floor AMA on navigating L6/L7 promotion committees, trade-off defense, and organizational leverage.',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl min-h-[75vh]">
      <div className="text-center max-w-3xl mx-auto mb-space-xl">
        <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-wider">
          Peer Momentum &amp; Mentorship
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-3">
          Join 48,000+ Engineers in the SkillSprint Guild
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Learning alone fails. SkillSprint pairs you with motivated cohort peers, staff engineer mentors, and daily accountability loops.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">forum</span>
            <span>Join Developer Discord</span>
          </a>
          <button
            type="button"
            onClick={onOpenAdvisor}
            className="px-6 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-semibold text-sm transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg text-secondary">support_agent</span>
            <span>Book 1:1 Mentor Call</span>
          </button>
        </div>
      </div>

      <div className="mb-space-xl">
        <h2 className="font-headline-sm text-headline-sm text-on-surface text-xl font-bold mb-space-md">
          Upcoming Community Sprints &amp; Clinics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {events.map((ev, i) => (
            <div
              key={i}
              className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-mono text-[10px] font-bold">
                    {ev.tag}
                  </span>
                  <span className="text-[11px] text-outline">{ev.time}</span>
                </div>
                <h3 className="font-bold text-on-surface text-base mb-1">{ev.title}</h3>
                <p className="text-xs text-secondary font-medium mb-3">Led by {ev.host}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{ev.desc}</p>
              </div>

              <div className="pt-space-md border-t border-surface-container-high/60 mt-4">
                <button
                  type="button"
                  onClick={() => alert(`RSVP registered for "${ev.title}". Check your calendar invite!`)}
                  className="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-bright text-xs text-on-surface font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">event_available</span>
                  <span>RSVP Free</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

