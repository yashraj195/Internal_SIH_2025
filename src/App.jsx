import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import PortfolioPage from './pages/PortfolioPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/" element={<LoginPage />} />
      <Route path="/activity/:activityId" element={
        <ProtectedRoute>
          <ActivityDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/portfolio/:userId" element={<PortfolioPage />} />
    </Routes>
  );
}

export default App;
