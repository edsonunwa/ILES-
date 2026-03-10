// src/pages/auth/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { USE_MOCK } from '../../services/authService'

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
        setLocalError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.email || !formData.password) {
            setLocalError('Please fill in all fields')
            return
        }
        
        const result = await login(formData.email, formData.password)
        
        if (result.success) {
            navigate('/dashboard')
        }
    }

    const fillMockCredentials = (role) => {
        const mockAccounts = {
            student: { email: 'student@test.com', password: 'password123' },
            supervisor: { email: 'supervisor@test.com', password: 'password123' },
            admin: { email: 'admin@test.com', password: 'password123' }
        }
        setFormData(mockAccounts[role])
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Sign In
                    </h2>
                    <p style={{ color: '#4b5563' }}>
                        Access your ILES account
                    </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    {(error || localError) && (
                        <div style={{
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fee2e2',
                            color: '#b91c1c',
                            padding: '0.75rem 1rem',
                            borderRadius: '6px',
                            marginBottom: '1rem'
                        }}>
                            {error || localError}
                        </div>
                    )}
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                            placeholder="you@example.com"
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '1rem'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.5 : 1
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                {USE_MOCK && (
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                            Mock Accounts (Testing Only)
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => fillMockCredentials('student')}
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: '#d1fae5',
                                    color: '#065f46',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Student
                            </button>
                            <button
                                onClick={() => fillMockCredentials('supervisor')}
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: '#dbeafe',
                                    color: '#1e40af',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Supervisor
                            </button>
                            <button
                                onClick={() => fillMockCredentials('admin')}
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    backgroundColor: '#ede9fe',
                                    color: '#5b21b6',
                                    border: 'none',
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                )}

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login