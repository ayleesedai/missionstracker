// src/pages/Login.tsx
import { useAuth } from '../supabase/AuthContext'
import { useState } from 'react'

const Login = () => {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const error = await signIn(email)
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the login link.')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send Magic Link
        </button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  )
}

export default Login;
