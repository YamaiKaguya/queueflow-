'use client'

import { SkeletonBox } from './Skeleton'
import { Pencil, Check, X } from 'lucide-react'

type Props = {
    initials: string
    name: string
    editing: boolean
    loading: boolean
    updating: boolean
    onEdit: () => void
    onCancel: () => void
    onSave: () => void
    onNameChange: (v: string) => void
}

export function ProfileHeader({
    initials,
    name,
    editing,
    loading,
    updating,
    onEdit,
    onCancel,
    onSave,
    onNameChange,
}: Props) {
    return (
        <div className="bg-blue-500 text-white px-8 py-8 flex items-center gap-6">

            {loading ? (
                <SkeletonBox className="w-20 h-20 rounded-2xl bg-white/20" />
            ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                    {initials}
                </div>
            )}

            <div className="flex-1">
                {loading ? (
                    <SkeletonBox className="h-6 w-40 bg-white/30" />
                ) : editing ? (
                    <input
                        title='fullname'
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="bg-white/10 border-b border-white/40 text-white text-2xl font-semibold w-full focus:outline-none"
                    />
                ) : (
                    <h2 className="text-2xl font-semibold">
                        {name || 'No name set'}
                    </h2>
                )}

                <p className="text-sm text-blue-100 mt-2">
                    Patient Account
                </p>
            </div>

            {!loading && (
                editing ? (
                    <div className="flex gap-2">
                        <button onClick={onCancel} title='cancel' className="px-3 py-2 rounded-xl bg-white/20">
                            <X size={18} />
                        </button>
                        <button onClick={onSave} className="px-3 py-2 rounded-xl bg-white text-blue-600">
                            {updating ? '...' : <Check size={18} />}
                        </button>
                    </div>
                ) : (
                    <button onClick={onEdit} title='save' className="px-3 py-2 rounded-xl bg-white/20">
                        <Pencil size={18} />
                    </button>
                )
            )}
        </div>
    )
}