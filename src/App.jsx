import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageProvider';
import Layout from '@/components/Layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import '@/i18n/index.js';

// Lazy load pages
const Home = React.lazy(() => import('@/pages/Home'));
const Packages = React.lazy(() => import('@/pages/Packages'));
const Inquiry = React.lazy(() => import('@/pages/Inquiry'));
const Chat = React.lazy(() => import('@/pages/Chat'));
const Payment = React.lazy(() => import('@/pages/Payment'));
const Aftercare = React.lazy(() => import('@/pages/Aftercare'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const AdminWorkflow = React.lazy(() => import('@/pages/admin/Workflow'));
const Login = React.lazy(() => import('@/pages/auth/Login'));
const Register = React.lazy(() => import('@/pages/auth/Register'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Settings = React.lazy(() => import('@/pages/Settings'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="xl" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route path="/chat" element={<Chat />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/aftercare" element={<Aftercare />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Admin routes */}
                <Route path="/admin/workflow" element={<AdminWorkflow />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;