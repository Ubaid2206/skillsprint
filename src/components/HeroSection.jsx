import React from 'react';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedDomain,
  setSelectedDomain,
  onExploreClick,
  onOpenAdvisor,
}) {
  const trendingTags = [
    'LLM Engineering',
    'Rust Microservices',
    'Figma Design Systems',
    'Solana Smart Contracts',
    'Kubernetes Zero-Downtime',
    'LangGraph',
    'Next.js 15',
  ];

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    onExploreClick();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Ambient Glow Aura */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[980px] h-[480px] bg-gradient-to-b from-primary-container/20 via-secondary-container/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* 1. HERO HEADER SECTION */}
      <section className="relative w-full px-margin pt-space-xl pb-space-xl flex flex-col items-center text-center max-w-7xl mx-auto">
        {/* Cohort Callout Pill */}
        <div 
          onClick={onOpenAdvisor}
          className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-high/90 shadow-md backdrop-blur-md mb-space-lg group cursor-pointer hover:bg-surface-bright transition-all border border-surface-container-highest/50"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
          <span className="material-symbols-outlined text-secondary text-base">bolt</span>
          <span className="font-label-badge text-label-badge text-secondary tracking-wider uppercase">NEW COHORTS OPEN</span>
          <span className="text-outline text-xs">•</span>
          <span className="font-label-sm text-label-sm text-on-surface">14-Day Accelerated Sprints</span>
          <span className="material-symbols-outlined text-outline text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </div>

        {/* Main Headline & Subheading */}
        <h1 className="font-display-hero text-display-hero text-on-surface max-w-5xl tracking-tight leading-none mb-space-md">
          Master High-Demand Tech Skills in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
            14-Day Sprints.
          </span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-space-xl">
          Skip 6-month bloated courses. Level up with rigorous, project-driven micro-bootcamps crafted and mentored by senior tech leaders from Google, Stripe, and OpenAI.
        </p>

        {/* Prominent Search & Filter Control Bar */}
        <div className="w-full max-w-4xl p-space-xs rounded-xl bg-surface-container-low shadow-xl mb-space-md border border-surface-container-high/50">
          <form onSubmit={handleHeroSubmit} className="flex flex-col md:flex-row items-center gap-space-xs w-full">
            <div className="flex items-center flex-1 w-full px-space-md py-space-sm bg-surface-container rounded-lg focus-within:ring-1 focus-within:ring-secondary/50">
              <span className="material-symbols-outlined text-secondary text-xl mr-space-sm">terminal</span>
              <input
                id="heroSearchInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What skill do you want to conquer next? (e.g. Next.js 15, AI Agents, Go Microservices)"
                className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none"
                type="text"
              />
            </div>

            <div className="flex items-center w-full md:w-56 px-space-md py-space-sm bg-surface-container rounded-lg relative cursor-pointer">
              <span className="material-symbols-outlined text-outline text-lg mr-space-xs">tune</span>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full bg-transparent text-on-surface font-label-md text-label-md cursor-pointer focus:outline-none appearance-none pr-space-md"
              >
                <option className="bg-surface-container text-on-surface" value="all">All Domains</option>
                <option className="bg-surface-container text-on-surface" value="ai">AI &amp; ML Engineering</option>
                <option className="bg-surface-container text-on-surface" value="backend">System Architecture</option>
                <option className="bg-surface-container text-on-surface" value="design">Design Systems</option>
                <option className="bg-surface-container text-on-surface" value="web3">Web3 &amp; Solana</option>
                <option className="bg-surface-container text-on-surface" value="data">Data &amp; Analytics</option>
              </select>
              <span className="material-symbols-outlined text-outline text-sm absolute right-space-sm pointer-events-none">expand_more</span>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-space-xl py-space-sm bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md rounded-lg shadow-md transition-all flex items-center justify-center gap-space-xs whitespace-nowrap font-bold"
            >
              <span className="material-symbols-outlined text-lg">explore</span>
              <span>Explore Sprints</span>
            </button>
          </form>
        </div>

        {/* Quick Skill Tags */}
        <div className="flex flex-wrap items-center justify-center gap-space-xs mb-space-xl max-w-4xl">
          <span className="font-label-badge text-label-badge text-outline flex items-center gap-1 uppercase tracking-wider mr-space-xs">
            <span className="material-symbols-outlined text-error text-sm">local_fire_department</span> Trending
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchQuery(tag);
                onExploreClick();
              }}
              className="px-space-sm py-1 rounded bg-surface-container text-on-surface-variant hover:text-secondary hover:bg-surface-container-high font-label-sm text-label-sm transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Live Social Proof Metrics Row */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-space-md py-space-md px-space-lg rounded-xl bg-surface-container-lowest/80 backdrop-blur-md shadow-md border border-surface-container-high/40">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1">
              <span className="font-headline-md text-headline-md text-tertiary">94%</span>
              <span className="material-symbols-outlined text-tertiary text-lg">verified</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Completion Rate</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1">
              <span className="font-headline-md text-headline-md text-secondary">48,000+</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Sprinted Learners</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1">
              <span className="font-headline-md text-headline-md text-primary">4.9/5</span>
              <span className="material-symbols-outlined text-primary text-base">star</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Average Satisfaction</span>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1">
              <span className="font-headline-md text-headline-md text-on-surface">82%</span>
              <span className="material-symbols-outlined text-secondary text-base">trending_up</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Hired at Tier-1 Tech</span>
          </div>
        </div>
      </section>
    </div>
  );
}

