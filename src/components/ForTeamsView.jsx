import React, { useState } from 'react';
import { bookAdvisor } from '../lib/api';

export default function ForTeamsView({ onOpenAdvisor }) {
  const [teamEmail, setTeamEmail] = useState('');
  const [teamSize, setTeamSize] = useState('10-25 Engineers');
  const [requested, setRequested] = useState(false);

  const handleTeamInquiry = async (e) => {
    e.preventDefault();
    await bookAdvisor({
      full_name: 'Enterprise Team Lead',
      email: teamEmail,
      target_goal: `Enterprise Team Sprint: ${teamSize}`,
    });
    setRequested(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl min-h-[75vh]">
      <div className="relative rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low p-space-xl border border-surface-container-high overflow-hidden mb-space-xl text-center">
        <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">
          Enterprise Micro-Bootcamps
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface text-3xl sm:text-4xl font-bold mt-2 mb-3">
          Upskill Engineering Squads in 14 Days, Not 6 Months
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mb-space-lg">
          Equip your teams with cutting-edge architectures: Next.js 15, AI Agent swarms, distributed Golang, and zero-downtime Kubernetes.
        </p>

        {requested ? (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-tertiary-container/20 border border-tertiary/40 text-tertiary text-sm font-semibold">
            ✓ Enterprise demo requested! Our Director of Curriculum will reach out within 2 hours.
          </div>
        ) : (
          <form onSubmit={handleTeamInquiry} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="eng-vp@yourcompany.com"
              value={teamEmail}
              onChange={(e) => setTeamEmail(e.target.value)}
              className="w-full sm:w-72 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface border border-surface-container-highest text-sm focus:outline-none focus:border-secondary"
            />
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface border border-surface-container-highest text-sm focus:outline-none cursor-pointer"
            >
              <option value="5-10 Engineers">5-10 Engineers</option>
              <option value="10-25 Engineers">10-25 Engineers</option>
              <option value="25-100 Engineers">25-100 Engineers</option>
              <option value="100+ Enterprise">100+ Enterprise</option>
            </select>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-bold text-sm hover:bg-primary transition-colors whitespace-nowrap"
            >
              Request Team Pilot
            </button>
          </form>
        )}
      </div>

      {/* 3 Value Pillars for Teams */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-3">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-lg font-bold mb-2">Private Internal Cohorts</h3>
          <p className="text-body-sm text-on-surface-variant">
            Run private cohorts solely for your team, adhering to your internal coding style guides and proprietary API contracts.
          </p>
        </div>

        <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary mb-3">
            <span className="material-symbols-outlined">analytics</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-lg font-bold mb-2">Manager Velocity Dashboard</h3>
          <p className="text-body-sm text-on-surface-variant">
            Engineering managers get real-time visibility into PR submissions, code quality metrics, and milestone velocity.
          </p>
        </div>

        <div className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
            <span className="material-symbols-outlined">receipt_long</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-lg font-bold mb-2">Unified Invoicing &amp; L&amp;D Reimbursement</h3>
          <p className="text-body-sm text-on-surface-variant">
            Seamless centralized billing, automated receipts for corporate learning budgets, and dedicated customer success manager.
          </p>
        </div>
      </div>
    </div>
  );
}

