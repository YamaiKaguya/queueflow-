'use client'

import { createContext, useContext } from 'react'
import { useStaffQueue } from '../_hooks/useStaff'

type QueueContextValue = ReturnType<typeof useStaffQueue>

const QueueContext = createContext<QueueContextValue | null>(null)

export function QueueProvider({ children }: { children: React.ReactNode }) {
    const queue = useStaffQueue()

    return (
        <QueueContext.Provider value={queue}>
            {children}
        </QueueContext.Provider>
    )
}

export function useQueueContext() {
    const ctx = useContext(QueueContext)

    if (!ctx) {
        throw new Error('useQueueContext must be used within QueueProvider')
    }

    return ctx
}