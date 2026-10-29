import { supabase } from './supabaseClient';
import { INITIAL_COURSES } from './seedData';

const COURSES_STORAGE_KEY = 'skillsprint_courses_cache';
const ENROLLMENTS_STORAGE_KEY = 'skillsprint_enrollments_cache';
const BOOKINGS_STORAGE_KEY = 'skillsprint_bookings_cache';
const SUBSCRIBERS_STORAGE_KEY = 'skillsprint_subscribers_cache';

// Helper to get local cache
function getLocalCache(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalCache(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

// Global Supabase status
export let isSupabaseConnected = false;
export let supabaseTableStatus = {
  courses: false,
  enrollments: false,
  advisor_bookings: false,
  subscribers: false,
  message: 'Checking...',
};

// ==========================================
// 1. HEALTH CHECK & SYNC
// ==========================================
export async function checkSupabaseHealth() {
  try {
    const { data, error } = await supabase.from('courses').select('id').limit(1);
    if (!error) {
      isSupabaseConnected = true;
      supabaseTableStatus.courses = true;
      supabaseTableStatus.message = 'Connected to Supabase live database.';
      return { connected: true, tablesExist: true, message: 'Connected' };
    } else if (error.code === 'PGRST205') {
      isSupabaseConnected = true;
      supabaseTableStatus.courses = false;
      supabaseTableStatus.message = 'Supabase credentials valid! Tables pending creation (run supabase_schema.sql in SQL editor).';
      return { connected: true, tablesExist: false, code: error.code, message: error.message };
    } else {
      supabaseTableStatus.message = `Supabase responded: ${error.message}`;
      return { connected: false, tablesExist: false, message: error.message };
    }
  } catch (err) {
    supabaseTableStatus.message = `Network/Connection error: ${err.message}`;
    return { connected: false, tablesExist: false, message: err.message };
  }
}

// ==========================================
// 2. COURSES API
// ==========================================
export async function getCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      isSupabaseConnected = true;
      supabaseTableStatus.courses = true;
      setLocalCache(COURSES_STORAGE_KEY, data);
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch courses failed, falling back to cached seed:', err);
  }

  // Fallback to cached or initial courses
  const local = getLocalCache(COURSES_STORAGE_KEY, null);
  if (local && local.length > 0) {
    return local;
  }
  setLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
  return INITIAL_COURSES;
}

export async function createCourse(courseData) {
  const newCourse = {
    ...courseData,
    created_at: new Date().toISOString(),
  };

  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([newCourse])
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
      setLocalCache(COURSES_STORAGE_KEY, [data, ...current]);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase insert failed:', e);
  }

  // Fallback to local storage
  const mockId = 'c-' + Date.now();
  const created = { id: mockId, ...newCourse };
  const current = getLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
  const updated = [created, ...current];
  setLocalCache(COURSES_STORAGE_KEY, updated);
  return { success: true, data: created, fallback: true };
}

export async function updateCourse(id, updates) {
  try {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
      const updated = current.map((c) => (c.id === id ? { ...c, ...data } : c));
      setLocalCache(COURSES_STORAGE_KEY, updated);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase update failed:', e);
  }

  // Fallback
  const current = getLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
  const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
  setLocalCache(COURSES_STORAGE_KEY, updated);
  const item = updated.find((c) => c.id === id);
  return { success: true, data: item, fallback: true };
}

export async function deleteCourse(id) {
  try {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (!error) {
      const current = getLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
      const updated = current.filter((c) => c.id !== id);
      setLocalCache(COURSES_STORAGE_KEY, updated);
      return { success: true };
    }
  } catch (e) {
    console.warn('Supabase delete failed:', e);
  }

  // Fallback
  const current = getLocalCache(COURSES_STORAGE_KEY, INITIAL_COURSES);
  const updated = current.filter((c) => c.id !== id);
  setLocalCache(COURSES_STORAGE_KEY, updated);
  return { success: true, fallback: true };
}

// ==========================================
// 3. ENROLLMENTS API
// ==========================================
export async function enrollInCourse(enrollmentData) {
  const payload = {
    user_email: enrollmentData.user_email,
    user_name: enrollmentData.user_name || enrollmentData.user_email.split('@')[0],
    user_id: enrollmentData.user_id || null,
    course_id: enrollmentData.course_id,
    course_title: enrollmentData.course_title,
    status: 'active',
    progress_pct: 12,
    current_day: 2,
    enrolled_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(ENROLLMENTS_STORAGE_KEY, []);
      setLocalCache(ENROLLMENTS_STORAGE_KEY, [data, ...current]);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase enrollment failed, using fallback:', e);
  }

  // Fallback
  const mockId = 'enr-' + Date.now();
  const created = { id: mockId, ...payload };
  const current = getLocalCache(ENROLLMENTS_STORAGE_KEY, []);
  setLocalCache(ENROLLMENTS_STORAGE_KEY, [created, ...current]);
  return { success: true, data: created, fallback: true };
}

export async function getEnrollments(userEmail = null) {
  try {
    let query = supabase
      .from('enrollments')
      .select('*, courses(*)')
      .order('enrolled_at', { ascending: false });

    if (userEmail) {
      query = query.eq('user_email', userEmail);
    }

    const { data, error } = await query;
    if (!error && Array.isArray(data)) {
      setLocalCache(ENROLLMENTS_STORAGE_KEY, data);
      return data;
    }
  } catch (e) {
    console.warn('Supabase getEnrollments failed, using fallback:', e);
  }

  const all = getLocalCache(ENROLLMENTS_STORAGE_KEY, [
    {
      id: 'enr-sample-1',
      user_email: 'alex@skillsprint.io',
      user_name: 'Alex Rivera',
      course_id: 'c1-ai-agents',
      course_title: 'Autonomous AI Agents & Multi-Agent Swarms',
      status: 'active',
      progress_pct: 35,
      current_day: 5,
      enrolled_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
    {
      id: 'enr-sample-2',
      user_email: 'priya@skillsprint.io',
      user_name: 'Priya Nair',
      course_id: 'c2-go-concurrency',
      course_title: 'High-Concurrency Systems & Distributed Backend with Go',
      status: 'active',
      progress_pct: 60,
      current_day: 6,
      enrolled_at: new Date(Date.now() - 3600000 * 96).toISOString(),
    }
  ]);

  if (userEmail) {
    return all.filter((e) => e.user_email.toLowerCase() === userEmail.toLowerCase());
  }
  return all;
}

export async function updateEnrollmentStatus(id, status, progress_pct) {
  const updates = {};
  if (status !== undefined) updates.status = status;
  if (progress_pct !== undefined) updates.progress_pct = progress_pct;

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(ENROLLMENTS_STORAGE_KEY, []);
      const updated = current.map((e) => (e.id === id ? { ...e, ...data } : e));
      setLocalCache(ENROLLMENTS_STORAGE_KEY, updated);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase update enrollment failed:', e);
  }

  const current = getLocalCache(ENROLLMENTS_STORAGE_KEY, []);
  const updated = current.map((e) => (e.id === id ? { ...e, ...updates } : e));
  setLocalCache(ENROLLMENTS_STORAGE_KEY, updated);
  return { success: true, fallback: true };
}

// ==========================================
// 4. ADVISOR BOOKINGS API
// ==========================================
export async function bookAdvisor(bookingData) {
  const payload = {
    full_name: bookingData.full_name,
    email: bookingData.email,
    target_goal: bookingData.target_goal,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('advisor_bookings')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(BOOKINGS_STORAGE_KEY, []);
      setLocalCache(BOOKINGS_STORAGE_KEY, [data, ...current]);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase advisor booking error:', e);
  }

  // Fallback
  const mockId = 'adv-' + Date.now();
  const created = { id: mockId, ...payload };
  const current = getLocalCache(BOOKINGS_STORAGE_KEY, []);
  setLocalCache(BOOKINGS_STORAGE_KEY, [created, ...current]);
  return { success: true, data: created, fallback: true };
}

export async function getAdvisorBookings() {
  try {
    const { data, error } = await supabase
      .from('advisor_bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      setLocalCache(BOOKINGS_STORAGE_KEY, data);
      return data;
    }
  } catch (e) {
    console.warn('Supabase getAdvisorBookings failed:', e);
  }

  return getLocalCache(BOOKINGS_STORAGE_KEY, [
    {
      id: 'adv-1',
      full_name: 'Marcus Brody',
      email: 'marcus.brody@techflow.io',
      target_goal: 'Target: Switch to AI / LLM Engineering',
      status: 'pending',
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: 'adv-2',
      full_name: 'Claire Zhang',
      email: 'claire.z@hypergrowth.com',
      target_goal: 'Target: Staff / Principal Promotion',
      status: 'confirmed',
      created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    }
  ]);
}

export async function updateAdvisorBookingStatus(id, status) {
  try {
    const { data, error } = await supabase
      .from('advisor_bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(BOOKINGS_STORAGE_KEY, []);
      const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
      setLocalCache(BOOKINGS_STORAGE_KEY, updated);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase update booking failed:', e);
  }

  const current = getLocalCache(BOOKINGS_STORAGE_KEY, []);
  const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
  setLocalCache(BOOKINGS_STORAGE_KEY, updated);
  return { success: true, fallback: true };
}

// ==========================================
// 5. NEWSLETTER SUBSCRIBERS
// ==========================================
export async function subscribeNewsletter(email) {
  const payload = {
    email,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      const current = getLocalCache(SUBSCRIBERS_STORAGE_KEY, []);
      setLocalCache(SUBSCRIBERS_STORAGE_KEY, [data, ...current]);
      return { success: true, data };
    }
  } catch (e) {
    console.warn('Supabase newsletter subscribe failed:', e);
  }

  const current = getLocalCache(SUBSCRIBERS_STORAGE_KEY, []);
  if (!current.some((s) => s.email === email)) {
    const created = { id: 'sub-' + Date.now(), ...payload };
    setLocalCache(SUBSCRIBERS_STORAGE_KEY, [created, ...current]);
  }
  return { success: true, fallback: true };
}

export async function getSubscribers() {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      setLocalCache(SUBSCRIBERS_STORAGE_KEY, data);
      return data;
    }
  } catch (e) {
    console.warn('Supabase getSubscribers error:', e);
  }

  return getLocalCache(SUBSCRIBERS_STORAGE_KEY, [
    { id: 'sub-1', email: 'dev.lead@netflix.com', created_at: new Date().toISOString() },
    { id: 'sub-2', email: 'sam@startupfoundry.co', created_at: new Date().toISOString() }
  ]);
}

