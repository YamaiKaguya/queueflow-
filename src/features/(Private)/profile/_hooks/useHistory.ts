'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'

type Status = 'Completed' | 'Canceled' | 'No-show' | 'Pending'

export interface QueueHistory {
    ticket_no: string
    service: string
    created_at: string
    type: string
    status: Status
}

const PAGE_SIZE = 5

export function useQueueHistory() {
    const supabase = createClient()

    const [data, setData] = useState<QueueHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [pageLoading, setPageLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        let ignore = false // prevents state updates after unmount

        const run = async () => {
            if (page === 0) setLoading(true)
            else setPageLoading(true)

            setError(null)

            const from = page * PAGE_SIZE
            const to = from + PAGE_SIZE - 1

            const { data, error } = await supabase
                .from('queue')
                .select('ticket_no, service, created_at, type, status')
                .order('created_at', { ascending: false })
                .range(from, to)

            if (ignore) return

            if (error) {
                setError(error.message)
            } else {
                const result = data || []
                setData(result)
                setHasMore(result.length === PAGE_SIZE)
            }

            setLoading(false)
            setPageLoading(false)
        }

        run()

        return () => {
            ignore = true
        }
    }, [page, supabase])

    const nextPage = () => {
        if (hasMore) setPage(p => p + 1)
    }

    const prevPage = () => {
        setPage(p => Math.max(p - 1, 0))
    }

    const refresh = () => {
        // just re-trigger effect
        setPage(p => p)
    }

    return {
        data,
        loading,
        pageLoading,
        error,
        page,
        hasMore,
        nextPage,
        prevPage,
        refresh,
    }
}