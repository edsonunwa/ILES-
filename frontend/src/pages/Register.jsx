import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const { register, loading, error } = useAuth()
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        role: 'student'
    })
    
    const [localError, setLocalError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setLocalError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validation
        if (!formData.email || !formData.password || !formData.name) {
            setLocalError('Please fill in all fields')
            return
        }
        
        if (formData.password !== formData.confirmPassword) {
            setLocalError('Passwords do not match')
            return
        }
        
        if (formData.password.length < 6) {
            setLocalError('Password must be at least 6 characters')
            return
        }
        
        const result = await register({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            role: formData.role
        })
        
        if (result.success) {
            navigate('/login?registered=true')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="text-3xl font-bold text-center">Create Account</h2>
                    <p className="mt-2 text-center text-gray-600">
                        Join ILES as a student or supervisor
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {(error || localError) && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error || localError}
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="John Doe"
                            />
                        </div>
                        
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="you@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                I am a
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="student">Student</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
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
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="••••••••"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register