import React from 'react';

export default function LearningPathsView({ onSelectSprint }) {
  const paths = [
    {
      id: 'ai-lead',
      title: 'Autonomous AI & LLM Systems Architect',
      duration: '6 Weeks (3 Consecutive Sprints)',
      level: 'Senior to Staff',
      role: 'Staff AI Engineer / Agent Architect',
      description: 'Master the end-to-end autonomous agent loop: from ReAct graph engines to LoRA fine-tuning and production vector memory indexing.',
      sprints: [
        'Autonomous AI Agents & Multi-Agent Swarms',
        'Fine-Tuning Open Source LLMs: LoRA & Unsloth',
        'High-Concurrency Systems & Distributed Backend with Go',
      ],
      avgSalary: '$225,000',
      badge: 'HIGHEST DEMAND',
    },
    {
      id: 'distributed-infra',
      title: 'Staff Distributed Systems & Infrastructure',
      duration: '4 Weeks (2 Sprints)',
      level: 'Mid to Principal',
      role: 'Principal Backend / Cloud Architect',
      description: 'Architect million-RPS microservices with Raft consensus, Kafka stream processing, and zero-downtime blue-green ArgoCD pipelines.',
      sprints: [
        'High-Concurrency Systems & Distributed Backend with Go',
        'Kubernetes Orchestration & Zero-Downtime GitOps',
        'Staff & Principal System Design Intensive',
      ],
      avgSalary: '$240,000',
      badge: 'TOP TIER COMP',
    },
    {
      id: 'web3-anchor',
      title: 'Solana High-Performance Web3 Engineer',
      duration: '4 Weeks (2 Sprints)',
      level: 'Intermediate to Advanced',
      role: 'Solana Smart Contract Core Dev',
      description: 'Program high-throughput, audit-grade smart contracts with Anchor Rust, PDAs, Cross-Program Invocations, and fuzz testing.',
      sprints: [
        'Solana Anchor Framework: Rust Program Engineering',
        'Real-time Data Streaming with Apache Flink & Kafka',
      ],
      avgSalary: '$210,000',
      badge: 'RAPID VELOCITY',
    },
    {
      id: 'design-eng',
      title: 'Design Technologist & Design Systems Lead',
      duration: '3 Weeks (2 Sprints)',
      level: 'All Levels',
      role: 'Design Technologist / Frontend Staff',
      description: 'Bridge Figma variables with automated Style Dictionary transformers, headless Radix primitives, and Tailwind v4 architecture.',
      sprints: [
        'Design System Architecture: Figma to Code Token Engine',
        'Next.js 15, React Server Actions & Edge Caching',
      ],
      avgSalary: '$185,000',
      badge: 'CROSS-FUNCTIONAL',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl min-h-[75vh]">
      <div className="text-center max-w-3xl mx-auto mb-space-xl">
        <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">
          Curated Career Pathways
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2 mb-3">
          Structured Sprint Paths to Staff &amp; Principal
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Sequenced sprint tracks engineered to take you from mid-level practitioner to senior technical leader in under 6 weeks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {paths.map((p) => (
          <div
            key={p.id}
            className="p-space-lg rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between hover:border-secondary/50 transition-all shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary font-label-badge text-label-badge font-bold">
                  {p.badge}
                </span>
                <span className="text-xs text-outline">{p.duration}</span>
              </div>

              <h3 className="font-headline-sm text-headline-sm text-on-surface text-xl font-bold mb-2">
                {p.title}
              </h3>
              <p className="text-body-sm text-on-surface-variant mb-space-md leading-relaxed">
                {p.description}
              </p>

              <div className="p-space-sm rounded-lg bg-surface-container mb-space-md">
                <span className="text-xs text-outline font-semibold uppercase block mb-1.5">
                  Included Cohort Sprints:
                </span>
                <ul className="space-y-1 text-xs text-on-surface">
                  {p.sprints.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary">arrow_right</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-space-md border-t border-surface-container-high/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-outline block">Benchmark Target Comp</span>
                <span className="text-lg font-bold text-tertiary">{p.avgSalary}</span>
              </div>

              <button
                type="button"
                onClick={() => onSelectSprint(p.sprints[0])}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs hover:bg-primary transition-colors flex items-center gap-1"
              >
                <span>Start First Sprint</span>
                <span className="material-symbols-outlined text-sm">bolt</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

