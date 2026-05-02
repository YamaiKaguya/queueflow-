'use client'

import { useCallback, useEffect, useReducer } from 'react'
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

type State = {
    data: QueueHistory[]
    loading: boolean
    pageLoading: boolean
    error: string | null
    page: number
    hasMore: boolean
}

type Action =
    | { type: 'START_LOADING'; page: number }
    | { type: 'SUCCESS'; payload: QueueHistory[] }
    | { type: 'ERROR'; message: string }
    | { type: 'SET_PAGE'; page: number }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                loading: action.page === 0,
                pageLoading: action.page !== 0,
                error: null,
                page: action.page,
            }

        case 'SUCCESS':
            return {
                ...state,
                data: action.payload,
                hasMore: action.payload.length === PAGE_SIZE,
                loading: false,
                pageLoading: false,
            }

        case 'ERROR':
            return {
                ...state,
                error: action.message,
                loading: false,
                pageLoading: false,
            }

        case 'SET_PAGE':
            return {
                ...state,
                page: action.page,
            }

        default:
            return state
    }
}

export function useQueueHistory() {
    const supabase = createClient()

    const [state, dispatch] = useReducer(reducer, {
        data: [],
        loading: true,
        pageLoading: false,
        error: null,
        page: 0,
        hasMore: true,
    })

    const fetchHistory = useCallback(
        async (pageIndex: number) => {
            dispatch({ type: 'START_LOADING', page: pageIndex })

            const from = pageIndex * PAGE_SIZE
            const to = from + PAGE_SIZE - 1

            const { data, error } = await supabase
                .from('queue')
                .select('ticket_no, service, created_at, type, status')
                .order('created_at', { ascending: false })
                .range(from, to)

            if (error) {
                dispatch({ type: 'ERROR', message: error.message })
                return
            }

            dispatch({ type: 'SUCCESS', payload: data || [] })
        },
        [supabase]
    )

    useEffect(() => {
        fetchHistory(state.page)
    }, [state.page, fetchHistory])

    const nextPage = () => {
        if (state.hasMore) {
            dispatch({ type: 'SET_PAGE', page: state.page + 1 })
        }
    }

    const prevPage = () => {
        dispatch({ type: 'SET_PAGE', page: Math.max(state.page - 1, 0) })
    }

    const refresh = () => {
        fetchHistory(state.page)
    }

    return {
        data: state.data,
        loading: state.loading,
        pageLoading: state.pageLoading,
        error: state.error,
        page: state.page,
        hasMore: state.hasMore,
        nextPage,
        prevPage,
        refresh,
    }
}