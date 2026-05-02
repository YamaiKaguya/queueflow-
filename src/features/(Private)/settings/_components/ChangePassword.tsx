'use client'
import { useState } from 'react'
import { Eye, EyeOff, KeyRound, Shield } from 'lucide-react'

type Props = {
    onClose: () => void
    onSave: (newPassword: string) => Promise<boolean>
    loading: boolean
    error: string | null
    success: string | null
}

export function ChangePasswordPanel({ onClose, onSave, loading, error, success }: Props) {
    const [oldPw, setOldPw] = useState('')
    const [newPw, setNewPw] = useState('')
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)

    const checks = [
        { label: 'Minimum 12 characters', pass: newPw.length >= 12 },
        { label: 'One uppercase character', pass: /[A-Z]/.test(newPw) },
        { label: 'One lowercase character', pass: /[a-z]/.test(newPw) },
        { label: 'One special character', pass: /[^a-zA-Z0-9]/.test(newPw) },
        { label: 'One number', pass: /[0-9]/.test(newPw) },
    ]

    const allPassing = checks.every(c => c.pass)

    const handleSave = async () => {
        if (!allPassing) return
        const ok = await onSave(newPw)
        if (ok) {
            setOldPw('')
            setNewPw('')
        }
    }

    return (
        <div className="px-7 pb-7 border-t border-gray-100">
            <div className="flex flex-col md:flex-row gap-10 mt-7">
                <div className="flex-1 flex flex-col gap-6">

                    {/* OLD PASSWORD */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                            <KeyRound size={16} /> Old Password
                        </label>
                        <div className="relative">
                            <input
                                title='oldpassword'
                                type={showOld ? 'text' : 'password'}
                                value={oldPw}
                                onChange={(e) => setOldPw(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm"
                            />
                            <button
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* NEW PASSWORD */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                            <Shield size={16} /> New Password
                        </label>
                        <div className="relative">
                            <input
                                title='password'
                                type={showNew ? 'text' : 'password'}
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm"
                            />
                            <button
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* FEEDBACK */}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!allPassing || loading}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Saving...' : 'Change Password'}
                        </button>
                    </div>
                </div>

                {/* REQUIREMENTS */}
                <div className="md:w-60">
                    <p className="text-sm font-semibold text-gray-700 mb-4">Password Requirements:</p>
                    <ul className="flex flex-col gap-3">
                        {checks.map((c, i) => (
                            <li key={i} className="flex items-center gap-2.5">
                                <div className={`w-[18px] h-[18px] rounded-full border-2 ${c.pass ? 'border-green-500 bg-green-500' : 'border-gray-300'}`} />
                                <span className={`text-sm ${c.pass ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                                    {c.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}