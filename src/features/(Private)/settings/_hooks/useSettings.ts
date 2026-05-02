'use client'
import { useCallback, useState, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function useSettings() {
    const supabase = createClient()
    const router = useRouter()

    const [changingPassword, setChangingPassword] = useState(false)
    const [signingOut, setSigningOut] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [lastPasswordChange, setLastPasswordChange] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user?.updated_at) {
                const date = new Date(user.updated_at)
                const now = new Date()
                const diffMs = now.getTime() - date.getTime()
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

                if (diffDays === 0) setLastPasswordChange('Changed today')
                else if (diffDays === 1) setLastPasswordChange('Changed yesterday')
                else if (diffDays < 30) setLastPasswordChange(`Changed ${diffDays} days ago`)
                else if (diffDays < 60) setLastPasswordChange('Changed 1 month ago')
                else if (diffDays < 365) setLastPasswordChange(`Changed ${Math.floor(diffDays / 30)} months ago`)
                else setLastPasswordChange(`Changed ${Math.floor(diffDays / 365)} years ago`)
            }
        }
        fetchUser()
    }, [supabase])

    const changePassword = useCallback(async (newPassword: string): Promise<boolean> => {
        setChangingPassword(true)
        setError(null)
        setSuccess(null)
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword })
            if (error) throw error
            setSuccess('Password changed successfully.')
            setLastPasswordChange('Changed today')
            return true
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to change password'
            setError(message)
            return false
        } finally {
            setChangingPassword(false)
        }
    }, [supabase])

    const signOut = useCallback(async () => {
        setSigningOut(true)
        setError(null)
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            router.push('/auth/login')
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to sign out'
            setError(message)
            setSigningOut(false)
        }
    }, [supabase, router])

    const clearMessages = () => {
        setError(null)
        setSuccess(null)
    }

    return {
        changingPassword,
        signingOut,
        error,
        success,
        lastPasswordChange,
        changePassword,
        signOut,
        clearMessages,
    }
}