import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const CorruptionPage = lazy(() => import('./pages/CorruptionPage').then((m) => ({ default: m.CorruptionPage })))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((m) => ({ default: m.SolutionsPage })))
const ReportPage = lazy(() => import('./pages/ReportPage').then((m) => ({ default: m.ReportPage })))
const TrackPage = lazy(() => import('./pages/TrackPage').then((m) => ({ default: m.TrackPage })))
const RightsPage = lazy(() => import('./pages/RightsPage').then((m) => ({ default: m.RightsPage })))
const StatisticsPage = lazy(() => import('./pages/StatisticsPage').then((m) => ({ default: m.StatisticsPage })))
const AwarenessPage = lazy(() => import('./pages/AwarenessPage').then((m) => ({ default: m.AwarenessPage })))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage })))
const AuthPage = lazy(() => import('./pages/AuthPage').then((m) => ({ default: m.AuthPage })))
const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })))
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function App() {
  const location = useLocation()
  return (
    <Suspense fallback={<div className="page container-x muted">Loading secure interface…</div>}>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="corruption" element={<CorruptionPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="track" element={<TrackPage />} />
          <Route path="rights" element={<RightsPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="awareness" element={<AwarenessPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="register" element={<AuthPage mode="register" />} />
          <Route path="profile" element={<Navigate to="/dashboard" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute admin />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<LegalPage type="terms" />} />
          <Route path="disclaimer" element={<LegalPage type="disclaimer" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
    </Suspense>
  )
}

export default App
