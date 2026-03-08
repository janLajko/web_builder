import React, { createContext, useContext, useEffect, useState } from 'react'
import { authClient } from './lib/authClient'
import type { User } from './types'
import { ThemeProvider } from './providers/ThemeProvider'

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    checkAuth: async () => { },
})

export const useAuth = () => useContext(AuthContext)

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const checkAuth = async () => {
        setIsLoading(true)
        try {
            const { data } = await authClient.getSession()
            setUser(data?.user as unknown as User | null)
        } catch (error) {
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthContext.Provider value={{ user, isLoading, checkAuth }}>
                {children}
            </AuthContext.Provider>
        </ThemeProvider>
    )
}
