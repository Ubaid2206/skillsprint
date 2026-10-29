import React, { useState, useEffect } from 'react';
import {
  checkSupabaseHealth,
  createCourse,
  updateCourse,
  deleteCourse,
  getEnrollments,
  updateEnrollmentStatus,
  getAdvisorBookings,
  updateAdvisorBookingStatus,
  getSubscribers,
} from '../lib/api';
import { SUPABASE_URL } from '../lib/supabaseClient';

export default function AdminPanel({ courses, onRefreshCourses }) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'enrollments', 'bookings', 'subscribers', 'schema'
  const [healthStatus, setHealthStatus] = useState({ connected: false, message: 'Checking...' });
  const [enrollments, setEnrollments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Course Modal state
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    domain: 'ai',
    level: 'Intermediate',
    duration_days: 14,
    format: 'Cohort-based Live Sprint',
    price: 199,
    original_price: 299,
    instructor_name: 'Dr. Elena Vance',
    instructor_role: 'Senior Staff Engineer',
    instructor_avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3GKcw0MxutzwSt8evGzBQGPfaqHLSlLZzjEt3h8t6k2OdI1B1TS3sY1vfu4b-OUKGEFTNt3-K8VnIq9ZADYll9n9JpdDKt1Z7c3gf8tF_S5yp1jgg1m5q6MQWcK0h94fZEIIkTUA4n0wH2vTqspsbwvtGujMXfWwVGH4fycR9zVo1S_-SJJEgpW8_GNnKOesp6wvztajirlNC9GkDtZuZWXEkAXp5hdbPdttNCwcfAvf2M7z5Gipi',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoj6Eie055J-XAwX1TiUz5b1BH4f9P6A43lkb6VsGdzynYY8j42fzLLndMViE_kg-oBJ7t7oxmXy2m_6YKPn-Pd57dW05lqnzuIW4Z6QoJftrO-l7f0du4Zf1Y0xWkwuLzfU50pANm-2rOOu2cOcE5ReiPtISK_nabIN4wkjEWUwX6_PnEAyGByRn1nS3PYVpJ9wnORoxD7XtCdA9a8HvWKGUs8Y2IGp-faKG6WsrdA0MBDxTOndt2',
    tags: 'LangGraph, Python, Vector DB',
    cohort_start: 'Starts Monday',
    seats_left: 6,
    verified_cert: true,
    is_spotlight: false,
    is_hot: false,
  });

  const [copiedSql, setCopiedSql] = useState(false);

  // Fetch initial admin data
  useEffect(() => {
    loadAllAdminData();
  }, []);

  const loadAllAdminData = async () => {
    setLoading(true);
    const health = await checkSupabaseHealth();
    setHealthStatus(health);

    const [enr, bkg, subs] = await Promise.all([
      getEnrollments(),
      getAdvisorBookings(),
      getSubscribers(),
    ]);
    setEnrollments(enr || []);
    setBookings(bkg || []);
    setSubscribers(subs || []);
    setLoading(false);
  };

  const openNewCourseModal = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      domain: 'ai',
      level: 'Intermediate',
      duration_days: 14,
      format: 'Cohort-based Live Sprint',
      price: 199,
      original_price: 299,
      instructor_name: 'Staff Architect',
      instructor_role: 'Ex-Google / Stripe',
      instructor_avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1AuFbKjlGk0oa_NF154WKRfDr8g9KzbSc7IPPzVeMrLObY6OmAmehoiYkhoNMBQ9OGem7al24t47TSXrB8GWrQN6u_wrvWpGomFD-5SSqOAWEpAmzksUQgbyBWhG25m9bDwor4S2ugOXHJ4mRXr7LyvbjiCnkkJX35nK9jDpuVmQAK007kQvB3no8sWpllrrQf0sJKc6noFuxwdRd9T48xLkCofJW7H8htfpsDj2GmMagngR4JVEH',
      image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_fb_MXNlHm8O46o36pnkWDV-ud0eafx8zFI5pIMPLvS-TsoGMMUxgR2pMceeph9mj7l02VjRdvvdVirxqEcP-4lJZBjpKGrTCP39PS6YbnSwqMB4w5ueCydqxbOKl4OqMErUOZCEr7X4i1hkHHKBXN51EsF4PWumvZe5vnAPLRRKhuGw0y7umN0Uy52THJWp_yh_sdL8-p3-YxwcjWJuGQaF4XjLbGr8mSiHsUpEz8szkMhic8QcM',
      tags: 'Docker, Microservices, CI/CD',
      cohort_start: 'Starts Next Monday',
      seats_left: 6,
      verified_cert: true,
      is_spotlight: false,
      is_hot: false,
    });
    setCourseModalOpen(true);
  };

  const openEditCourseModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      subtitle: course.subtitle || '',
      description: course.description || '',
      domain: course.domain || 'ai',
      level: course.level || 'Intermediate',
      duration_days: course.duration_days || 14,
      format: course.format || 'Cohort-based Live Sprint',
      price: course.price || 199,
      original_price: course.original_price || 299,
      instructor_name: course.instructor_name || '',
      instructor_role: course.instructor_role || '',
      instructor_avatar: course.instructor_avatar || '',
      image_url: course.image_url || '',
      tags: Array.isArray(course.tags) ? course.tags.join(', ') : (course.tags || ''),
      cohort_start: course.cohort_start || 'Starts Monday',
      seats_left: course.seats_left || 6,
      verified_cert: course.verified_cert ?? true,
      is_spotlight: !!course.is_spotlight,
      is_hot: !!course.is_hot,
    });
    setCourseModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      tags: tagsArray,
      price: Number(formData.price),
      original_price: Number(formData.original_price),
      duration_days: Number(formData.duration_days),
      seats_left: Number(formData.seats_left),
    };

    if (editingCourse) {
      await updateCourse(editingCourse.id, payload);
    } else {
      await createCourse(payload);
    }

    setCourseModalOpen(false);
    onRefreshCourses();
  };

  const handleDeleteCourse = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteCourse(id);
      onRefreshCourses();
    }
  };

  const handleEnrollmentStatusChange = async (id, status) => {
    await updateEnrollmentStatus(id, status);
    const updated = enrollments.map((e) => (e.id === id ? { ...e, status } : e));
    setEnrollments(updated);
  };

  const handleBookingStatusChange = async (id, status) => {
    await updateAdvisorBookingStatus(id, status);
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
  };

  const copySqlToClipboard = () => {
    const sqlCode = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    domain TEXT NOT NULL DEFAULT 'ai',
    level TEXT NOT NULL DEFAULT 'Intermediate',
    duration_days INTEGER NOT NULL DEFAULT 14,
    format TEXT NOT NULL DEFAULT 'Cohort-based Live Sprint',
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

CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    user_email TEXT NOT NULL,
    user_name TEXT,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    course_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    progress_pct INTEGER NOT NULL DEFAULT 10,
    current_day INTEGER NOT NULL DEFAULT 1,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.advisor_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    target_goal TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public bookings" ON public.advisor_bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public subscribers" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-space-xl min-h-[80vh]">
      {/* Title & Connection Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-space-lg pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-secondary">admin_panel_settings</span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider">
              Management Console
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">SkillSprint Admin Center</h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Manage micro-bootcamps, student enrollments, diagnostic bookings, and Supabase integration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openNewCourseModal}
            className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold text-sm hover:bg-primary transition-all flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            <span>Add New Sprint</span>
          </button>
          <button
            type="button"
            onClick={loadAllAdminData}
            className="p-2 rounded-lg bg-surface-container text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Refresh Data"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
          </button>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high mb-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${healthStatus.connected ? 'bg-tertiary animate-pulse' : 'bg-error'}`} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-on-surface">Supabase Target:</span>
              <span className="text-xs font-mono text-secondary">{SUPABASE_URL}</span>
              {healthStatus.tablesExist ? (
                <span className="px-2 py-0.5 rounded bg-tertiary/20 text-tertiary text-[10px] font-bold">
                  LIVE DATABASE TABLES ACTIVE
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-[10px] font-bold">
                  CONNECTED (CACHE FALLBACK ACTIVE)
                </span>
              )}
            </div>
            <p className="text-xs text-outline mt-0.5">{healthStatus.message}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copySqlToClipboard}
            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-bright text-xs text-on-surface flex items-center gap-1.5 border border-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-sm">{copiedSql ? 'check' : 'content_copy'}</span>
            <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
          </button>
          <a
            href="https://supabase.com/dashboard/project/eomxvgnavqzpqeaklbvq/sql/new"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-primary-container/20 text-primary hover:bg-primary-container hover:text-on-primary-container text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <span>Open Supabase SQL Editor</span>
            <span className="material-symbols-outlined text-xs">launch</span>
          </a>
        </div>
      </div>

      {/* 4 Metric Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md mb-space-xl">
        <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high">
          <span className="text-xs text-outline uppercase font-semibold">Active Sprints</span>
          <div className="text-2xl font-bold text-on-surface mt-1">{courses.length}</div>
          <span className="text-[11px] text-secondary">Curated micro-bootcamps</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high">
          <span className="text-xs text-outline uppercase font-semibold">Total Enrollments</span>
          <div className="text-2xl font-bold text-tertiary mt-1">{enrollments.length}</div>
          <span className="text-[11px] text-outline">Across all live cohorts</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high">
          <span className="text-xs text-outline uppercase font-semibold">Advisor Leads</span>
          <div className="text-2xl font-bold text-secondary mt-1">{bookings.length}</div>
          <span className="text-[11px] text-outline">15-min diagnostic calls</span>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high">
          <span className="text-xs text-outline uppercase font-semibold">Subscribers</span>
          <div className="text-2xl font-bold text-primary mt-1">{subscribers.length}</div>
          <span className="text-[11px] text-outline">Weekly skill drops</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container-high pb-3 mb-space-lg overflow-x-auto">
        {[
          { id: 'courses', label: 'Sprints & Curriculum', icon: 'auto_stories', count: courses.length },
          { id: 'enrollments', label: 'Enrollments', icon: 'bolt', count: enrollments.length },
          { id: 'bookings', label: 'Advisor Bookings', icon: 'calendar_month', count: bookings.length },
          { id: 'subscribers', label: 'Newsletter', icon: 'mail', count: subscribers.length },
          { id: 'schema', label: 'Supabase SQL Setup', icon: 'database' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isActive ? 'bg-surface-container text-on-surface' : 'bg-surface-container-high text-outline'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: COURSES MANAGEMENT */}
      {activeTab === 'courses' && (
        <div className="rounded-xl bg-surface-container-low border border-surface-container-high overflow-hidden shadow-lg">
          <div className="p-4 border-b border-surface-container-high flex items-center justify-between">
            <span className="font-semibold text-on-surface text-sm">All Sprints & Courses</span>
            <button
              type="button"
              onClick={openNewCourseModal}
              className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
            >
              + Create Sprint
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-outline uppercase font-semibold border-b border-surface-container-high">
                <tr>
                  <th className="py-3 px-4">Sprint</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Instructor</th>
                  <th className="py-3 px-4">Spotlight</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/60">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.image_url}
                          alt=""
                          className="w-10 h-8 rounded object-cover bg-surface-container-high"
                        />
                        <div>
                          <p className="font-bold text-on-surface line-clamp-1 max-w-xs">{course.title}</p>
                          <p className="text-[11px] text-outline">{course.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 uppercase font-semibold text-secondary">{course.domain}</td>
                    <td className="py-3 px-4">{course.duration_days} Days</td>
                    <td className="py-3 px-4 font-bold text-on-surface">${course.price}</td>
                    <td className="py-3 px-4 text-outline">{course.instructor_name}</td>
                    <td className="py-3 px-4">
                      {course.is_spotlight ? (
                        <span className="px-2 py-0.5 rounded bg-tertiary/20 text-tertiary font-bold text-[10px]">
                          SPOTLIGHT
                        </span>
                      ) : (
                        <span className="text-outline text-[11px]">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEditCourseModal(course)}
                        className="p-1 rounded text-primary hover:bg-surface-container mr-2"
                        title="Edit Course"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(course.id, course.title)}
                        className="p-1 rounded text-error hover:bg-error-container/20"
                        title="Delete Course"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ENROLLMENTS */}
      {activeTab === 'enrollments' && (
        <div className="rounded-xl bg-surface-container-low border border-surface-container-high overflow-hidden shadow-lg">
          <div className="p-4 border-b border-surface-container-high">
            <span className="font-semibold text-on-surface text-sm">Active & Past Enrollments</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-outline uppercase font-semibold border-b border-surface-container-high">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course Enrolled</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Enrolled At</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/60">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-outline">
                      No enrollments found yet.
                    </td>
                  </tr>
                ) : (
                  enrollments.map((enr) => (
                    <tr key={enr.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-on-surface">{enr.user_name || 'Student'}</p>
                        <p className="text-outline text-[11px]">{enr.user_email}</p>
                      </td>
                      <td className="py-3 px-4 font-semibold text-on-surface">{enr.course_title}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                            <div
                              className="h-full bg-tertiary"
                              style={{ width: `${enr.progress_pct || 20}%` }}
                            />
                          </div>
                          <span>{enr.progress_pct || 20}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-outline font-mono text-[11px]">
                        {new Date(enr.enrolled_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={enr.status}
                          onChange={(e) => handleEnrollmentStatusChange(enr.id, e.target.value)}
                          className="bg-surface-container text-on-surface text-xs rounded px-2 py-1 border border-surface-container-highest focus:outline-none"
                        >
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="dropped">Dropped</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ADVISOR BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="rounded-xl bg-surface-container-low border border-surface-container-high overflow-hidden shadow-lg">
          <div className="p-4 border-b border-surface-container-high">
            <span className="font-semibold text-on-surface text-sm">
              15-Min Diagnostic Call Inquiries
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container text-outline uppercase font-semibold border-b border-surface-container-high">
                <tr>
                  <th className="py-3 px-4">Prospect</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Target Goal</th>
                  <th className="py-3 px-4">Booked Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/60">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-outline">
                      No advisor calls booked yet.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-on-surface">{b.full_name}</td>
                      <td className="py-3 px-4 text-secondary font-mono">{b.email}</td>
                      <td className="py-3 px-4 text-on-surface-variant">{b.target_goal}</td>
                      <td className="py-3 px-4 text-outline font-mono text-[11px]">
                        {new Date(b.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleBookingStatusChange(b.id, e.target.value)}
                          className="bg-surface-container text-on-surface text-xs rounded px-2 py-1 border border-surface-container-highest focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="contacted">Contacted</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="rounded-xl bg-surface-container-low border border-surface-container-high overflow-hidden shadow-lg max-w-2xl">
          <div className="p-4 border-b border-surface-container-high">
            <span className="font-semibold text-on-surface text-sm">
              Weekly Skill Drops Subscribers ({subscribers.length})
            </span>
          </div>

          <div className="divide-y divide-surface-container-high/60 text-xs">
            {subscribers.map((sub, idx) => (
              <div key={sub.id || idx} className="p-3 flex items-center justify-between">
                <span className="font-mono text-on-surface">{sub.email}</span>
                <span className="text-outline text-[11px] font-mono">
                  {new Date(sub.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUPABASE SQL SETUP HELPER */}
      {activeTab === 'schema' && (
        <div className="rounded-xl bg-surface-container-low border border-surface-container-high p-space-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Supabase SQL Schema Runner</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                To run live queries without mock fallbacks, copy and paste this SQL into your Supabase Dashboard SQL editor.
              </p>
            </div>
            <button
              type="button"
              onClick={copySqlToClipboard}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold text-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">{copiedSql ? 'check' : 'content_copy'}</span>
              <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-surface-container-lowest text-on-surface-variant font-mono text-xs overflow-x-auto max-h-96 border border-surface-container-high">
{`-- Run this script in https://supabase.com/dashboard/project/eomxvgnavqzpqeaklbvq/sql/new

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    domain TEXT NOT NULL DEFAULT 'ai',
    level TEXT NOT NULL DEFAULT 'Intermediate',
    duration_days INTEGER NOT NULL DEFAULT 14,
    format TEXT NOT NULL DEFAULT 'Cohort-based Live Sprint',
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

CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    user_email TEXT NOT NULL,
    user_name TEXT,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    course_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    progress_pct INTEGER NOT NULL DEFAULT 10,
    current_day INTEGER NOT NULL DEFAULT 1,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.advisor_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    target_goal TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public enrollments" ON public.enrollments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public bookings" ON public.advisor_bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public subscribers" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);`}
          </pre>
        </div>
      )}

      {/* CREATE / EDIT COURSE MODAL */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl p-space-lg my-8">
            <div className="flex items-center justify-between mb-space-md border-b border-surface-container-high/60 pb-3">
              <h3 className="font-headline-sm text-headline-sm text-on-surface text-xl font-bold">
                {editingCourse ? 'Edit Micro-Bootcamp' : 'Add New Sprint Micro-Bootcamp'}
              </h3>
              <button
                type="button"
                onClick={() => setCourseModalOpen(false)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Sprint Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. LLM Multi-Agent Orchestration"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-outline font-semibold mb-1">Subtitle / Key Tech</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. LangGraph, CrewAI & Vector Stores"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-outline font-semibold mb-1">Detailed Description</label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive overview of production skills trained..."
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Domain</label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  >
                    <option value="ai">AI &amp; ML</option>
                    <option value="backend">System Design</option>
                    <option value="web3">Web3 &amp; Solana</option>
                    <option value="design">Design Systems</option>
                    <option value="data">Data Engineering</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-outline font-semibold mb-1">Skill Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-outline font-semibold mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-outline font-semibold mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Instructor Name</label>
                  <input
                    type="text"
                    value={formData.instructor_name}
                    onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-outline font-semibold mb-1">Instructor Role / Title</label>
                  <input
                    type="text"
                    value={formData.instructor_role}
                    onChange={(e) => setFormData({ ...formData, instructor_role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-outline font-semibold mb-1">Image Banner URL</label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-outline font-semibold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="e.g. Next.js 15, Turbopack, React 19"
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface border border-surface-container-highest focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_spotlight}
                    onChange={(e) => setFormData({ ...formData, is_spotlight: e.target.checked })}
                    className="w-4 h-4 rounded accent-primary-container"
                  />
                  <span>Feature in Spotlight (Hero Section)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_hot}
                    onChange={(e) => setFormData({ ...formData, is_hot: e.target.checked })}
                    className="w-4 h-4 rounded accent-tertiary-container"
                  />
                  <span>Show "HOT" badge</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high/60">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary-container text-on-primary-container font-semibold hover:bg-primary"
                >
                  {editingCourse ? 'Save Changes' : 'Create Sprint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

