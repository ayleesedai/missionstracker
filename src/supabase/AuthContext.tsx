// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string) => Promise<Error | null>
  signOut: () => Promise<Error | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) console.error('Error fetching session:', error)
      setUser(data?.session?.user ?? null)
      setLoading(false)
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: any, session: Session | null) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string): Promise<Error | null> => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    return error
  }

  const signOut = async (): Promise<Error | null> => {
    const { error } = await supabase.auth.signOut()
    return error
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signOut,
  }
console.log('AuthContext value:', value);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
};
