'use client'

export function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <button
            title='toggle'
            onClick={onChange}
            className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors ${enabled ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
    )
}