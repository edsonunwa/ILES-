import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const { login, loading, error } = useAuth()
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const [localError, setLocalError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // Clear errors when user types
        setLocalError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Basic validation
        if (!formData.email || !formData.password) {
            setLocalError('Please fill in all fields')
            return
        }
        
        const result = await login(formData.email, formData.password)
        
        if (result.success) {
            // Redirect based on role (you can customize this)
            navigate('/dashboard')
        }
    }

    // Mock credentials for testing
    const fillMockCredentials = (role) => {
        const mockAccounts = {
            student: { email: 'student@test.com', password: 'password123' },
            supervisor: { email: 'supervisor@test.com', password: 'password123' },
            admin: { email: 'admin@test.com', password: 'password123' }
        }
        setFormData(mockAccounts[role])
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="text-3xl font-bold text-center">Sign In</h2>
                    <p className="mt-2 text-center text-gray-600">
                        Access your ILES account
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Error Display */}
                    {(error || localError) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error || localError}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                {/* Mock login buttons (remove when real API is ready) */}
                {USE_MOCK && (
                    <div className="mt-4 space-y-2">
                        <p className="text-sm text-gray-500 text-center">Mock Accounts (Testing Only)</p>
                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={() => fillMockCredentials('student')}
                                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded"
                            >
                                Student
                            </button>
                            <button
                                onClick={() => fillMockCredentials('supervisor')}
                                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                            >
                                Supervisor
                            </button>
                            <button
                                onClick={() => fillMockCredentials('admin')}
                                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded"
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                )}

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login