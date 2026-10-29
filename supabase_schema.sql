-- ==============================================================================
-- SkillSprint Production Supabase Database Schema & Seed Data
-- Run this in your Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/eomxvgnavqzpqeaklbvq/sql/new
-- ==============================================================================

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    domain TEXT NOT NULL DEFAULT 'ai', -- 'ai', 'backend', 'design', 'web3', 'data', 'executive'
    level TEXT NOT NULL DEFAULT 'Intermediate', -- 'Beginner', 'Intermediate', 'Advanced', 'All Levels'
    duration_days INTEGER NOT NULL DEFAULT 14,
    format TEXT NOT NULL DEFAULT 'Cohort-based Live Sprint', -- 'Cohort-based Live Sprint', 'Async Self-Paced Track', 'Weekend 48-hr Hackathon'
    price NUMERIC NOT NULL DEFAULT 199,
    original_price NUMERIC NOT NULL DEFAULT 299,
    instructor_name TEXT NOT NULL,
    instructor_role TEXT NOT NULL,
    instructor_avatar TEXT,
    rating NUMERIC NOT NULL DEFAULT 4.95,
    review_count INTEGER NOT NULL DEFAULT 1200,
    enrolled_count INTEGER NOT NULL DEFAULT 2500,
    image_url TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    cohort_start TEXT NOT NULL DEFAULT 'Starts Monday',
    seats_left INTEGER NOT NULL DEFAULT 6,
    verified_cert BOOLEAN NOT NULL DEFAULT true,
    is_spotlight BOOLEAN NOT NULL DEFAULT false,
    is_hot BOOLEAN NOT NULL DEFAULT false,
    syllabus JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    user_email TEXT NOT NULL,
    user_name TEXT,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    course_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'dropped'
    progress_pct INTEGER NOT NULL DEFAULT 10,
    current_day INTEGER NOT NULL DEFAULT 1,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. ADVISOR BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.advisor_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    target_goal TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'contacted'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. SUBSCRIBERS TABLE (Weekly Skill Drops)
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS) & OPEN SAFE ACCESS POLICIES
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Courses policies
DROP POLICY IF EXISTS "Public can view courses" ON public.courses;
CREATE POLICY "Public can view courses" ON public.courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert/update courses" ON public.courses;
CREATE POLICY "Anyone can insert/update courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);

-- Enrollments policies
DROP POLICY IF EXISTS "Public can view and create enrollments" ON public.enrollments;
CREATE POLICY "Public can view and create enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);

-- Advisor Bookings policies
DROP POLICY IF EXISTS "Public can create and view advisor bookings" ON public.advisor_bookings;
CREATE POLICY "Public can create and view advisor bookings" ON public.advisor_bookings FOR ALL USING (true) WITH CHECK (true);

-- Subscribers policies
DROP POLICY IF EXISTS "Public can subscribe" ON public.subscribers;
CREATE POLICY "Public can subscribe" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 6. SEED INITIAL COURSES DATA
-- ==============================================================================
INSERT INTO public.courses (
    title, subtitle, description, domain, level, duration_days, format,
    price, original_price, instructor_name, instructor_role, instructor_avatar,
    rating, review_count, enrolled_count, image_url, tags, cohort_start, seats_left,
    verified_cert, is_spotlight, is_hot, syllabus
) VALUES
-- Spotlight 1
(
    'Autonomous AI Agents & Multi-Agent Swarms',
    'LangGraph, CrewAI, Memory Stores & Dynamic Tool-Calling',
    'Construct self-healing multi-agent workflows with LangGraph, CrewAI, memory stores, and dynamic tool-calling architectures.',
    'ai',
    'Advanced',
    14,
    'Cohort-based Live Sprint',
    249,
    399,
    'Dr. Elena Vance',
    'Ex-DeepMind Lead',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3GKcw0MxutzwSt8evGzBQGPfaqHLSlLZzjEt3h8t6k2OdI1B1TS3sY1vfu4b-OUKGEFTNt3-K8VnIq9ZADYll9n9JpdDKt1Z7c3gf8tF_S5yp1jgg1m5q6MQWcK0h94fZEIIkTUA4n0wH2vTqspsbwvtGujMXfWwVGH4fycR9zVo1S_-SJJEgpW8_GNnKOesp6wvztajirlNC9GkDtZuZWXEkAXp5hdbPdttNCwcfAvf2M7z5Gipi',
    4.96,
    1400,
    3800,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAoj6Eie055J-XAwX1TiUz5b1BH4f9P6A43lkb6VsGdzynYY8j42fzLLndMViE_kg-oBJ7t7oxmXy2m_6YKPn-Pd57dW05lqnzuIW4Z6QoJftrO-l7f0du4Zf1Y0xWkwuLzfU50pANm-2rOOu2cOcE5ReiPtISK_nabIN4wkjEWUwX6_PnEAyGByRn1nS3PYVpJ9wnORoxD7XtCdA9a8HvWKGUs8Y2IGp-faKG6WsrdA0MBDxTOndt2',
    ARRAY['LangGraph', 'CrewAI', 'Qdrant Vector DB', 'Python 3.12'],
    'Starts Monday',
    4,
    true,
    true,
    true,
    '[
        {"day": "Day 1-3", "title": "ReAct Patterns & Graph State Machines", "details": "Building persistent stateful graphs with conditional edges and agent checkpoints."},
        {"day": "Day 4-7", "title": "Multi-Agent Swarm Orchestration", "details": "Hierarchical agent teams, supervisor architectures, and inter-agent communication bus."},
        {"day": "Day 8-11", "title": "Semantic Long-Term Memory & Vector Routing", "details": "Hybrid dense/sparse retrieval with Qdrant, episodic memory graphs, and sliding context."},
        {"day": "Day 12-14", "title": "Self-Healing & Production Deploy", "details": "Automated code execution in sandboxes, error recovery loops, and LangSmith tracing."}
    ]'::jsonb
),
-- Spotlight 2
(
    'High-Concurrency Systems & Distributed Backend with Go',
    'Goroutines, Raft Consensus, Kafka Partitions & gRPC',
    'Architect million-RPS pipelines using goroutine threadpools, raft consensus protocols, Kafka partitions, and gRPC streaming.',
    'backend',
    'Advanced',
    10,
    'Cohort-based Live Sprint',
    199,
    299,
    'Marcus Sterling',
    'Principal Eng @ Scale',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA1AuFbKjlGk0oa_NF154WKRfDr8g9KzbSc7IPPzVeMrLObY6OmAmehoiYkhoNMBQ9OGem7al24t47TSXrB8GWrQN6u_wrvWpGomFD-5SSqOAWEpAmzksUQgbyBWhG25m9bDwor4S2ugOXHJ4mRXr7LyvbjiCnkkJX35nK9jDpuVmQAK007kQvB3no8sWpllrrQf0sJKc6noFuxwdRd9T48xLkCofJW7H8htfpsDj2GmMagngR4JVEH',
    4.94,
    2200,
    5200,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB_fb_MXNlHm8O46o36pnkWDV-ud0eafx8zFI5pIMPLvS-TsoGMMUxgR2pMceeph9mj7l02VjRdvvdVirxqEcP-4lJZBjpKGrTCP39PS6YbnSwqMB4w5ueCydqxbOKl4OqMErUOZCEr7X4i1hkHHKBXN51EsF4PWumvZe5vnAPLRRKhuGw0y7umN0Uy52THJWp_yh_sdL8-p3-YxwcjWJuGQaF4XjLbGr8mSiHsUpEz8szkMhic8QcM',
    ARRAY['Golang 1.23', 'gRPC', 'Apache Kafka', 'Raft Protocol'],
    'Starts Wednesday',
    5,
    true,
    true,
    false,
    '[
        {"day": "Day 1-2", "title": "Go Memory Model & Lockless Concurrency", "details": "Atomic primitives, channels under the hood, and low-latency ring buffers."},
        {"day": "Day 3-5", "title": "Distributed Consensus & Raft", "details": "Leader election, log replication, and split-brain resolution."},
        {"day": "Day 6-8", "title": "High-Throughput Kafka Ingestion", "details": "Zero-copy buffering, batching pipelines, and backpressure mitigation."},
        {"day": "Day 9-10", "title": "gRPC Streaming & Benchmarking", "details": "Protobuf serialization optimization, pprof profiling, and 1M RPS stress test."}
    ]'::jsonb
),
-- Spotlight 3
(
    'Design System Architecture: Figma to Code Token Engine',
    'Style Dictionary, Tailwind v4, Headless Components & Zero-Drift',
    'Bridging the design-to-engineering chasm: style dictionary pipelines, zero-drift Figma variables, and accessible headless components.',
    'design',
    'All Levels',
    7,
    'Cohort-based Live Sprint',
    149,
    220,
    'Sophie Chen',
    'Design Director',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlDUBbqVQRe4XhGt4FQpI_1D8Asr8qy1dKgRmeEf-9v74GwSxD1CI-E3ZeOThuMxo35ziBwKUyKT1OC3yIV_dCmTCZJe1vvJo6wZCw2dp8kFH_5IRc61NWDHLLVsdLcPInVVDb-0tsHK2WkiRl6Vd8jFE9cUN8MSqaT2wHd4eROEsvOcN1p18kYzu7-GForgm3CwM9m2Mcl-OXRw3vro-QlqFFgIrEnSzicUE0955vOyw0v-Tr4UGi',
    4.98,
    3100,
    6400,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC9kcBE7cfh6DJy-qMFHZwkCO67MDAvDm3bdpj_S-8wxBMyIXkBDuuOzC4dyyJhO78Lc7RkiJLfcWc4tDg5My6YRabgRxWIt77VlRAp2IBhT_Y9yk2UuF1YzIQZQ3kB40AKMIKjkUF1M6WYQshLgo3IZwp0zMTJLPY02vo454mCVwVXg71EgS0524aaD6ITr-Sn6z5dKNDeVJl2TRvZQj5f-lE83kPN7NdD1z0j7R3knnQ6p3Oaqf2I',
    ARRAY['Figma Tokens', 'Tailwind v4', 'Storybook', 'React Radix'],
    'Starts Friday',
    8,
    true,
    true,
    false,
    '[
        {"day": "Day 1-2", "title": "Token Taxonomy & W3C Token Specs", "details": "Structuring color, typography, elevation, and motion tokens across multi-brand sets."},
        {"day": "Day 3-4", "title": "Figma Variables to CI/CD Pipeline", "details": "Automated sync using GitHub Actions, Figma REST API, and Style Dictionary transforms."},
        {"day": "Day 5-6", "title": "Accessible Headless Primitives", "details": "Building WCAG 2.1 AAA accessible primitives with Radix UI and Tailwind CSS."},
        {"day": "Day 7", "title": "Storybook Docs & NPM Package Release", "details": "Publishing tokenized component library with automated visual regression tests."}
    ]'::jsonb
),
-- Catalog 1
(
    'Next.js 15, React Server Actions & Edge Caching',
    'Partial Prerendering, Turbopack, and Optimistic UI',
    'Ship high-throughput enterprise apps with Partial Prerendering (PPR), Turbopack, and automated optimistic mutations.',
    'backend',
    'Intermediate',
    14,
    'Cohort-based Live Sprint',
    179,
    260,
    'Julian Ramos',
    'Vercel Community MVP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA1AuFbKjlGk0oa_NF154WKRfDr8g9KzbSc7IPPzVeMrLObY6OmAmehoiYkhoNMBQ9OGem7al24t47TSXrB8GWrQN6u_wrvWpGomFD-5SSqOAWEpAmzksUQgbyBWhG25m9bDwor4S2ugOXHJ4mRXr7LyvbjiCnkkJX35nK9jDpuVmQAK007kQvB3no8sWpllrrQf0sJKc6noFuxwdRd9T48xLkCofJW7H8htfpsDj2GmMagngR4JVEH',
    4.97,
    890,
    1420,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAp2TSLe1TRfULohs7pA-Yx5v5ToXV8BqtUjCtN4LDRsrnrIGS8aOBRKMIySLou18ywf4vek9-sH9tR1kFXE7CdZhNSTSJWP-dd57PDJ-Z2qTBQ1mLBgg-Xxqsjo2fbIX_kdy5zIpIWGBaMKFUC9CE1qKZQEghyLzG-_edwEiz4YcGrJ3y6x3oPXQIdUw320272tPFo6amfzRcG1tfxX66rpFzOF2km_T0t0CUXJ-w0leI-DvCkujIh',
    ARRAY['Next.js 15', 'React 19', 'Server Actions', 'Turbopack'],
    'Starts Monday',
    3,
    true,
    false,
    false,
    '[
        {"day": "Day 1-4", "title": "Next.js 15 Architecture & PPR", "details": "Understanding Partial Prerendering and hybrid static/dynamic rendering models."},
        {"day": "Day 5-8", "title": "Server Actions & Optimistic Updates", "details": "Zero-API layer mutations with automatic cache revalidation and rollbacks."},
        {"day": "Day 9-11", "title": "Edge Middleware & Global Caching", "details": "Geographic routing, sub-50ms TTFB at the edge, and stale-while-revalidate."},
        {"day": "Day 12-14", "title": "Production Deployment & Observability", "details": "OpenTelemetry instrumentation, Core Web Vitals profiling, and Vercel edge deployment."}
    ]'::jsonb
),
-- Catalog 2
(
    'Kubernetes Orchestration & Zero-Downtime GitOps',
    'ArgoCD, Helm Charts, KEDA Autoscaling & Blue-Green Rollouts',
    'Master ArgoCD, Helm chart templating, autoscaling clusters with KEDA, and robust blue-green deploy rollouts.',
    'backend',
    'Intermediate',
    10,
    'Cohort-based Live Sprint',
    189,
    280,
    'Viktor Vance',
    'Site Reliability Lead',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDc4_UTnsHPPWJSGJCGvlHFHrVnX92BNPpThENnoM_hMA8pCahJmFB9fWYpAdaalTVvaFHyJafeaICYqMZDxCd3N9Fj0jB3F8KN02OenCgPHll1veA-mmrlSiygs7bqmtO2sPTRpC-8fCOOa0z0LrNUY0oFEbmI6v2BFyY7jmpvVXoN_pe_2zYwuFLDGQrboiMFk6PMPVAdAu6FZcqPANJbN_jhU6zN0cqPqfRBJbLiUfkJoUTKxa7S',
    4.93,
    1100,
    2900,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCRGPoNNtQxX5gaohkFo_Bmlp9kQ89ezQQ-ykBxwWanC7GVMx54OPYVDO9-ybN6lI6nCfQTTc6JHogwfWV7c8LgokJjPqQxBBC8vp5FH9NFjRfqvZYIt-1CpXhJoHPuUyGiJz67OvbRCPZpair6ArdIooJvZR3TIbxZzLAlzSN78Obr8kI-KmHA8xpEKsGQYuquR3zyYO5fPGz5e-bKPZprxg4kDIQxz_ojDOnJkH7LRxSJVGek8IOM',
    ARRAY['Kubernetes', 'ArgoCD', 'Helm', 'KEDA'],
    'Starts Friday',
    7,
    true,
    false,
    false,
    '[
        {"day": "Day 1-3", "title": "Cluster Architecture & Declarative Manifests", "details": "Custom Resource Definitions, namespace isolation, and production networking."},
        {"day": "Day 4-6", "title": "GitOps Pipelines with ArgoCD", "details": "Automated sync, configuration drift detection, and multi-environment promotions."},
        {"day": "Day 7-8", "title": "Event-Driven Autoscaling with KEDA", "details": "Scaling based on Kafka queue depth, Prometheus metrics, and CPU/memory pressure."},
        {"day": "Day 9-10", "title": "Canary & Blue-Green Release Engineering", "details": "Argo Rollouts, automated metric analysis, and zero-impact rollbacks."}
    ]'::jsonb
),
-- Catalog 3
(
    'Solana Anchor Framework: Rust Program Engineering',
    'Smart Contracts, Account Validation, CPI & TS Integration',
    'Write gas-optimized, audit-ready smart contracts in Anchor Rust with comprehensive TypeScript integration tests.',
    'web3',
    'Intermediate',
    14,
    'Async Self-Paced Track',
    229,
    340,
    'Kaito Tanaka',
    'Core Contributor @ Solana',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBTaY4xmnoKLy7gpw8NhqYjjSI6CF9Net77So3jjU328JUIWulnuDwm4ajKGqGH_fNudLrl0ZCVKqGGmQ1SEmbriVyaDu0ZPzX3u8Y4jQjlEBXNmcMU27u4aVB9-9IMvOG_qjmhSKkDIayVEhCGddHQOh0cy_T50ROmbkYI-bzmfnJM3YIIbG6WI3hFNidHxr7JRxekBmrr9h9xc1mKeTpmd27CB1j8qaafV1EbkvErnEFwM7sshkpq',
    4.95,
    620,
    950,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBokFczO3g3jE2Ku4vivSHgbSaUYzXTGoF90EryVKO8K2l1oPaKLeUkmYsYFghwijbFZyLAqmRYQelZoZn8z83kybcbtv-yOikTfFEQBdH4olaqsW7WzSvw4-0ATrN4wsxFyAt1d_D-ueZCi1vNB9-mPJ192W3RucX-pPzT6SCinxRgf6k9jiHtBbyKGFE8mmZ4NbJDwxfsadsx8-lsg_qijZGGQhAEcy2Q1nkk6BgnvsGbYMOtzNEd',
    ARRAY['Solana', 'Anchor', 'Rust', 'TypeScript'],
    'Starts Monday',
    9,
    true,
    false,
    false,
    '[
        {"day": "Day 1-4", "title": "Solana Runtime & Account Model", "details": "PDAs (Program Derived Addresses), rent exemption, and account serialization."},
        {"day": "Day 5-8", "title": "Anchor Macros & Safe Instructions", "details": "Context validation, constraint verification, and reentrancy attack prevention."},
        {"day": "Day 9-11", "title": "Cross-Program Invocations (CPI) & SPL Tokens", "details": "Interacting with token-2022 programs, minting, and escrow vault mechanisms."},
        {"day": "Day 12-14", "title": "Bankrun Testing & Mainnet Audit Readiness", "details": "High-speed local test runner, fuzz testing, and formal verification."}
    ]'::jsonb
),
-- Catalog 4
(
    'Real-time Data Streaming with Apache Flink & Kafka',
    'Event-driven Processing, Stateful Aggregations & Latency Tuning',
    'Build event-driven stream processing engines, manage stateful aggregations, and optimize end-to-end latency.',
    'data',
    'Intermediate',
    7,
    'Weekend 48-hr Hackathon',
    169,
    250,
    'Nadia Brooks',
    'Streaming Data Architect',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKdQeREEw9glfDWNVw5-NjuSVUW99y11Pf7zTZqqZqZvylcn-eiq2x39HDWO6615BtIEtntfhui3NqHWS4Fr9wG_H0zu2msvqcX2K1zkpThNTqrkNdUcN54JlZ8YTy-og-cfi4tlLrvZ2Nmwn7g3b6BgvFoIDUei4m_40PmGs_87XV-kdr1evDdeo3RlRQvi0Xdiv94ItyhIsgW350zQPp4Xdk26ARTVpSRmVqkBQu3Ke2mKcDExQP',
    4.91,
    540,
    880,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCsmzklJVRA_cY10Ff_1S2Hn79kDucfQy-eygquVZjX2avJ4ao1oSzktwSnhT9HJEUl6p1dcU4o7SzbFJJ6AJnhX8O9LvciljjXIVYjDaHw4RcwaKJcFrFkGjRqZvild-Art8WMOa_3GReBStJyMx84p-KYYSdIAw0PZ1rXfi9QScX-lBdQJdOmRLRP_LdAMJOIP4IcvLag3UqTZ1ZoNtbnAjCeJWJMhmdWkq4L8k43q8T9ywFtO11I',
    ARRAY['Apache Flink', 'Apache Kafka', 'Java/Scala', 'RocksDB'],
    'Starts Weekend',
    5,
    true,
    false,
    false,
    '[
        {"day": "Day 1-2", "title": "Kafka Partitioning & Watermarks", "details": "Event-time vs processing-time semantics, late event handling, and watermark strategies."},
        {"day": "Day 3-4", "title": "Stateful Stream Operators & RocksDB", "details": "Keyed state, tumbling and sliding windows, and state snapshot checkpointing."},
        {"day": "Day 5-6", "title": "Fault Tolerance & Exactly-Once Semantics", "details": "Two-phase commits, Kafka transaction coordinators, and recovery under node failure."},
        {"day": "Day 7", "title": "Production Streaming Dashboard", "details": "Grafana stream analytics, throughput benchmarks, and backpressure diagnostic."}
    ]'::jsonb
),
-- Catalog 5
(
    'Fine-Tuning Open Source LLMs: LoRA & Unsloth',
    'QLoRA, Synthetic Datasets, vLLM Inference & Hugging Face',
    'Fine-tune Llama 3 and Mistral models on specialized synthetic datasets using QLoRA, vLLM, and Hugging Face.',
    'ai',
    'Advanced',
    14,
    'Cohort-based Live Sprint',
    279,
    399,
    'Arjun Patel',
    'Applied ML Researcher',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC3GKcw0MxutzwSt8evGzBQGPfaqHLSlLZzjEt3h8t6k2OdI1B1TS3sY1vfu4b-OUKGEFTNt3-K8VnIq9ZADYll9n9JpdDKt1Z7c3gf8tF_S5yp1jgg1m5q6MQWcK0h94fZEIIkTUA4n0wH2vTqspsbwvtGujMXfWwVGH4fycR9zVo1S_-SJJEgpW8_GNnKOesp6wvztajirlNC9GkDtZuZWXEkAXp5hdbPdttNCwcfAvf2M7z5Gipi',
    4.99,
    2400,
    3600,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzA9Tb3fvBOIhDh2N67EUTFXGef0cp8H5D7pgP2BNXTKuzbpHZ3MkMV48LutqcvPFk_G3Mh_jtNQhyYENnnuguycYJbJcM1OGkKDnM9HcysqIXKVCBiHq754TaFbOuSRvR_cUBUlmoU_MoTiY5vOjS_MDYj6SSNkGwy85HignC0tR9iyE7AST7vZDb5m1WoxWW4XZNv5Lo6wI1KAwn1HytoRCtuU4G9D1jbf9V0JgS924oZdzXMZQ7',
    ARRAY['Unsloth', 'QLoRA', 'vLLM', 'Hugging Face'],
    'Starts Monday',
    2,
    true,
    false,
    true,
    '[
        {"day": "Day 1-3", "title": "Dataset Curation & Synthetic Generation", "details": "De-duplicating instructions, formatting Alpaca/ShareGPT schemas, and quality filtering."},
        {"day": "Day 4-7", "title": "Quantized Low-Rank Adaptation (QLoRA)", "details": "4-bit NormalFloat weights, rank hyperparameter tuning, and gradient checkpointing."},
        {"day": "Day 8-11", "title": "Alignment & Direct Preference Optimization (DPO)", "details": "Loss function evaluation, pair-wise preference training, and hallucination reduction."},
        {"day": "Day 12-14", "title": "vLLM Production Serving & Quantization", "details": "PagedAttention optimization, AWQ/GGUF exports, and OpenAI-compatible inference endpoint."}
    ]'::jsonb
),
-- Catalog 6
(
    'Staff & Principal System Design Intensive',
    'Global CDN Consistency, Sharded Databases & Trade-Off Defense',
    'Crack L6+ technical architecture interviews: global CDN consistency, sharded CockroachDB, and trade-off defense.',
    'backend',
    'Advanced',
    14,
    'Cohort-based Live Sprint',
    219,
    320,
    'Seraphina Vance',
    'Distinguished Engineer',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlDUBbqVQRe4XhGt4FQpI_1D8Asr8qy1dKgRmeEf-9v74GwSxD1CI-E3ZeOThuMxo35ziBwKUyKT1OC3yIV_dCmTCZJe1vvJo6wZCw2dp8kFH_5IRc61NWDHLLVsdLcPInVVDb-0tsHK2WkiRl6Vd8jFE9cUN8MSqaT2wHd4eROEsvOcN1p18kYzu7-GForgm3CwM9m2Mcl-OXRw3vro-QlqFFgIrEnSzicUE0955vOyw0v-Tr4UGi',
    4.96,
    1800,
    2100,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAbh5Z1dLo4GSeiAeuLKOFZIyVepNG5Tl4hEFmg2QzGgHAJJCnZt4RAx4rrgosmQTtWaAfRLUvJRMU7HdxRnaXRAFe2-jVsLJHzBKt64eVzKE1A_QKZKzKEEdG6xLdB1LFX16aTmhRYZw4mqKn8SzHq8Z-OwDiH-mN3vP5I8sFHSbJjSMmf7RT56nODeAvJJv_DzbSAWaCQ8ve67SjPLq1WTUCejojVvLs88XSFQAsAHUgY-Oko7BEq',
    ARRAY['Distributed Systems', 'CAP Theorem', 'CockroachDB', 'CDN Edge'],
    'Starts Monday',
    6,
    true,
    false,
    false,
    '[
        {"day": "Day 1-4", "title": "Distributed Consensus & CAP Trade-Offs", "details": "Linearizability vs eventual consistency, vector clocks, and PACELC theorem."},
        {"day": "Day 5-8", "title": "Data Partitioning & Global Replication", "details": "Consistent hashing, range vs hash sharding, and geo-distributed SQL."},
        {"day": "Day 9-11", "title": "Observability, Rate-Limiting & Resiliency", "details": "Distributed tracing, token buckets, circuit breakers, and bulkhead patterns."},
        {"day": "Day 12-14", "title": "Live Mock Architecture Defense", "details": "Whiteboarding complex systems under pressure and defending non-functional trade-offs."}
    ]'::jsonb
);

