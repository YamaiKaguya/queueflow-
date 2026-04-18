'use client'

import { useState } from 'react'
import { Mail, Smartphone, Lock, LogOut, ChevronRight, ChevronDown, Eye, EyeOff, ShieldCheck } from 'lucide-react'

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

// ─── Change Password Panel ────────────────────────────────────────────────────
function ChangePasswordPanel({ onClose }: { onClose: () => void }) {
  const [oldPw, setOldPw] = useState('••••••••••••')
  const [newPw, setNewPw] = useState('johndoeeee123')
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const checks = [
    { label: 'Minimum 12 characters', pass: newPw.length >= 12 },
    { label: 'One uppercase character', pass: /[A-Z]/.test(newPw) },
    { label: 'One lowercase character', pass: /[a-z]/.test(newPw) },
    { label: 'One special character', pass: /[^a-zA-Z0-9]/.test(newPw) },
    { label: 'One number', pass: /[0-9]/.test(newPw) },
  ]

  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
      {/* Header */}
      <button onClick={onClose} className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
            <Lock size={22} className="text-gray-500" />
          </div>
          <div className="text-left">
            <p className="text-base font-semibold text-gray-800">Change Password</p>
            <p className="text-sm text-gray-400">Last change 3 months ago</p>
          </div>
        </div>
        <ChevronDown size={20} className="text-gray-400" />
      </button>

      {/* Expanded */}
      <div className="px-7 pb-7 border-t border-gray-100">
        <div className="flex flex-col md:flex-row gap-10 mt-7">
          {/* Inputs */}
          <div className="flex-1 flex flex-col gap-6">
            {[
              { label: 'Old Password', value: oldPw, set: setOldPw, show: showOld, toggle: () => setShowOld(!showOld) },
              { label: 'New Password', value: newPw, set: setNewPw, show: showNew, toggle: () => setShowNew(!showNew) },
            ].map(({ label, value, set, show, toggle }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-1">
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 transition-colors">Cancel</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">Change Password</button>
            </div>
          </div>

          {/* Requirements */}
          <div className="md:w-60 flex-shrink-0">
            <p className="text-sm font-semibold text-gray-700 mb-4">Password Requirements:</p>
            <ul className="flex flex-col gap-3">
              {checks.map((c, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  {c.pass ? (
                    <ShieldCheck size={18} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${c.pass ? 'text-green-600 font-medium' : 'text-gray-400'}`}>{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Setting Row ──────────────────────────────────────────────────────────────
function SettingRow({ icon, label, desc, enabled, onToggle }: { icon: React.ReactNode; label: string; desc: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between px-6 py-5">
      <div className="flex items-center gap-5">
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">{icon}</div>
        <div>
          <p className="text-base font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
        </div>
      </div>
      <Toggle enabled={enabled} onChange={onToggle} />
    </div>
  )
}

// ─── Main Settings Page ───────────────────────────────────────────────────────
export default function SettingsPage() {
  const [emailReminders, setEmailReminders] = useState(true)
  const [smsAlert, setSmsAlert] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [passwordOpen, setPasswordOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <div className="max-w-3xl mx-auto px-8 py-12 flex flex-col gap-12">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-base text-gray-400 mt-2">Manage your personal preferences, and account security</p>
        </div>

        {/* Notification */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1.5">Notification</h2>
          <p className="text-sm text-gray-400 mb-5">Control how and when we reach out to you regarding queue status</p>
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100">
            <SettingRow
              icon={<Mail size={22} className="text-gray-500" />}
              label="Email Reminders"
              desc="Appointment details and receipt summaries"
              enabled={emailReminders}
              onToggle={() => setEmailReminders(!emailReminders)}
            />
            <SettingRow
              icon={<Smartphone size={22} className="text-gray-500" />}
              label="SMS Alert"
              desc="Real-time queue notifications and delay alerts"
              enabled={smsAlert}
              onToggle={() => setSmsAlert(!smsAlert)}
            />
          </div>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1.5">Security</h2>
          <p className="text-sm text-gray-400 mb-5">Manage your password and authentication methods</p>
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden">
            {passwordOpen ? (
              <ChangePasswordPanel onClose={() => setPasswordOpen(false)} />
            ) : (
              <button onClick={() => setPasswordOpen(true)} className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Lock size={22} className="text-gray-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-semibold text-gray-800">Change Password</p>
                    <p className="text-sm text-gray-400 mt-0.5">Last change 3 months ago</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            )}
            <SettingRow
              icon={<Smartphone size={22} className="text-gray-500" />}
              label="Two-factor Authentication"
              desc="Add another layer of security to your account"
              enabled={twoFactor}
              onToggle={() => setTwoFactor(!twoFactor)}
            />
          </div>
        </div>

        {/* Session */}
        <div className="flex items-center justify-between py-5 border-t border-gray-200">
          <div>
            <p className="text-base font-semibold text-gray-800">Session management</p>
            <p className="text-sm text-gray-400 mt-0.5">Logged in as John Doe</p>
          </div>
          <button className="flex items-center gap-2 bg-red-400 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  )
}