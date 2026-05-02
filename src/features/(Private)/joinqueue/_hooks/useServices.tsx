import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/src/lib/supabase/client'

export type ServiceUI = {
    id: string
    label: string
    average: number
    open: boolean
    ahead: number
}

type EstimateRow = {
    service: string
    avg_service_seconds: number
    waiting_count: number
}

type ServingRow = {
    service: string
}

export function useServices() {
    const supabase = useMemo(() => createClient(), [])
    const [servicesData, setServicesData] = useState<ServiceUI[] | null>(null)
    const [estimatesData, setEstimatesData] = useState<EstimateRow[] | null>(null)
    const [servingData, setServingData] = useState<ServingRow[] | null>(null)
    const [loadingServices, setLoadingServices] = useState(true)

    const fetchServices = async () => {
        const { data: services } = await supabase
            .from('services')
            .select('id, label, open')
            .order('label')

        const { data: estimates } = await supabase
            .from('queue_estimates')
            .select('service, avg_service_seconds, waiting_count')

        const { data: serving } = await supabase
            .from('queue')
            .select('service')
            .eq('status', 'serving')

        return {
            services: services ?? [],
            estimates: estimates ?? [],
            serving: serving ?? [],
        }
    }

    useEffect(() => {
        let mounted = true

        const load = async () => {
            setLoadingServices(true)
            const { services, estimates, serving } = await fetchServices()
            if (!mounted) return
            setServicesData(services as ServiceUI[])
            setEstimatesData(estimates)
            setServingData(serving)
            setLoadingServices(false)
        }

        void load()

        const channel = supabase
            .channel('services-live')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'services' },
                () => void load()
            )
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'queue' },
                () => void load()
            )
            .subscribe()

        return () => {
            mounted = false
            void supabase.removeChannel(channel)
        }
    }, [supabase])

    const services: ServiceUI[] = useMemo(() => {
        const estimateMap: Record<string, { avg: number; ahead: number }> = {}
        for (const row of estimatesData ?? []) {
            estimateMap[row.service] = {
                avg: Math.round(row.avg_service_seconds ?? 0),
                ahead: row.waiting_count ?? 0,
            }
        }

        const servingMap: Record<string, number> = {}
        for (const row of servingData ?? []) {
            servingMap[row.service] = (servingMap[row.service] ?? 0) + 1
        }

        return (servicesData ?? []).map(s => ({
            id: s.id,
            label: s.label,
            open: s.open,
            average: estimateMap[s.id]?.avg ?? 0,
            ahead: (estimateMap[s.id]?.ahead ?? 0) + (servingMap[s.id] ?? 0),
        }))
    }, [servicesData, estimatesData, servingData])

    return { services, loadingServices }
}