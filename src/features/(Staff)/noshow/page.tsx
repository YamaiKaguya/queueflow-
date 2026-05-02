'use client'

import { useState } from 'react'
import { useNoShow } from './_hooks/useStaff'
import { NoShowPanel } from './_components/NoShow'
import Sidebar from './_components/Sidebar'

export function NoShowPage() {
    const { noShow, services, noShowCount, requeueCount, requeue, dismiss } = useNoShow()
    const [selectedId, setSelectedId] = useState<string | null>(null)

    return (
        <main className="flex gap-4 p-12 items-start">
            <Sidebar
                services={services}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            />
            <NoShowPanel
                tickets={noShow}
                services={services}
                selectedId={selectedId}
                noShowCount={noShowCount}
                requeueCount={requeueCount}
                onRequeue={requeue}
                onDismiss={dismiss}
            />
        </main>
    )
}