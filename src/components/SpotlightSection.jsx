import React from 'react';

export default function SpotlightSection({ courses, onSelectCourse, onEnrollCourse }) {
  // Filter spotlight courses or take first 3
  const spotlights = courses.filter((c) => c.is_spotlight).slice(0, 3);
  const displayList = spotlights.length > 0 ? spotlights : courses.slice(0, 3);

  return (
    <section className="w-full px-margin py-space-xl max-w-7xl mx-auto" id="spotlightSection">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
        <div>
          <div className="flex items-center gap-space-xs mb-space-xs">
            <span className="material-symbols-outlined text-tertiary text-lg">local_fire_department</span>
            <span className="font-label-badge text-label-badge text-tertiary uppercase tracking-wider">Fast-Filling Cohorts</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Spotlight Sprint Cohorts</h2>
        </div>
        <a 
          className="font-label-md text-label-md text-secondary hover:text-secondary-fixed flex items-center gap-1 group cursor-pointer" 
          href="#catalogExplorer"
        >
          <span>View all live cohorts</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>

      {/* Spotlight 3-Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {displayList.map((course) => (
          <div 
            key={course.id} 
            className="flex flex-col rounded-xl bg-surface-container-low shadow-xl overflow-hidden group hover:bg-surface-container transition-all duration-300 border border-surface-container-high/40 hover:border-primary/40"
          >
            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden bg-surface-container-high cursor-pointer" onClick={() => onSelectCourse(course)}>
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={course.title}
                src={course.image_url}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/30 to-transparent"></div>
              
              <div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
                <span className="px-space-sm py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-badge text-label-badge">
                  {course.cohort_start || 'Starts Monday'}
                </span>
                <span className="px-space-sm py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-badge text-label-badge">
                  {course.duration_days} Days
                </span>
              </div>
              <span className="absolute top-space-sm right-space-sm px-space-xs py-0.5 rounded bg-surface-container-lowest/90 text-on-surface-variant font-label-sm text-label-sm">
                {course.level}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-space-xs mb-space-xs">
                  <span className="material-symbols-outlined text-secondary text-sm">stars</span>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider text-[11px]">
                    {course.domain === 'ai' ? 'Autonomous Systems' : course.domain === 'backend' ? 'Backend Engineering' : 'Design Systems'}
                  </span>
                </div>

                <h3 
                  onClick={() => onSelectCourse(course)}
                  className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors mb-space-xs cursor-pointer line-clamp-2"
                >
                  {course.title}
                </h3>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
                  {course.description}
                </p>

                {/* Instructor & Rating */}
                <div className="flex items-center justify-between py-space-xs mb-space-md bg-surface-container rounded-lg px-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <img 
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-outline/30" 
                      alt={course.instructor_name} 
                      src={course.instructor_avatar}
                    />
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface leading-tight">{course.instructor_name}</span>
                      <span className="font-label-badge text-label-badge text-outline">{course.instructor_role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-primary">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">{course.rating}</span>
                    <span className="font-label-badge text-label-badge text-outline">({course.review_count > 1000 ? (course.review_count / 1000).toFixed(1) + 'k' : course.review_count})</span>
                  </div>
                </div>

                {/* Curriculum Tags */}
                <div className="flex flex-wrap gap-1 mb-space-md">
                  {Array.isArray(course.tags) && course.tags.map((tag) => (
                    <span key={tag} className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-space-md flex items-center justify-between mt-auto border-t border-surface-container-high/40">
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">${course.price}</span>
                  {course.original_price && (
                    <span className="font-body-sm text-body-sm text-outline line-through">${course.original_price}</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => onSelectCourse(course)}
                    className="px-2.5 py-1 text-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors"
                  >
                    Syllabus
                  </button>
                  <button 
                    type="button"
                    onClick={() => onEnrollCourse(course)}
                    className="px-space-md py-space-xs rounded bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md transition-all flex items-center gap-space-xs shadow-sm font-semibold"
                  >
                    <span>Enroll</span>
                    <span className="material-symbols-outlined text-sm">bolt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

