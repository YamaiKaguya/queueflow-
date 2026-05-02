'use client'
import { useEffect, useState, useMemo } from 'react'
import { Phone, Mail, Calendar, Venus } from 'lucide-react'
import { useProfile } from '../_hooks/useProfile'
import { ProfileField, ProfileHeader } from './_Profile'

type Form = {
    full_name: string
    phone_no: string
    email: string
    birth_date: string
    gender: string
}

type FieldConfig = {
    key: keyof Form
    label: string
    icon: React.ReactNode
    type?: 'text' | 'select' | 'date'
    options?: string[]
}

const fields: FieldConfig[] = [
    { key: 'phone_no', label: 'Phone', icon: <Phone size={18} /> },
    { key: 'email', label: 'Email', icon: <Mail size={18} /> },
    {
        key: 'gender',
        label: 'Gender',
        icon: <Venus size={18} />,
        type: 'select',
        options: ['Male', 'Female', 'Non-binary'],
    },
    { key: 'birth_date', label: 'Birth Date', icon: <Calendar size={18} />, type: 'date' },
]

const toForm = (profile: NonNullable<ReturnType<typeof useProfile>['profile']>): Form => ({
    full_name: profile.full_name ?? '',
    phone_no: profile.phone_no?.toString() ?? '',
    email: profile.email ?? '',
    birth_date: profile.birth_date ?? '',
    gender: profile.gender ?? '',
})

export default function PatientProfile() {
    const { profile, loading, updating, error, updateProfile, retrieveData } = useProfile()

    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState<Form | null>(null)

    useEffect(() => {
        retrieveData()
    }, [retrieveData])

    // The committed (saved) form — always derived from profile, never stale
    const committed = useMemo(
        () => (profile ? toForm(profile) : null),
        [profile]
    )

    // What we actually render — draft while editing, committed otherwise
    const form = editing ? draft : committed

    const startEditing = () => {
        setDraft(committed)   // snapshot current profile into draft
        setEditing(true)
    }

    const cancel = () => {
        setDraft(null)
        setEditing(false)
    }

    const handleChange = (key: keyof Form) => (value: string) => {
        setDraft(prev => prev ? { ...prev, [key]: value } : prev)
    }

    const save = async () => {
        if (!draft) return
        const ok = await updateProfile({
            ...draft,
            phone_no: draft.phone_no === '' ? null : Number(draft.phone_no),
        })
        if (ok) {
            setDraft(null)
            setEditing(false)
        }
    }

    const isLoading = loading || !profile || !form

    const initials = form?.full_name
        ? form.full_name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
        : 'U'

    if (isLoading) return (
        <div className="space-y-7">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <ProfileHeader
                    initials=""
                    name=""
                    editing={false}
                    loading={true}
                    updating={false}
                    onEdit={() => {}}
                    onCancel={() => {}}
                    onSave={() => {}}
                    onNameChange={() => {}}
                />
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-5">
                    {fields.map((f) => (
                        <ProfileField
                            key={f.key}
                            icon={f.icon}
                            label={f.label}
                            value=""
                            editing={false}
                            loading={true}
                            type={f.type}
                            options={f.options}
                            onChange={() => {}}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

    if (!form) return null

    return (
        <div className="space-y-7">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <ProfileHeader
                    initials={initials}
                    name={form.full_name}
                    editing={editing}
                    loading={isLoading}
                    updating={updating}
                    onEdit={startEditing}
                    onCancel={cancel}
                    onSave={save}
                    onNameChange={handleChange('full_name')}
                />
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-5">
                    {fields.map((f) => (
                        <ProfileField
                            key={f.key}
                            icon={f.icon}
                            label={f.label}
                            value={form[f.key]}
                            editing={editing}
                            loading={isLoading}
                            type={f.type}
                            options={f.options}
                            onChange={handleChange(f.key)}
                        />
                    ))}
                </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
}