'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'

import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type Notification = {
    id: string
    message: string
    read: boolean
    created_at: string
    }

    export function useNotifications() {
    const supabase = createClient()

    const [notifs, setNotifs] = useState<Notification[]>([])
    const [userId, setUserId] = useState<string | null>(null)

    // 🔹 Get current user
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUserId(data.user?.id ?? null)
        }
        getUser()
    }, [])

    // 🔹 Fetch initial notifications
    useEffect(() => {
        if (!userId) return

        const fetchNotifs = async () => {
            const { data } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (data) setNotifs(data)
        }

        fetchNotifs()
    }, [userId])

    // 🔹 Realtime listener
    useEffect(() => {
        if (!userId) return

        const channel = supabase
            .channel('notifications')
            .on(
                'postgres_changes',
                {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`,
                },
                (payload: RealtimePostgresChangesPayload<Notification>) => {
                    setNotifs((prev) => [payload.new as Notification, ...prev])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId])

    // 🔹 Mark one as read
    const markOneRead = async (id: string) => {
        await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', id)

        setNotifs((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
    }

    // 🔹 Mark all as read
    const markAllRead = async () => {
        if (!userId) return

        await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId)

        setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
    }

    return {
        notifs,
        markOneRead,
        markAllRead,
    }
}