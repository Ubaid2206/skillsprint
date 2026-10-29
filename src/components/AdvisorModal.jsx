import React, { useState } from 'react';
import { bookAdvisor } from '../lib/api';

export default function AdvisorModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [targetGoal, setTargetGoal] = useState('Target: Switch to AI / LLM Engineering');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await bookAdvisor({
      full_name: fullName,
      email,
      target_goal: targetGoal,
    });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-surface-container text-on-surface p-space-xl shadow-2xl border border-surface-container-high">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-2xl">smart_toy</span>
            <h3 className="font-headline-sm text-headline-sm text-lg font-bold">Schedule Advisor Session</h3>
          </div>
          <button
            type="button"
            className="text-outline hover:text-on-surface p-1 rounded-lg"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          Our lead curriculum engineers will evaluate your GitHub and pinpoint the optimal 14-day cohort for your target role.
        </p>

        {success ? (
          <div className="p-4 rounded-xl bg-tertiary-container/20 border border-tertiary/40 text-center my-4">
            <span className="material-symbols-outlined text-3xl text-tertiary mb-1">check_circle</span>
            <p className="text-sm font-bold text-on-surface">Advisor Booked Successfully!</p>
            <p className="text-xs text-outline mt-1">We will email you your 15-min calendar invite shortly.</p>
          </div>
        ) : (
          <form className="flex flex-col gap-space-sm" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-outline mb-1">Full Name</label>
              <input
                className="w-full px-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest text-body-sm font-body-sm focus:outline-none focus:border-secondary"
                placeholder="e.g. David Hasselhoff"
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-outline mb-1">Work or GitHub Email</label>
              <input
                className="w-full px-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest text-body-sm font-body-sm focus:outline-none focus:border-secondary"
                placeholder="developer@skillsprint.io"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-outline mb-1">Primary Growth Objective</label>
              <select
                className="w-full px-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface text-body-sm font-body-sm border border-surface-container-highest focus:outline-none focus:border-secondary cursor-pointer"
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
              >
                <option value="Target: Switch to AI / LLM Engineering">Target: Switch to AI / LLM Engineering</option>
                <option value="Target: Staff / Principal Promotion">Target: Staff / Principal Promotion</option>
                <option value="Target: Land Tier-1 Product Tech Role">Target: Land Tier-1 Product Tech Role</option>
                <option value="Target: Solana / Web3 Smart Contracts">Target: Solana / Web3 Smart Contracts</option>
              </select>
            </div>

            <button
              disabled={submitting}
              className="mt-space-sm w-full py-space-sm bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:bg-primary transition-colors font-bold disabled:opacity-50"
              type="submit"
            >
              {submitting ? 'Booking Session...' : 'Confirm 15-Min Diagnostic Call'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

