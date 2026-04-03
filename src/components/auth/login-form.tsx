'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { cn } from "@/src/lib/utils"
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import Link from 'next/link'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [rememberMe, setRememberMe] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      const supabase = createClient()
      setIsLoading(true)
      setError(null)
      try {
         const { error } = await supabase.auth.signInWithPassword({ email, password })
         if (error) throw error
         router.push('/')
      } catch (error: unknown) {
         setError(error instanceof Error ? error.message : 'An error occurred')
      } finally {
         setIsLoading(false)
      }
   }

   const handleGoogleLogin = async () => {
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
         provider: 'google',
         options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
   }

   return (
      <div
         className={cn('flex min-h-screen w-full', className)}
         {...props}
      >
         {/* ── Left panel ── */}
         <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-[#f0f4ff] px-12 py-16 text-center">
            <div className="w-full max-w-sm">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  src="/illustrations/login-hero.png"
                  alt="QueueFlow+ illustration"
                  className="w-full object-contain drop-shadow-md"
               />
            </div>
            <h2 className="mt-8 text-2xl font-extrabold text-gray-800 tracking-tight">
               Join QueueFlow+ Today!
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
               Sign up to manage your spot in queue, get notified when it&apos;s your turn,
               and enjoy a seamless waiting experience.
            </p>
         </div>

         {/* ── Right panel ── */}
         <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-white px-6 py-16 relative">
            {/* Back button */}
            <button
               onClick={() => router.back()}
               className="absolute top-6 left-6 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
               aria-label="Go back"
            >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
               </svg>
            </button>

            <div className="w-full max-w-sm">
               {/* Heading */}
               <p className="text-sm text-gray-400 mb-1">Hi! Welcome back</p>
               <h1 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
                  Log in to QueueFlow+
               </h1>

               <form onSubmit={handleLogin} className="flex flex-col gap-4">
                  {/* Email */}
                  <Input
                     id="email"
                     type="email"
                     placeholder="Email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 transition-all h-auto"
                  />

                  {/* Password */}
                  <Input
                     id="password"
                     type="password"
                     placeholder="Password"
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-[#4395ff] focus:ring-2 focus:ring-[#4395ff]/20 transition-all h-auto"
                  />

                  {/* Remember me + Forgot password */}
                  <div className="flex items-center justify-between">
                     <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                           type="checkbox"
                           checked={rememberMe}
                           onChange={(e) => setRememberMe(e.target.checked)}
                           className="w-4 h-4 rounded border-gray-300 accent-[#4395ff]"
                        />
                        <span className="text-xs text-gray-500">Remember me</span>
                     </label>
                     <Link
                        href="/auth/forgot-password"
                        className="text-xs text-[#4395ff] hover:text-[#2d78e6] transition-colors font-medium"
                     >
                        Forgot Password?
                     </Link>
                  </div>

                  {error && (
                     <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-500">
                        {error}
                     </div>
                  )}

                  {/* Sign in button */}
                  <Button
                     type="submit"
                     disabled={isLoading}
                     className="w-full bg-[#4395ff] hover:bg-[#2d78e6] text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed h-auto mt-1"
                  >
                     {isLoading ? 'Signing in…' : 'Sign In'}
                  </Button>
               </form>

               {/* Divider */}
               <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or sign in with</span>
                  <div className="flex-1 h-px bg-gray-200" />
               </div>

               {/* Google button */}
               <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
               >
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
               </button>

               {/* Sign up link */}
               <p className="text-center text-xs text-gray-400 mt-7">
                  Don&apos;t have an account?{' '}
                  <Link
                     href="/auth/sign-up"
                     className="text-[#4395ff] font-semibold hover:text-[#2d78e6] transition-colors"
                  >
                     Sign Up
                  </Link>
               </p>
            </div>
         </div>
      </div>
   )
}