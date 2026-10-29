import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function MySprintsView({ enrollments, onBrowseClick, onUpdateProgress }) {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm pb-space-md border-b border-surface-container-high/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-tertiary">bolt</span>
            <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-wider">
              Student Sprint Dashboard
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">My Active Sprints</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Track your daily execution milestones, PR review cycles, and verifiable cohort honors.
          </p>
        </div>

        <button
          type="button"
          onClick={onBrowseClick}
          className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Explore More Sprints</span>
        </button>
      </div>

      {/* Enrollments List */}
      {enrollments.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-surface-container-low border border-surface-container-high max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-4 text-tertiary">
            <span className="material-symbols-outlined text-3xl">bolt</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface text-xl font-bold">
            No Active Sprints Enrolled
          </h3>
          <p className="text-body-md text-on-surface-variant max-w-md mx-auto mt-2 mb-6">
            You haven't enrolled in any micro-bootcamps yet. Choose a high-impact 14-day cohort to start shipping production repos.
          </p>
          <button
            type="button"
            onClick={onBrowseClick}
            className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-bold text-sm transition-all"
          >
            Browse Sprints Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          {enrollments.map((enr) => {
            const progress = enr.progress_pct || 25;
            const currentDay = enr.current_day || Math.max(1, Math.round((progress / 100) * 14));

            return (
              <div
                key={enr.id}
                className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between shadow-lg hover:border-primary/40 transition-all"
              >
                <div>
                  {/* Top status bar */}
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      enr.status === 'completed'
                        ? 'bg-tertiary-container text-on-tertiary'
                        : 'bg-secondary/15 text-secondary border border-secondary/30'
                    }`}>
                      {enr.status === 'completed' ? '✓ Sprint Completed' : `Day ${currentDay} of 14 • In Progress`}
                    </span>

                    <span className="text-xs text-outline font-mono">
                      Enrolled {new Date(enr.enrolled_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface text-xl font-bold mb-2">
                    {enr.course_title}
                  </h3>

                  {/* Progress bar */}
                  <div className="my-space-md">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-on-surface font-semibold">Sprint Progress</span>
                      <span className="text-secondary font-mono font-bold">{progress}% Completed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Next Milestone preview */}
                  <div className="p-3 rounded-lg bg-surface-container border border-surface-container-highest/60 mb-space-md text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-base">timer</span>
                      <span>Next PR submission window closes in <strong>18 hours</strong></span>
                    </div>
                    <span className="text-tertiary font-semibold">PR #04</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-space-md border-t border-surface-container-high/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateProgress(enr.id, Math.min(100, progress + 20))}
                      className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-xs text-on-surface font-medium transition-colors"
                    >
                      + Complete Milestone
                    </button>
                    {progress >= 100 && (
                      <span className="text-xs text-tertiary font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">workspace_premium</span>
                        Honor Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert(`Opening Cohort GitHub Repo for: ${enr.course_title}`)}
                      className="px-3 py-1.5 rounded bg-surface-container text-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">code</span>
                      <span>Repo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Connecting to Discord Private Cohort Channel for: ${enr.course_title}`)}
                      className="px-3 py-1.5 rounded bg-primary-container text-on-primary-container text-xs font-semibold hover:bg-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">forum</span>
                      <span>Cohort Room</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

