import React, { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = authService.getUser()
        const token = authService.getToken()
        
        if (storedUser && token) {
            setUser(storedUser)
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await authService.login(email, password)
            
            // Save to localStorage
            authService.setToken(response.token)
            authService.setUser(response.user)
            
            setUser(response.user)
            return { success: true }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const register = async (userData) => {
        setLoading(true)
        setError(null)
        
        try {
            const response = await authService.register(userData)
            
            // If register returns token (auto-login)
            if (response.token) {
                authService.setToken(response.token)
                authService.setUser(response.user)
                setUser(response.user)
            }
            
            return { success: true }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Registration failed'
            setError(errorMessage)
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await authService.logout()
        } finally {
            // Always clear local data even if API call fails
            authService.removeToken()
            authService.removeUser()
            setUser(null)
        }
    }

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isSupervisor: user?.role === 'supervisor',
        isAdmin: user?.role === 'admin'
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}