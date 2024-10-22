import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Register from './components/Register';
import Login from './components/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex items-center justify-center ">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
          <Route path="/student/dashboard" element={isAuthenticated && user.role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/dashboard" element={isAuthenticated && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
