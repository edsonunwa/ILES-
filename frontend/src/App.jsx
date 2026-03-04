import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

// Temporary placeholder dashboards (you'll build these later)
const StudentDashboard = () => <div>Student Dashboard</div>
const SupervisorDashboard = () => <div>Supervisor Dashboard</div>
const AdminDashboard = () => <div>Admin Dashboard</div>

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            {() => {
                                const { user } = useAuth()
                                if (user?.role === 'student') return <StudentDashboard />
                                if (user?.role === 'supervisor') return <SupervisorDashboard />
                                if (user?.role === 'admin') return <AdminDashboard />
                                return <Navigate to="/login" />
                            }}
                        </ProtectedRoute>
                    } />
                    
                    {/* Role-specific dashboards */}
                    <Route path="/student/*" element={
                        <ProtectedRoute allowedRoles={['student']}>
                            <StudentDashboard />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/supervisor/*" element={
                        <ProtectedRoute allowedRoles={['supervisor']}>
                            <SupervisorDashboard />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/*" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    
                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App