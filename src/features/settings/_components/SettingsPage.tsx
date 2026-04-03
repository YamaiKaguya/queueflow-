"use client";

import { useState } from "react";

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Change Password Expanded Panel ──────────────────────────────────────────
function ChangePasswordPanel({ onClose }: { onClose: () => void }) {
  const [oldPw, setOldPw] = useState("••••••••••••");
  const [newPw, setNewPw] = useState("johndoeeee123");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [signOut, setSignOut] = useState(true);
  const [reauth, setReauth] = useState(false);

  const checks = [
    { label: "Minimum 12 characters", pass: newPw.length >= 12 },
    { label: "One uppercase character", pass: /[A-Z]/.test(newPw) },
    { label: "One lowercase character", pass: /[a-z]/.test(newPw) },
    { label: "One special character", pass: /[^a-zA-Z0-9]/.test(newPw) },
    { label: "One number", pass: /[0-9]/.test(newPw) },
  ];

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Header row */}
      <button
        onClick={onClose}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Change Password</p>
            <p className="text-xs text-gray-400">Last change 3 months ago</p>
          </div>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Expanded content */}
      <div className="px-6 pb-6 border-t border-gray-100">
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Left: inputs */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Old Password</label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPw}
                  onChange={(e) => setOldPw(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showOld ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3 mt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={signOut}
                  onChange={() => setSignOut(!signOut)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-500 accent-blue-500"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-700">Sign out of all other active session</p>
                  <p className="text-xs text-gray-400">Recommended for account security if you suspect your password was compromised.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reauth}
                  onChange={() => setReauth(!reauth)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-500 accent-blue-500"
                />
                <div>
                  <p className="text-xs font-semibold text-gray-700">Require re-authentication for future sensitive actions</p>
                  <p className="text-xs text-gray-400">Asks for your password before making security changes.</p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-2">
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 transition-colors">
                Cancel
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                Change Password
              </button>
            </div>
          </div>

          {/* Right: requirements */}
          <div className="md:w-56 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-3">Password Requirements:</p>
            <ul className="flex flex-col gap-2">
              {checks.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.pass ? (
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
                  )}
                  <span className={`text-xs ${c.pass ? "text-green-600 font-medium" : "text-gray-400"}`}>
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Settings Page ───────────────────────────────────────────────────────
export default function SettingsPage() {
  const [emailReminders, setEmailReminders] = useState(true);
  const [smsAlert, setSmsAlert] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div className="min-h-screen">

      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-10">
        {/* ── Page Header ── */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-base text-gray-400 mt-1">
            Manage your personal preferences, and account security
          </p>
        </div>

        {/* ── Notification ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Notification</h2>
          <p className="text-sm text-gray-400 mb-4">
            Control how and when we reach out to you regarding queue status
          </p>
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100">
            {/* Email Reminders */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Email Reminders</p>
                  <p className="text-xs text-gray-400">Appointment details and receipt summaries</p>
                </div>
              </div>
              <Toggle enabled={emailReminders} onChange={() => setEmailReminders(!emailReminders)} />
            </div>

            {/* SMS Alert */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">SMS Alert</p>
                  <p className="text-xs text-gray-400">Real-time queue notifications and delay alerts</p>
                </div>
              </div>
              <Toggle enabled={smsAlert} onChange={() => setSmsAlert(!smsAlert)} />
            </div>
          </div>
        </div>

        {/* ── Security ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Security</h2>
          <p className="text-sm text-gray-400 mb-4">
            Manage your password and authentication methods
          </p>
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100 overflow-hidden">
            {/* Change Password */}
            {passwordOpen ? (
              <ChangePasswordPanel onClose={() => setPasswordOpen(false)} />
            ) : (
              <button
                onClick={() => setPasswordOpen(true)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">Change Password</p>
                    <p className="text-xs text-gray-400">Last change 3 months ago</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}

            {/* Two-factor Auth */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Two-factor Authentication</p>
                  <p className="text-xs text-gray-400">add another layer of security to your account</p>
                </div>
              </div>
              <Toggle enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
            </div>
          </div>
        </div>

        {/* ── Session Management ── */}
        <div className="flex items-center justify-between py-4 border-t border-gray-200">
          <div>
            <p className="text-sm font-semibold text-gray-800">Session management</p>
            <p className="text-xs text-gray-400 mt-0.5">Logged in as John Doe</p>
          </div>
          <button className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
