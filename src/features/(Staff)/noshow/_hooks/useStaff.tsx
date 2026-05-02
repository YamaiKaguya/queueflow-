'use client'

import { useEffect, useState, useCallback } from 'react'
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
}

export type ServiceRow = {
  id: string
  label: string
  open: boolean
  ahead: number
  average: number
}

export function useNoShow() {
  const [noShow, setNoShow] = useState<QueueRow[]>([])
  const [services, setServices] = useState<ServiceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // ======================
  // FETCH NO-SHOW
  // ======================
  useEffect(() => {
    const fetchNoShow = async () => {
      const { data, error } = await supabase
        .from('queue')
        .select('*')
        .eq('status', 'no-show')
        .order('called_at', { ascending: false })

      if (error) return console.error(error)
      setNoShow(data ?? [])
      setLoading(false)
    }

    fetchNoShow()
  }, [])

  // ======================
  // FETCH SERVICES
  // ======================
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

  // ======================
  // REALTIME WATCHER
  // ======================
  useEffect(() => {
    const channel = supabase
      .channel(`noshow-${crypto.randomUUID()}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'queue' },
        (payload: RealtimePostgresChangesPayload<QueueRow>) => {
          const updated = payload.new as QueueRow
          if (!updated) return

          if (updated.status === 'no-show') {
            setNoShow((prev) => {
              const exists = prev.find((t) => t.id === updated.id)
              if (exists) return prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
              return [updated, ...prev]
            })
            return
          }

          // dismissed or requeued — remove from list
          setNoShow((prev) => prev.filter((t) => t.id !== updated.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // ======================
  // REQUEUE
  // ======================
  const requeue = useCallback(async (id: string) => {
    setActionLoading(id)

    const { error } = await supabase
      .from('queue')
      .update({ status: 'waiting' })
      .eq('id', id)

    if (error) console.error(error)
    setActionLoading(null)
  }, [])

  // ======================
  // DISMISS
  // ======================
  const dismiss = useCallback(async (id: string) => {
    setActionLoading(id)

    const { error } = await supabase
      .from('queue')
      .update({ status: 'dismissed' })
      .eq('id', id)

    if (error) console.error(error)
    setActionLoading(null)
  }, [])

  // ======================
  // DERIVED
  // ======================
  const requeueCount = noShow.filter((t) => t.status === 'waiting').length

  return {
    noShow,
    services,
    loading,
    actionLoading,
    noShowCount: noShow.length,
    requeueCount,
    requeue,
    dismiss,
  }
}