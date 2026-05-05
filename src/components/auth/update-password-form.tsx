'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from "@/src/lib/utils"
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'

export function UpdatePasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const checks = [
    { label: 'Minimum 12 characters', pass: password.length >= 12 },
    { label: 'One uppercase character', pass: /[A-Z]/.test(password) },
    { label: 'One lowercase character', pass: /[a-z]/.test(password) },
    { label: 'One special character', pass: /[^a-zA-Z0-9]/.test(password) },
    { label: 'One number', pass: /[0-9]/.test(password) },
    { label: 'Passwords match', pass: password.length > 0 && password === confirmPassword },
  ]

  const allPassing = checks.every(c => c.pass)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!allPassing) return
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      router.push('/dashboard')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex min-h-screen w-full items-center justify-center bg-[#f0f4ff] px-4', className)} {...props}>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <p className="text-base text-gray-400 mb-1">Almost there!</p>
        <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-2 tracking-tight">
          Reset Your Password
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Please enter your new password below.
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* FORM */}
          <form onSubmit={handleForgotPassword} className="flex-1 flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                placeholder="New password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 transition-all h-auto"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 transition-all h-auto"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={!allPassing || isLoading}
              className="w-full !bg-[var(--primary-color)] hover:!bg-[#2d78e6] text-white font-semibold !text-base py-3 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed h-auto mt-1 cursor-pointer"
            >
              {isLoading ? 'Saving...' : 'Save new password'}
            </Button>
          </form>

          {/* REQUIREMENTS */}
          <div className="md:w-60">
            <p className="text-sm font-semibold text-gray-700 mb-4">Password Requirements:</p>
            <ul className="flex flex-col gap-3">
              {checks.map((c, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className={`w-[18px] h-[18px] rounded-full border-2 flex-shrink-0 ${c.pass ? 'border-green-500 bg-green-500' : 'border-gray-300'}`} />
                  <span className={`text-sm ${c.pass ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                    {c.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}