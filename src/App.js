import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Register from './components/Register';
import Login from './components/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard'
import ProfileUpdate from './pages/ProfilePage';
import ExamScheduling from './pages/ExamScheduling';
import StudentsList from './pages/StudentsList';
import QuestionBank from './pages/QuestionBank';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ErrorPage from './components/ErrorPage';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={`/${user?.role}/dashboard`} /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/student/dashboard" element={isAuthenticated && user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} >
            <Route path="profile" element={<ProfileUpdate />} />
          </Route>

          <Route path="/admin/dashboard" element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} >
            <Route path="" element={<AdminDashboardPage />} />
            <Route path="profile" element={<ProfileUpdate />} />
            <Route path="exams" element={<ExamScheduling />} />
            <Route path="questions" element={<QuestionBank />} />
            <Route path="students" element={<StudentsList />} />
          </Route>

          {/* Add the ErrorPage route */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
    </Router>

  );
}

export default App;
