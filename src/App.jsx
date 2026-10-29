import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { getCourses, getEnrollments, enrollInCourse, updateEnrollmentStatus } from './lib/api';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DomainNavigator from './components/DomainNavigator';
import SpotlightSection from './components/SpotlightSection';
import CatalogExplorer from './components/CatalogExplorer';
import MethodologySection from './components/MethodologySection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

import CourseDetailsModal from './components/CourseDetailsModal';
import AdvisorModal from './components/AdvisorModal';
import AuthModal from './components/AuthModal';
import MySprintsView from './components/MySprintsView';
import AdminPanel from './components/AdminPanel';
import LearningPathsView from './components/LearningPathsView';
import ForTeamsView from './components/ForTeamsView';
import CommunityView from './components/CommunityView';

function SkillSprintApp() {
  const { user, setAuthModalOpen } = useAuth();

  // Navigation & View State
  const [currentView, setCurrentView] = useState('browse'); // 'browse', 'my-sprints', 'admin', 'learning-paths', 'for-teams', 'community'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomain, setActiveDomain] = useState('all');

  // Data states
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Show temporary toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Initial Data Fetch
  const loadData = async () => {
    setLoading(true);
    const fetchedCourses = await getCourses();
    setCourses(fetchedCourses || []);

    const userEmail = user?.email || null;
    const fetchedEnrollments = await getEnrollments(userEmail);
    setEnrollments(fetchedEnrollments || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user?.email]);

  // Handle Enrollment
  const handleEnrollCourse = async (course) => {
    const studentEmail = user?.email || 'alex@skillsprint.io';
    const studentName = user?.name || 'Alex Rivera';

    const result = await enrollInCourse({
      user_email: studentEmail,
      user_name: studentName,
      user_id: user?.id || null,
      course_id: course.id,
      course_title: course.title,
    });

    if (result.success) {
      showToast(`⚡ Enrolled in "${course.title}"! Redirecting to My Sprints...`);
      setSelectedCourse(null);
      // Reload user enrollments
      const updated = await getEnrollments(studentEmail);
      setEnrollments(updated || []);
      setCurrentView('my-sprints');
    }
  };

  // Handle Progress update
  const handleUpdateProgress = async (enrollmentId, newProgress) => {
    const isCompleted = newProgress >= 100;
    await updateEnrollmentStatus(enrollmentId, isCompleted ? 'completed' : 'active', newProgress);
    const updated = await getEnrollments(user?.email || null);
    setEnrollments(updated || []);
    showToast(isCompleted ? '🎉 Sprint milestone finished! Certificate issued.' : 'Milestone marked as complete.');
  };

  // Scroll to explorer
  const handleExploreClick = () => {
    setCurrentView('browse');
    setTimeout(() => {
      const el = document.getElementById('catalogExplorer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-tertiary-container text-on-tertiary font-semibold text-xs shadow-2xl flex items-center gap-2 border border-tertiary animate-bounce">
          <span className="material-symbols-outlined text-base">bolt</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAdvisor={() => setAdvisorModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Router */}
      <main className="w-full pt-20 bg-surface flex-1">
        {currentView === 'browse' && (
          <div className="flex flex-col w-full">
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDomain={activeDomain}
              setSelectedDomain={setActiveDomain}
              onExploreClick={handleExploreClick}
              onOpenAdvisor={() => setAdvisorModalOpen(true)}
            />

            <DomainNavigator
              activeDomain={activeDomain}
              setActiveDomain={setActiveDomain}
            />

            <SpotlightSection
              courses={courses}
              onSelectCourse={(course) => setSelectedCourse(course)}
              onEnrollCourse={handleEnrollCourse}
            />

            <CatalogExplorer
              courses={courses}
              activeDomain={activeDomain}
              searchQuery={searchQuery}
              onSelectCourse={(course) => setSelectedCourse(course)}
              onEnrollCourse={handleEnrollCourse}
              onOpenAdvisor={() => setAdvisorModalOpen(true)}
            />

            <MethodologySection />

            <TestimonialsSection />

            <CtaSection
              onExploreClick={handleExploreClick}
              onOpenAdvisor={() => setAdvisorModalOpen(true)}
            />
          </div>
        )}

        {currentView === 'my-sprints' && (
          <MySprintsView
            enrollments={enrollments}
            onBrowseClick={() => setCurrentView('browse')}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            courses={courses}
            onRefreshCourses={loadData}
          />
        )}

        {currentView === 'learning-paths' && (
          <LearningPathsView
            onSelectSprint={(sprintTitle) => {
              setSearchQuery(sprintTitle);
              handleExploreClick();
            }}
          />
        )}

        {currentView === 'for-teams' && (
          <ForTeamsView
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
          />
        )}

        {currentView === 'community' && (
          <CommunityView
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => setCurrentView(view)}
        onOpenAdvisor={() => setAdvisorModalOpen(true)}
      />

      {/* Modals */}
      <CourseDetailsModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={handleEnrollCourse}
      />

      <AdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      />

      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SkillSprintApp />
    </AuthProvider>
  );
}
