import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, user, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div> // Replace with your loading component
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default ProtectedRoute