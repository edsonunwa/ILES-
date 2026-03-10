// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/authcontext'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/common/ProtectedRoute'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Temporary Dashboard Components (replace later)
const StudentDashboard = () => (
    <div style={{ padding: '2rem' }}>
        <h1>Student Dashboard</h1>
        <p>Welcome student! Your logs will appear here.</p>
    </div>
)

const SupervisorDashboard = () => (
    <div style={{ padding: '2rem' }}>
        <h1>Supervisor Dashboard</h1>
        <p>Welcome supervisor! Reviews will appear here.</p>
    </div>
)

const AdminDashboard = () => (
    <div style={{ padding: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome admin! Management tools will appear here.</p>
    </div>
)

// Dashboard router component
const DashboardRouter = () => {
    const { user } = useAuth()
    
    switch(user?.role) {
        case 'student':
            return <StudentDashboard />
        case 'supervisor':
            return <SupervisorDashboard />
        case 'admin':
            return <AdminDashboard />
        default:
            return <Navigate to="/login" replace />
    }
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected Dashboard */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardRouter />
                        </ProtectedRoute>
                    } />
                    
                    {/* Role-specific routes (for future features) */}
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
                    
                    {/* Root redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    
                    {/* 404 */}
                    <Route path="*" element={
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <h1>404 - Page Not Found</h1>
                            <a href="/">Go Home</a>
                        </div>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App