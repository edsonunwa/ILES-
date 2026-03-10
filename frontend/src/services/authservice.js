// src/services/authService.js
// Based on API_CONTRACTS.md
// POST /auth/login/ → { email, password } → { token, user }
// POST /auth/register/ → { email, password, role } → { user }

const BASE_URL = 'http://localhost:8000/api/v1'

// MOCK DATA (use until friend's API is ready)
const MOCK_USERS = [
    {
        id: 1,
        email: 'student@test.com',
        name: 'John Student',
        role: 'student',
        token: 'mock-token-student-123'
    },
    {
        id: 2,
        email: 'supervisor@test.com',
        name: 'Jane Supervisor',
        role: 'supervisor',
        token: 'mock-token-supervisor-456'
    },
    {
        id: 3,
        email: 'admin@test.com',
        name: 'Admin User',
        role: 'admin',
        token: 'mock-token-admin-789'
    }
]

// Flag to switch between mock and real API
export const USE_MOCK = true  // Change to false when friend's API is ready

export const authService = {
    // LOGIN
    login: async (email, password) => {
        console.log('Login attempt:', email) // For debugging
        
        if (USE_MOCK) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Find user
            const user = MOCK_USERS.find(u => u.email === email)
            
            if (!user) {
                throw { response: { data: { error: 'Invalid credentials' } } }
            }
            
            // Mock password check (any password works in mock)
            if (password.length < 3) {
                throw { response: { data: { error: 'Password too short' } } }
            }
            
            // Return exactly what contract says: { token, user }
            return {
                token: user.token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        }
        
        // REAL API CALL (when friend is done)
        const response = await fetch(`${BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        
        if (!response.ok) {
            const error = await response.json()
            throw error
        }
        
        return response.json()
    },
    
    // REGISTER
    register: async (userData) => {
        console.log('Register attempt:', userData) // For debugging
        
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Check if email exists
            const existingUser = MOCK_USERS.find(u => u.email === userData.email)
            if (existingUser) {
                throw { response: { data: { error: 'Email already exists' } } }
            }
            
            // Mock registration
            const newUser = {
                id: MOCK_USERS.length + 1,
                email: userData.email,
                name: userData.name || userData.email.split('@')[0],
                role: userData.role || 'student',
                token: `mock-token-${Date.now()}`
            }
            
            return {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    name: newUser.name,
                    role: newUser.role
                }
            }
        }
        
        // REAL API CALL
        const response = await fetch(`${BASE_URL}/auth/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        
        if (!response.ok) {
            const error = await response.json()
            throw error
        }
        
        return response.json()
    },
    
    // LOGOUT
    logout: async () => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500))
            return { message: 'Logged out successfully' }
        }
        
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/auth/logout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        })
        
        return response.json()
    },
    
    // TOKEN STORAGE
    setToken: (token) => {
        localStorage.setItem('token', token)
    },
    
    getToken: () => {
        return localStorage.getItem('token')
    },
    
    removeToken: () => {
        localStorage.removeItem('token')
    },
    
    // USER STORAGE
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user))
    },
    
    getUser: () => {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },
    
    removeUser: () => {
        localStorage.removeItem('user')
    }
}