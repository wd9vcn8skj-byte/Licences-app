'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './lib/supabase'

type Subscription = {
  id: string
  tool_name: string
  monthly_cost: number
  seats_paid: number
  seats_used: number
  category: string
  renewal_date: string
}

export default function Home() {
  const router = useRouter()
  const [subs, setSubs] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)

  const [toolName, setToolName] = useState('')
  const [monthlyCost, setMonthlyCost] = useState('')
  const [seatsPaid, setSeatsPaid] = useState('')
  const [seatsUsed, setSeatsUsed] = useState('')
  const [category, setCategory] = useState('')
  const [renewalDate, setRenewalDate] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      } else {
        setCheckingAuth(false)
        loadSubs()
      }
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
      tool_name: toolName,
      monthly_cost: parseFloat(monthlyCost) || 0,
      seats_paid: parseInt(seatsPaid) || 1,
      seats_used: parseInt(seatsUsed) || 1,
      category,
      renewal_date: renewalDate || null,
    })

    setToolName('')
    setMonthlyCost('')
    setSeatsPaid('')
    setSeatsUsed('')
    setCategory('')
    setRenewalDate('')
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

  const totalAnnuel = subs.reduce((sum, s) => sum + s.monthly_cost * 12, 0)
  const inutilises = subs.filter((s) => s.seats_used < s.seats_paid)
  const categoryCounts: Record<string, number> = {}
  subs.forEach((s) => {
    if (s.category) categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1
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
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>

      <div style={{ background: '#f5f5f5', padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <p><strong>Coût annuel total :</strong> {totalAnnuel.toFixed(2)} €</p>
        {inutilises.length > 0 && (
          <p style={{ color: '#b45309' }}>⚠️ {inutilises.length} abonnement(s) avec des comptes payés non utilisés</p>
        )}
        {doublons.length > 0 && (
          <p style={{ color: '#b45309' }}>⚠️ Doublons de fonction détectés : {doublons.map(([cat]) => cat).join(', ')}</p>
        )}
        {renouvellementsProches.length > 0 && (
          <p style={{ color: '#dc2626' }}>🔔 {renouvellementsProches.length} renouvellement(s) dans les 30 prochains jours</p>
        )}
      </div>

      <h2>Ajouter un abonnement</h2>
      <form onSubmit={handleAdd} style={{ display: 'grid', gap: 10, marginBottom: 30, maxWidth: 400 }}>
        <input placeholder="Nom de l'outil" value={toolName} onChange={(e) => setToolName(e.target.value)} required style={{ padding: 8 }} />
        <input placeholder="Coût mensuel (€)" type="number" step="0.01" value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Comptes payés" type="number" value={seatsPaid} onChange={(e) => setSeatsPaid(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Comptes utilisés" type="number" value={seatsUsed} onChange={(e) => setSeatsUsed(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Catégorie (ex: Communication)" value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 8 }} />
        <input placeholder="Date de renouvellement" type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} style={{ padding: 8 }} />
        <button type="submit" style={{ padding: 10 }}>Ajouter</button>
      </form>

      <h2>Vos abonnements</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : subs.length === 0 ? (
        <p>Aucun abonnement pour l'instant.</p>
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
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleDelete(s.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}