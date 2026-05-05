'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'

const supabase = createClient()

export type TicketStatus =
    | 'waiting'
    | 'serving'
    | 'done'
    | 'skipped'
    | 'no-show'
    | 'dismissed'

export type QueueRow = {
    id: string
    ticket_no: number
    service: string | null
    status: TicketStatus
    created_at: string
    called_at: string | null
    served_at: string | null
    type: 'Online' | 'WalkIn'
    name: string
    email?: string
    priority:boolean
}

export type ServiceRow = {
    id: string
    label: string
    open: boolean
    ahead: number
    average: number
}

export function useStaffQueue() {
    const [queue, setQueue] = useState<QueueRow[]>([])
    const [noShow, setNoShow] = useState<QueueRow[]>([])
    const [services, setServices] = useState<ServiceRow[]>([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    // FETCH ACTIVE QUEUE
    useEffect(() => {
        const fetchQueue = async () => {
            const { data, error } = await supabase
                .from('queue')
                .select('*')
                .not('status', 'in', '("done","skipped","no-show")')
                .order('ticket_no', { ascending: true })

            if (error) return console.error(error)
            setQueue(data ?? [])
            setLoading(false)
        }

        fetchQueue()
    }, [])

    // FETCH NO-SHOW
    useEffect(() => {
        const fetchNoShow = async () => {
            const { data, error } = await supabase
                .from('queue')
                .select('*')
                .eq('status', 'no-show')
                .order('called_at', { ascending: false })

            if (error) return console.error(error)
            setNoShow(data ?? [])
        }

        fetchNoShow()
    }, [])

    // FETCH SERVICES
    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('label', { ascending: true })

            if (error) return console.error(error)
            setServices(data ?? [])
        }

        fetchServices()
    }, [])

    // REALTIME WATCHER
    useEffect(() => {
        const channel = supabase
            .channel(`staff-${crypto.randomUUID()}`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'queue' },
                (payload: RealtimePostgresChangesPayload<QueueRow>) => {

                    if (payload.eventType === 'DELETE') {
                        const deleted = payload.old as Partial<QueueRow>
                        if (!deleted?.id) return
                        setQueue(prev => prev.filter(t => t.id !== deleted.id))
                        setNoShow(prev => prev.filter(t => t.id !== deleted.id))
                        return
                    }

                    const updated = payload.new as QueueRow
                    if (!updated) return

                    if (updated.status === 'no-show') {
                        setQueue(prev => prev.filter(t => t.id !== updated.id))
                        setNoShow(prev => {
                            const exists = prev.find(t => t.id === updated.id)
                            if (exists) {
                                return prev.map(t =>
                                    t.id === updated.id ? { ...t, ...updated } : t
                                )
                            }
                            return [updated, ...prev]
                        })
                        return
                    }

                    if (updated.status === 'dismissed') {
                        setNoShow(prev => prev.filter(t => t.id !== updated.id))
                        return
                    }

                    if (updated.status === 'done' || updated.status === 'skipped') {
                        setQueue(prev =>
                            prev.map(t =>
                                t.id === updated.id ? { ...t, ...updated } : t
                            )
                        )
                        setTimeout(() => {
                            setQueue(prev => prev.filter(t => t.id !== updated.id))
                        }, 1500)
                        return
                    }

                    if (updated.status === 'waiting') {
                        setNoShow(prev => prev.filter(t => t.id !== updated.id))
                        setQueue(prev => {
                            const exists = prev.find(t => t.id === updated.id)
                            if (exists) {
                                return prev.map(t =>
                                    t.id === updated.id ? { ...t, ...updated } : t
                                )
                            }
                            return [...prev, updated].sort(
                                (a, b) => a.ticket_no - b.ticket_no
                            )
                        })
                        return
                    }

                    setQueue(prev => {
                        const exists = prev.find(t => t.id === updated.id)
                        if (exists) {
                            return prev.map(t =>
                                t.id === updated.id ? { ...t, ...updated } : t
                            )
                        }
                        return [...prev, updated].sort(
                            (a, b) => a.ticket_no - b.ticket_no
                        )
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    // CALL NEXT
    const callNext = useCallback(async (serviceLabel?: string) => {
        const next = queue.find(t =>
            t.status === 'waiting' &&
            (!serviceLabel || t.service?.toLowerCase().trim() === serviceLabel.toLowerCase().trim())
        )
        if (!next) return

        setActionLoading(next.id)

        const { error } = await supabase
            .from('queue')
            .update({
                status: 'serving',
                called_at: new Date().toISOString(),
            })
            .eq('id', next.id)

        if (error) console.error(error)

        setActionLoading(null)
    }, [queue])

    // UPDATE STATUS
    const updateStatus = useCallback(
        async (id: string, status: TicketStatus) => {
            setActionLoading(id)

            const target = queue.find(t => t.id === id)

            if (!target) {
                setActionLoading(null)
                return
            }

            const updates: Partial<QueueRow> = { status }

            if (status === 'done') {
                updates.served_at = new Date().toISOString()
            }

            if (status === 'no-show') {
                updates.called_at = new Date().toISOString()
            }

            const { error } = await supabase
                .from('queue')
                .update(updates)
                .eq('id', id)

            if (error) console.error(error)

            setActionLoading(null)
        },
        [queue]
    )

    // DERIVED STATE
    const serving = useMemo(
        () => queue.filter(t => t.status === 'serving'),
        [queue]
    )

    const waiting = useMemo(
        () => queue.filter(t => t.status === 'waiting'),
        [queue]
    )

    return {
        queue,
        loading,
        actionLoading,
        serving,
        waiting,
        callNext,
        updateStatus,
        noShow,
        services,
    }
}