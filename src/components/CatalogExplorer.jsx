import React, { useState, useMemo } from 'react';

export default function CatalogExplorer({
  courses,
  activeDomain,
  searchQuery,
  onSelectCourse,
  onEnrollCourse,
  onOpenAdvisor,
}) {
  // Filter states
  const [selectedFormats, setSelectedFormats] = useState([
    'Cohort-based Live Sprint',
    'Async Self-Paced Track',
    'Weekend 48-hr Hackathon',
  ]);
  const [selectedDuration, setSelectedDuration] = useState('all'); // 'all', 'micro', '14', '30'
  const [selectedLevel, setSelectedLevel] = useState('All'); // 'All', 'Intermediate', 'Advanced'
  const [verifiedCertOnly, setVerifiedCertOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date'); // 'date', 'rating', 'duration', 'demand'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Toggle format filter
  const toggleFormat = (format) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedFormats([
      'Cohort-based Live Sprint',
      'Async Self-Paced Track',
      'Weekend 48-hr Hackathon',
    ]);
    setSelectedDuration('all');
    setSelectedLevel('All');
    setVerifiedCertOnly(false);
    setSortBy('date');
    setCurrentPage(1);
  };

  // Filtered & sorted courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Domain filter
      if (activeDomain !== 'all') {
        if (activeDomain === 'ai' && course.domain !== 'ai') return false;
        if (activeDomain === 'backend' && course.domain !== 'backend') return false;
        if (activeDomain === 'web3' && course.domain !== 'web3') return false;
        if (activeDomain === 'design' && course.domain !== 'design') return false;
        if (activeDomain === 'data' && course.domain !== 'data') return false;
        if (activeDomain === 'executive' && course.domain !== 'executive') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = course.title?.toLowerCase().includes(q);
        const matchesDesc = course.description?.toLowerCase().includes(q);
        const matchesInstructor = course.instructor_name?.toLowerCase().includes(q);
        const matchesTags = Array.isArray(course.tags) && course.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesTags) {
          return false;
        }
      }

      // Format filter
      if (selectedFormats.length > 0 && !selectedFormats.includes(course.format)) {
        return false;
      }

      // Duration filter
      if (selectedDuration === 'micro' && course.duration_days >= 10) return false;
      if (selectedDuration === '14' && (course.duration_days < 10 || course.duration_days > 20)) return false;
      if (selectedDuration === '30' && course.duration_days < 21) return false;

      // Level filter
      if (selectedLevel !== 'All') {
        if (selectedLevel === 'Intermediate' && !course.level.includes('Inter')) return false;
        if (selectedLevel === 'Advanced' && !course.level.includes('Adv')) return false;
      }

      // Verified Cert
      if (verifiedCertOnly && !course.verified_cert) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'duration') return (a.duration_days || 0) - (b.duration_days || 0);
      if (sortBy === 'demand') return (b.enrolled_count || 0) - (a.enrolled_count || 0);
      // 'date' or default
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });
  }, [courses, activeDomain, searchQuery, selectedFormats, selectedDuration, selectedLevel, verifiedCertOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="w-full px-margin py-space-xl max-w-7xl mx-auto" id="catalogExplorer">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-space-xl gap-space-sm">
        <div>
          <div className="flex items-center gap-space-xs mb-space-xs">
            <span className="material-symbols-outlined text-secondary text-base">apps</span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">Sprint Curriculum</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Explore All Micro-Bootcamps ({filteredCourses.length})
          </h2>
        </div>

        <div className="flex items-center gap-space-sm">
          <span className="font-body-sm text-body-sm text-outline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-container text-on-surface px-space-sm py-space-xs rounded-lg font-label-sm text-label-sm focus:outline-none cursor-pointer border border-surface-container-highest/60"
          >
            <option value="date">Next Cohort Start Date</option>
            <option value="rating">Highest Rated (4.9+)</option>
            <option value="duration">Velocity: Shortest Duration</option>
            <option value="demand">Most In-Demand (Job Postings)</option>
          </select>
        </div>
      </div>

      {/* 2-Column Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* LEFT COLUMN: FILTER SIDEBAR */}
        <aside className="lg:col-span-3 flex flex-col gap-space-lg">
          <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col gap-space-lg border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface text-lg">Filter Sprints</span>
              <button
                type="button"
                onClick={resetFilters}
                className="font-label-sm text-label-sm text-primary hover:text-primary-fixed underline"
              >
                Reset All
              </button>
            </div>

            {/* Format Filter */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider text-xs">
                Sprint Format
              </span>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes('Cohort-based Live Sprint')}
                  onChange={() => toggleFormat('Cohort-based Live Sprint')}
                  className="w-4 h-4 rounded bg-surface-container accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">Cohort-based Live Sprint</span>
              </label>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes('Async Self-Paced Track')}
                  onChange={() => toggleFormat('Async Self-Paced Track')}
                  className="w-4 h-4 rounded bg-surface-container accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">Async Self-Paced Track</span>
              </label>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes('Weekend 48-hr Hackathon')}
                  onChange={() => toggleFormat('Weekend 48-hr Hackathon')}
                  className="w-4 h-4 rounded bg-surface-container accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">Weekend 48-hr Hackathon</span>
              </label>
            </div>

            {/* Duration Filter */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider text-xs">
                Duration
              </span>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="radio"
                  name="duration"
                  checked={selectedDuration === 'all'}
                  onChange={() => setSelectedDuration('all')}
                  className="w-4 h-4 accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">All Durations</span>
              </label>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="radio"
                  name="duration"
                  checked={selectedDuration === 'micro'}
                  onChange={() => setSelectedDuration('micro')}
                  className="w-4 h-4 accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">&lt; 10 Days (Micro-Burst)</span>
              </label>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="radio"
                  name="duration"
                  checked={selectedDuration === '14'}
                  onChange={() => setSelectedDuration('14')}
                  className="w-4 h-4 accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">10-14 Days (Standard Sprint)</span>
              </label>
              <label className="flex items-center gap-space-sm cursor-pointer text-on-surface-variant hover:text-on-surface">
                <input
                  type="radio"
                  name="duration"
                  checked={selectedDuration === '30'}
                  onChange={() => setSelectedDuration('30')}
                  className="w-4 h-4 accent-primary-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm">21+ Days (Deep Masterclass)</span>
              </label>
            </div>

            {/* Experience Level Filter */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider text-xs">
                Skill Level
              </span>
              <div className="grid grid-cols-3 gap-1">
                {['All', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`py-1 px-2 rounded font-label-sm text-label-sm text-center transition-all ${
                      selectedLevel === lvl
                        ? 'bg-surface-container-high text-primary font-bold ring-1 ring-primary/40'
                        : 'bg-surface-container text-on-surface hover:bg-surface-bright'
                    }`}
                  >
                    {lvl === 'Intermediate' ? 'Inter.' : lvl === 'Advanced' ? 'Adv.' : 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle: Verified Credential */}
            <div className="pt-space-sm flex items-center justify-between bg-surface-container p-space-sm rounded-lg">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">Verified Credential</span>
                <span className="font-label-badge text-label-badge text-outline">LinkedIn &amp; GitHub verified</span>
              </div>
              <div 
                className="relative inline-flex items-center cursor-pointer"
                onClick={() => setVerifiedCertOnly(!verifiedCertOnly)}
              >
                <div className={`w-9 h-5 rounded-full transition-colors relative ${
                  verifiedCertOnly ? 'bg-tertiary-container' : 'bg-surface-container-highest'
                }`}>
                  <div className={`absolute top-[2px] left-[2px] bg-on-surface rounded-full h-4 w-4 transition-transform ${
                    verifiedCertOnly ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </div>
              </div>
            </div>

            {/* Pro Advice Box */}
            <div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-xs border border-secondary/20">
              <div className="flex items-center gap-space-xs text-secondary">
                <span className="material-symbols-outlined text-sm">support_agent</span>
                <span className="font-label-sm text-label-sm font-bold">Unsure which Sprint?</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Take our 2-minute diagnostic skill audit to identify your exact engineering gap.
              </p>
              <button
                type="button"
                onClick={onOpenAdvisor}
                className="font-label-sm text-label-sm text-primary hover:text-primary-fixed mt-1 flex items-center gap-1 text-left"
              >
                Start Skill Audit <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: COURSE CATALOG GRID */}
        <main className="lg:col-span-9 flex flex-col gap-space-lg">
          {paginatedCourses.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-xl border border-surface-container-high">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
              <h3 className="text-lg font-bold text-on-surface">No sprints match your filter criteria</h3>
              <p className="text-body-sm text-on-surface-variant mt-1 mb-4">
                Try resetting your filters or adjusting your search term.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold text-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {paginatedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col rounded-xl bg-surface-container-low shadow-md overflow-hidden hover:bg-surface-container transition-all group border border-surface-container-high/40 hover:border-primary/40"
                >
                  {/* Image with Duration & Seats left */}
                  <div
                    className="relative h-40 w-full overflow-hidden bg-surface-container-high cursor-pointer"
                    onClick={() => onSelectCourse(course)}
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={course.title}
                      src={course.image_url}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-badge text-label-badge text-secondary">
                      {course.duration_days} Days
                    </span>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-badge text-label-badge text-error flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                      Only {course.seats_left || 4} Seats Left
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-label-badge text-label-badge text-primary uppercase">
                        {course.domain === 'ai'
                          ? 'Machine Learning'
                          : course.domain === 'backend'
                          ? 'Cloud & Backend'
                          : course.domain === 'web3'
                          ? 'Web3 & Solana'
                          : course.domain === 'data'
                          ? 'Data Engineering'
                          : 'Product Design'}
                      </span>
                      <h4
                        onClick={() => onSelectCourse(course)}
                        className="font-headline-sm text-headline-sm text-on-surface text-base group-hover:text-primary transition-colors my-1 cursor-pointer line-clamp-2"
                      >
                        {course.title}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-sm">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-outline mb-space-md">
                        <span className="flex items-center gap-1 text-primary">
                          <span className="material-symbols-outlined text-xs">star</span>
                          {course.rating} ({course.review_count})
                        </span>
                        <span>{course.enrolled_count?.toLocaleString()} Enrolled</span>
                      </div>
                    </div>

                    <div className="pt-space-sm flex items-center justify-between border-t border-surface-container-high/40">
                      <span className="font-headline-sm text-headline-sm text-on-surface text-lg font-bold">
                        ${course.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectCourse(course)}
                          className="px-space-md py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-sm text-label-sm transition-colors"
                        >
                          View Syllabus
                        </button>
                        <button
                          type="button"
                          onClick={() => onEnrollCourse(course)}
                          className="px-2.5 py-1 rounded bg-secondary/15 hover:bg-secondary text-secondary hover:text-on-secondary font-label-sm text-label-sm transition-all"
                          title="Instant Enroll"
                        >
                          <span className="material-symbols-outlined text-sm">bolt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination & Load More Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md py-space-lg">
            <span className="font-body-sm text-body-sm text-outline">
              Showing {paginatedCourses.length} of {filteredCourses.length} available sprints
            </span>
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-label-sm text-label-sm flex items-center justify-center font-bold transition-all ${
                      isCurrent
                        ? 'bg-primary-container text-on-primary-container shadow-sm'
                        : 'bg-surface-container text-on-surface hover:bg-surface-bright'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-space-md py-space-xs rounded-lg bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

