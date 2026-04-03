'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from "@/src/lib/utils"
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import Link from 'next/link'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const hasMinLength = password.length >= 8
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
          data: { first_name: firstName, last_name: lastName },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex min-h-screen w-full', className)} {...props}>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-[#f0f5ff] px-16 py-12 text-center">
        <div className="w-full max-w-sm mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/login-illustration.png"
            alt="QueueFlow illustration"
            className="w-full h-auto object-contain"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
          Join QueueFlow+ Today!
        </h2>
        <p className="text-base text-gray-500 max-w-xs leading-relaxed">
          Sign up to manage your spot in queue, get notified when it&apos;s your turn,
          and enjoy a seamless waiting experience.
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 bg-white px-8 py-12">

        {/* Back arrow */}
        <div className="w-full max-w-md mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign up to QueueFlow+</h1>
          <p className="text-sm text-gray-500 mb-7">Create an account to start queueing</p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-sm text-gray-700">First Name</label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder=""
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-3 text-gray-800 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-sm text-gray-700">Last Name</label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder=""
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-3 text-gray-800 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-gray-700">Email</label>
              <Input
                id="email"
                type="email"
                placeholder=""
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-3 text-gray-800 transition-all"
              />
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-gray-700">Password</label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-3 text-gray-800 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="repeat-password" className="text-sm text-gray-700">Confirm Password</label>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 text-sm px-4 py-3 text-gray-800 transition-all"
                />
              </div>
            </div>

            {/* Password requirements */}
            {password.length > 0 && (
              <div className="text-xs text-gray-500 flex flex-col gap-1 -mt-1">
                <p className="font-medium text-gray-600">Password must:</p>
                <p className={hasMinLength ? 'text-green-500' : ''}>
                  {hasMinLength ? '✓' : '•'} Be a minimum of 8 characters
                </p>
                <p className={hasLowercase ? 'text-green-500' : ''}>
                  {hasLowercase ? '✓' : '•'} Include at least one lower case letter (a-z)
                </p>
                <p className={hasUppercase ? 'text-green-500' : ''}>
                  {hasUppercase ? '✓' : '•'} Include at least one upper case letter (A-Z)
                </p>
                <p className={hasNumber ? 'text-green-500' : ''}>
                  {hasNumber ? '✓' : '•'} Include at least one number (0-9)
                </p>
              </div>
            )}

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#4395ff] cursor-pointer"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="/terms" className="text-[#4395ff] hover:text-[#2d78e6] transition-colors">Terms of use</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#4395ff] hover:text-[#2d78e6] transition-colors">Privacy Policy</Link>
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            {/* Sign Up button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4395ff] hover:bg-[#2d78e6] text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating an account...' : 'Sign Up'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or sign up with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signInWithOAuth({ provider: 'google' })
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-[#4395ff] font-semibold hover:text-[#2d78e6] transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}