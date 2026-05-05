'use client'

import { useState } from 'react'
import { createClient } from '@/src/lib/supabase/client'

const supabase = createClient()

export function useRegistration() {
    const [name, setName]         = useState('')
    const [priority, setPriority] = useState(false)
    const [loading, setLoading]   = useState(false)
    const [error, setError]       = useState<string | null>(null)
    const [ticket, setTicket]     = useState<{ ticket_no: number; service: string } | null>(null)

    const register = async (serviceId: string, serviceLabel: string) => {
        if (!name || !serviceId) return
        setLoading(true)
        setError(null)

        try {
        const { data, error: insertError } = await supabase
            .from('queue')
            .insert({
            name,
            service: serviceId,  
            status: 'waiting',
            priority,
            type: 'WalkIn',
            })
            .select('ticket_no, service')
            .single()

        if (insertError) throw insertError

        setTicket({ ticket_no: data.ticket_no, service: serviceLabel }) 
        setName('')
        setPriority(false)
        } catch (err) {
        console.error(err)
        setError('Something went wrong. Please try again.')
        } finally {
        setLoading(false)
        }
    }

    const reset = () => {
        setTicket(null)
        setName('')
        setPriority(false)
        setError(null)
    }

    return {
        name, setName,
        priority, setPriority,
        loading,
        error,
        ticket,
        register,
        reset,
    }
}