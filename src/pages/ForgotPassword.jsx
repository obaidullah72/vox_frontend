import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { forgotPassword } from '../services/usersService'
import { toast } from 'react-toastify'
import { Recycle, Mail, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % 3), 800)
    return () => clearInterval(t)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      toast.error('Please enter your email')
      return
    }
    setIsSubmitting(true)
    try {
      const data = await forgotPassword({ email: trimmed })
      toast.success(data?.message || 'Request submitted')
      setEmail('')
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 1000)
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Failed to send reset email'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-50 to-white">
      <div className="absolute inset-0 pointer-events-none select-none opacity-15 bg-[url('https://images.unsplash.com/photo-1530549387789-4c1017266630?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 min-h-screen">
        <div className="hidden md:flex items-center justify-center p-10">
          <div className="rounded-2xl bg-emerald-700 text-white p-8 w-[420px] shadow-lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center">
                <Recycle className="h-5 w-5" />
              </div>
              <div className="text-xl font-semibold">E‑Waste Recycle</div>
            </div>
            <h2 className="text-3xl font-bold leading-tight">Reset access, recycle worries.</h2>
            <p className="mt-3 text-emerald-100">We secure your account while keeping the planet secure too.</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${pulse === 0 ? 'bg-emerald-300' : 'bg-emerald-500/40'}`} />
                <span className="text-emerald-100/90 text-sm">Encrypted reset links, valid for a short time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${pulse === 1 ? 'bg-emerald-300' : 'bg-emerald-500/40'}`} />
                <span className="text-emerald-100/90 text-sm">No password? No problem — magic temporary password to the rescue</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${pulse === 2 ? 'bg-emerald-300' : 'bg-emerald-500/40'}`} />
                <span className="text-emerald-100/90 text-sm">Join thousands keeping waste in circulation ♻️</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white/10 p-3">
                <div className="text-lg font-semibold">98%</div>
                <div className="text-[11px]">secure recoveries</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="text-lg font-semibold">1.2k</div>
                <div className="text-[11px]">reset requests</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="text-lg font-semibold">0</div>
                <div className="text-[11px]">data leaks</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white rounded-2xl shadow border border-emerald-100 p-6">
            <button onClick={() => navigate('/', { replace: true })} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </button>

            <div className="mt-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Forgot your password?</h1>
                  <p className="text-sm text-gray-500">We’ll send a secure link to reset it.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email here"
                    className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white ${isSubmitting ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'}`}
              >
                <Sparkles className="h-4 w-4" />
                {isSubmitting ? 'Sending…' : 'Send reset link'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              Having trouble? <Link to="/signup" className="text-emerald-700 hover:underline">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
