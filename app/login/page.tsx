'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const serif = 'font-[family-name:var(--font-fraunces)]'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [justPaid, setJustPaid] = useState(false)

  useEffect(() => {
    setJustPaid(new URLSearchParams(window.location.search).has('paye'))
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: window.location.origin + '/app' },
    })
    if (error) {
      setError("L'envoi du lien a échoué. Vérifiez l'adresse, puis réessayez dans une minute.")
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <main className="mx-auto max-w-md px-5 py-20 font-semibold">
        <h1 className={`${serif} text-3xl`}>Vérifiez votre boîte mail</h1>
        <p className="mt-3 text-[#4A4F57]">
          Un lien de connexion vient d&apos;être envoyé à <strong className="text-[#1A1F26]">{email}</strong>.
          Cliquez dessus pour ouvrir votre tableau de bord.
        </p>
        <p className="mt-3 text-sm text-[#6B6F76]">Rien reçu ? Regardez dans les courriers indésirables.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-md px-5 py-20 font-semibold">
      {justPaid && (
        <div className="mb-8 rounded-md border border-[#DCD5C6] bg-white px-4 py-3">
          <p className={`${serif} text-lg text-[#D4622B]`}>Paiement reçu, merci.</p>
          <p className="mt-1 text-sm text-[#4A4F57]">
            Entrez l&apos;adresse email utilisée pour le paiement : votre accès y est rattaché.
          </p>
        </div>
      )}
      <h1 className={`${serif} text-3xl`}>Connexion à Licences</h1>
      <p className="mt-2 text-[#4A4F57]">Pas de mot de passe : vous recevez un lien de connexion par email.</p>
      <form onSubmit={handleLogin} className="mt-6">
        <input
          type="email"
          placeholder="vous@entreprise.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-[#DCD5C6] bg-white px-4 py-3 text-base"
        />
        <button
          type="submit"
          className="mt-3 w-full rounded-md bg-[#D4622B] px-4 py-4 text-lg text-[#FFF6EE] shadow-[0_3px_0_#A44A1F]"
        >
          Recevoir mon lien de connexion
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-[#B42318]">{error}</p>}
    </main>
  )
}
