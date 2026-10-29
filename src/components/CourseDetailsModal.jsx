import React from 'react';

export default function CourseDetailsModal({ course, onClose, onEnroll }) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl p-space-lg sm:p-space-xl my-8 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-container/10 blur-3xl pointer-events-none rounded-full"></div>

        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-badge text-label-badge uppercase">
                {course.domain?.toUpperCase()} SPRINT
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-badge text-label-badge">
                {course.duration_days} Days
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-tertiary font-label-badge text-label-badge">
                {course.level}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge">
                {course.format}
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 text-2xl sm:text-3xl font-bold">
              {course.title}
            </h2>
            {course.subtitle && (
              <p className="text-body-md text-secondary font-medium">{course.subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Overview & Instructor Row */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high/60 mb-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={course.instructor_avatar}
              alt={course.instructor_name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/40"
            />
            <div>
              <p className="font-label-md text-label-md text-on-surface font-bold">{course.instructor_name}</p>
              <p className="font-label-sm text-label-sm text-outline">{course.instructor_role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="flex flex-col">
              <span className="text-outline">Cohort Start</span>
              <span className="font-semibold text-tertiary">{course.cohort_start || 'Next Monday'}</span>
            </div>
            <div className="h-8 w-px bg-surface-container-high"></div>
            <div className="flex flex-col">
              <span className="text-outline">Rating</span>
              <span className="font-semibold text-primary flex items-center gap-0.5">
                <span className="material-symbols-outlined text-sm">star</span> {course.rating}
              </span>
            </div>
            <div className="h-8 w-px bg-surface-container-high"></div>
            <div className="flex flex-col">
              <span className="text-outline">Seats Left</span>
              <span className="font-semibold text-error">{course.seats_left || 4} seats</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-space-lg">
          <h3 className="font-label-md text-label-md text-on-surface font-semibold mb-2">Sprint Architecture & Scope</h3>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="mb-space-lg">
          <h3 className="font-label-md text-label-md text-on-surface font-semibold mb-2">Production Stacks & Tooling</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(course.tags) && course.tags.map((tag) => (
              <span
                key={tag}
                className="px-space-sm py-1 rounded-lg bg-surface-container-high text-secondary border border-secondary/20 text-xs font-mono font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Day-by-Day Syllabus */}
        <div className="mb-space-xl">
          <h3 className="font-label-md text-label-md text-on-surface font-semibold mb-3">14-Day Micro-Milestones & Syllabus</h3>
          <div className="space-y-2.5">
            {Array.isArray(course.syllabus) && course.syllabus.length > 0 ? (
              course.syllabus.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-mono text-xs font-bold">
                      {s.day}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">{s.title}</span>
                  </div>
                  <span className="text-xs text-on-surface-variant sm:max-w-xs text-left sm:text-right">
                    {s.details}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-outline italic">Curriculum syllabus dynamically updated in the cohort repository.</p>
            )}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-3 rounded-lg bg-surface-container-lowest/80 border border-tertiary/20 flex items-center gap-3 mb-space-lg text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-tertiary text-xl">verified_user</span>
          <span>
            <strong className="text-on-surface">SkillSprint Guarantee:</strong> If our staff mentors do not return your PR reviews within 4 hours, receive a 100% immediate refund.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-surface-container-high/60">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-on-surface">${course.price}</span>
            {course.original_price && (
              <span className="text-sm text-outline line-through">${course.original_price}</span>
            )}
            <span className="text-xs text-secondary ml-1">One-time sprint cohort fee</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onEnroll(course)}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md transition-all font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Enroll in Sprint</span>
              <span className="material-symbols-outlined text-base">bolt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

