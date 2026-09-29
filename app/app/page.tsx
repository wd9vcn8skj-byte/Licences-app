'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

const STRIPE_LINK = 'https://buy.stripe.com/test_00w7sN8dv8gxa5e1wx7ss00'
const PORTAL_LINK = 'https://billing.stripe.com/p/login/test_00w7sN8dv8gxa5e1wx7ss00'

type Subscription = {
  id: string
  tool_name: string
  monthly_cost: number
  seats_paid: number
  seats_used: number
  category: string
  renewal_date: string
}

export default function Dashboard() {
  const router = useRouter()
  const [subs, setSubs] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [paid, setPaid] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [toolName, setToolName] = useState('')
  const [monthlyCost, setMonthlyCost] = useState('')
  const [seatsPaid, setSeatsPaid] = useState('')
  const [seatsUsed, setSeatsUsed] = useState('')
  const [category, setCategory] = useState('')
  const [renewalDate, setRenewalDate] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push('/login')
        return
      }
      const email = (session.user.email || '').toLowerCase()
      setUserEmail(email)
      const { data } = await supabase.from('paying_customers').select('email').eq('email', email).maybeSingle()
      if (data) {
        setPaid(true)
        loadSubs()
      }
      setCheckingAuth(false)
    })
  }, [])

  const loadSubs = async () => {
    setLoading(true)
    const { data } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false })
    if (data) setSubs(data as Subscription[])
    setLoading(false)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('subscriptions').insert({
      user_id: user.id,
      tool_name: toolName.trim(),
      monthly_cost: Math.max(0, parseFloat(monthlyCost) || 0),
      seats_paid: Math.max(1, parseInt(seatsPaid) || 1),
      seats_used: Math.max(0, parseInt(seatsUsed) || 0),
      category: category.trim(),
      renewal_date: renewalDate || null,
    })
    setToolName(''); setMonthlyCost(''); setSeatsPaid(''); setSeatsUsed(''); setCategory(''); setRenewalDate('')
    loadSubs()
  }

  const handleDelete = async (id: string) => {
    await supabase.from('subscriptions').delete().eq('id', id)
    loadSubs()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (checkingAuth) return null

  if (!paid) {
    return (
      <main style={{ maxWidth: 440, margin: '80px auto', padding: 20, fontFamily: 'sans-serif' }}>
        <h1>Votre accès n&apos;est pas encore activé</h1>
        <p style={{ marginTop: 12 }}>
          Aucun abonnement actif pour <strong>{userEmail}</strong>. Si vous avez déjà payé, connectez-vous avec
          l&apos;adresse email utilisée lors du paiement.
        </p>
        <a href={STRIPE_LINK} style={{ display: 'block', marginTop: 20, padding: 14, textAlign: 'center', background: '#D4622B', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>
          Activer mon accès (49 €/mois)
        </a>
        <button onClick={handleLogout} style={{ marginTop: 12, width: '100%', padding: 10 }}>
          Changer d&apos;adresse email
        </button>
      </main>
    )
  }

  const totalAnnuel = subs.reduce((sum, s) => sum + s.monthly_cost * 12, 0)
  const inutilises = subs.filter((s) => s.seats_used < s.seats_paid)
  const categoryCounts: Record<string, number> = {}
  subs.forEach((s) => {
    const c = (s.category || '').trim().toLowerCase()
    if (c) categoryCounts[c] = (categoryCounts[c] || 0) + 1
  })
  const doublons = Object.entries(categoryCounts).filter(([, count]) => count > 1)

  const today = new Date()
  const dans30jours = new Date()
  dans30jours.setDate(today.getDate() + 30)
  const renouvellementsProches = subs.filter((s) => {
    if (!s.renewal_date) return false
    const d = new Date(s.renewal_date)
    return d >= today && d <= dans30jours
  })

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Licences</h1>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}><a href={PORTAL_LINK} style={{ color: '#D4622B', textDecoration: 'underline' }}>Gérer mon abonnement</a><button onClick={handleLogout}>Se déconnecter</button></div>
      </div>

      <div style={{ background: '#f5f5f5', padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <p><strong>Coût annuel total :</strong> {totalAnnuel.toFixed(2)} €</p>
        {inutilises.length > 0 && <p style={{ color: '#b45309' }}>{inutilises.length} abonnement(s) avec des comptes payés non utilisés</p>}
        {doublons.length > 0 && <p style={{ color: '#b45309' }}>Doublons de fonction : {doublons.map(([cat]) => cat).join(', ')}</p>}
        {renouvellementsProches.length > 0 && <p style={{ color: '#dc2626' }}>{renouvellementsProches.length} renouvellement(s) dans les 30 prochains jours</p>}
      </div>

      <h2>Ajouter un abonnement</h2>
      <form onSubmit={handleAdd} style={{ display: 'grid', gap: 10, marginBottom: 30, maxWidth: 400 }}>
        <input placeholder="Nom de l'outil" value={toolName} onChange={(e) => setToolName(e.target.value)} required maxLength={80} style={{ padding: 8 }} />
        <input placeholder="Coût mensuel (€)" type="number" min="0" step="0.01" value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Comptes payés" type="number" min="1" value={seatsPaid} onChange={(e) => setSeatsPaid(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Comptes utilisés" type="number" min="0" value={seatsUsed} onChange={(e) => setSeatsUsed(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Catégorie (ex : Communication)" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={40} style={{ padding: 8 }} />
        <input type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} style={{ padding: 8 }} />
        <button type="submit" style={{ padding: 10 }}>Ajouter</button>
      </form>

      <h2>Vos abonnements</h2>
      {loading ? (
        <p>Chargement…</p>
      ) : subs.length === 0 ? (
        <p>Aucun abonnement pour l&apos;instant. Commencez par l&apos;outil que vous payez le plus cher.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: 8 }}>Outil</th>
              <th style={{ padding: 8 }}>Coût/mois</th>
              <th style={{ padding: 8 }}>Comptes</th>
              <th style={{ padding: 8 }}>Catégorie</th>
              <th style={{ padding: 8 }}>Renouvellement</th>
              <th style={{ padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 8 }}>{s.tool_name}</td>
                <td style={{ padding: 8 }}>{s.monthly_cost} €</td>
                <td style={{ padding: 8 }}>{s.seats_used}/{s.seats_paid}</td>
                <td style={{ padding: 8 }}>{s.category}</td>
                <td style={{ padding: 8 }}>{s.renewal_date}</td>
                <td style={{ padding: 8 }}><button onClick={() => handleDelete(s.id)}>Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

