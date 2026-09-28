'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    })
    if (error) {
      setError('Une erreur est survenue. Vérifiez votre adresse email.')
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: 20, fontFamily: 'sans-serif' }}>
        <h1>Vérifiez votre boîte mail</h1>
        <p>Nous vous avons envoyé un lien de connexion à {email}.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Connexion à Licences</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, fontSize: 16 }}>
          Recevoir mon lien de connexion
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}