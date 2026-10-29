import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="w-full px-margin py-space-xl max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm">
        <div>
          <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">
            Cohort Wall of Proof
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs">
            Real Career Velocity in 14 Days
          </h2>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-tertiary">check_circle</span>
          <span className="font-label-sm text-label-sm text-on-surface">100% Verified Cohort Graduates</span>
        </div>
      </div>

      {/* Testimonial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        {/* Review 1 */}
        <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col justify-between border border-surface-container-high/40">
          <div>
            <div className="flex items-center gap-1 text-primary mb-space-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-base">star</span>
              ))}
            </div>
            <p className="font-body-md text-body-md text-on-surface mb-space-lg">
              "The Go Microservices sprint was more intense and valuable than my entire $18k university boot camp. Within 3 weeks of finishing, I aced the distributed systems loop at Stripe and got the offer."
            </p>
          </div>
          <div className="flex items-center gap-space-sm pt-space-md border-t border-surface-container-high/40">
            <img
              className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/40"
              alt="Alex Tremblay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc4_UTnsHPPWJSGJCGvlHFHrVnX92BNPpThENnoM_hMA8pCahJmFB9fWYpAdaalTVvaFHyJafeaICYqMZDxCd3N9Fj0jB3F8KN02OenCgPHll1veA-mmrlSiygs7bqmtO2sPTRpC-8fCOOa0z0LrNUY0oFEbmI6v2BFyY7jmpvVXoN_pe_2zYwuFLDGQrboiMFk6PMPVAdAu6FZcqPANJbN_jhU6zN0cqPqfRBJbLiUfkJoUTKxa7S"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-bold">Alex Tremblay</span>
              <span className="font-label-badge text-label-badge text-outline">Software Engineer @ Stripe • Cohort #42</span>
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col justify-between border border-surface-container-high/40">
          <div>
            <div className="flex items-center gap-1 text-primary mb-space-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-base">star</span>
              ))}
            </div>
            <p className="font-body-md text-body-md text-on-surface mb-space-lg">
              "Having a Staff Engineer from DeepMind dissect my multi-agent LangGraph repo at 11 PM changed everything. You don't just learn syntax; you learn engineering taste and production trade-offs."
            </p>
          </div>
          <div className="flex items-center gap-space-sm pt-space-md border-t border-surface-container-high/40">
            <img
              className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/40"
              alt="Priya Nair"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKdQeREEw9glfDWNVw5-NjuSVUW99y11Pf7zTZqqZqZvylcn-eiq2x39HDWO6615BtIEtntfhui3NqHWS4Fr9wG_H0zu2msvqcX2K1zkpThNTqrkNdUcN54JlZ8YTy-og-cfi4tlLrvZ2Nmwn7g3b6BgvFoIDUei4m_40PmGs_87XV-kdr1evDdeo3RlRQvi0Xdiv94ItyhIsgW350zQPp4Xdk26ARTVpSRmVqkBQu3Ke2mKcDExQP"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-bold">Priya Nair</span>
              <span className="font-label-badge text-label-badge text-outline">AI Lead @ Cohere • Cohort #51</span>
            </div>
          </div>
        </div>

        {/* Review 3 */}
        <div className="p-space-lg rounded-xl bg-surface-container-low shadow-md flex flex-col justify-between border border-surface-container-high/40">
          <div>
            <div className="flex items-center gap-1 text-primary mb-space-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-base">star</span>
              ))}
            </div>
            <p className="font-body-md text-body-md text-on-surface mb-space-lg">
              "The Design System Token sprint gave our frontend squad the exact playbook to migrate 400+ Figma components to React tokens. Saved our engineering team at least 4 months of refactoring."
            </p>
          </div>
          <div className="flex items-center gap-space-sm pt-space-md border-t border-surface-container-high/40">
            <img
              className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/40"
              alt="David Kim"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTaY4xmnoKLy7gpw8NhqYjjSI6CF9Net77So3jjU328JUIWulnuDwm4ajKGqGH_fNudLrl0ZCVKqGGmQ1SEmbriVyaDu0ZPzX3u8Y4jQjlEBXNmcMU27u4aVB9-9IMvOG_qjmhSKkDIayVEhCGddHQOh0cy_T50ROmbkYI-bzmfnJM3YIIbG6WI3hFNidHxr7JRxekBmrr9h9xc1mKeTpmd27CB1j8qaafV1EbkvErnEFwM7sshkpq"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-bold">David Kim</span>
              <span className="font-label-badge text-label-badge text-outline">Design Technologist @ Linear • Cohort #39</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

