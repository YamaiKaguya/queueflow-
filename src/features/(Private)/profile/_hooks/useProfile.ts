'use client'

import { createClient } from '@/src/lib/supabase/client'
import { useCallback, useState } from 'react'
import type { Database } from '@/src/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

type ProfileUpdate = Partial<
    Pick<Profile, 'full_name' | 'phone_no' | 'email' | 'birth_date' | 'gender'>
>

export function useProfile() {
    const supabase = createClient()

    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // ── Fetch profile ─────────────────────────────────────────
    const retrieveData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setProfile(null)
                return
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error) throw error

            setProfile(data)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'An unknown error occurred'
                console.error('Failed to retrieve data:', message)
                setError(message)
            } finally {
                setLoading(false)
        }
    }, [supabase])

    // ── Update profile ────────────────────────────────────────
    const updateProfile = useCallback(
        async (updates: ProfileUpdate): Promise<boolean> => {
            if (!profile) return false

            setUpdating(true)
            setError(null)

            try {
                // Convert empty string → null
                const sanitized = Object.fromEntries(
                    Object.entries(updates).map(([k, v]) => [
                        k,
                        v === '' ? null : v,
                    ])
                ) as ProfileUpdate

                // OPTIONAL: optimistic update (uncomment if needed)
                // const prev = profile
                // setProfile({ ...profile, ...sanitized })

                const { data, error } = await supabase
                    .from('profiles')
                    .update(sanitized)
                    .eq('id', profile.id)
                    .select()
                    .single()

                if (error) throw error

                setProfile(data)
                return true
            } catch (err) {
                const message = err instanceof Error ? err.message : 'An unknown error occurred'
                console.error('Update failed:', message)
                setError(message)
                return false
            } finally {
                setUpdating(false)
            }
        },
        [profile, supabase]
    )

    // ── Reset error manually (optional utility) ───────────────
    const clearError = () => setError(null)

    return {
        profile,
        loading,
        updating,
        error,

        retrieveData, // fetch / refetch
        updateProfile,

        clearError, // optional helper
    }
}