'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

const STRIPE_LINK = 'https://buy.stripe.com/00w7sN8dv8gxa5e1wx7ss00'
const PORTAL_LINK = 'https://billing.stripe.com/p/login/00w7sN8dv8gxa5e1wx7ss00'

const serif = 'font-[family-name:var(--font-fraunces)]'
const CATEGORIES = ['Communication', 'Visio', 'Design', 'Gestion de projet', 'Stockage', 'Bureautique', 'Comptabilité', 'CRM', 'RH', 'Marketing', 'Sécurité']

type Subscription = {
  id: string
  tool_name: string
  monthly_cost: number
  seats_paid: number
  seats_used: number
  category: string | null
  renewal_date: string | null
}

const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n)
const eurRound = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

function parseDate(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const frDate = (s: string) => parseDate(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

function daysUntil(s: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((parseDate(s).getTime() - today.getTime()) / 86400000)
}

function wastedPerYear(s: Subscription) {
  const unused = Math.max(0, s.seats_paid - s.seats_used)
  if (!s.seats_paid || !unused) return 0
  return (Number(s.monthly_cost) * 12 * unused) / s.seats_paid
}

const label = 'block text-sm text-[#4A4F57]'
const input =
  'mt-1 w-full rounded-md border border-[#DCD5C6] bg-white px-3 py-3 text-base text-[#1A1F26] focus:border-[#D4622B] focus:outline-none'

export default function Dashboard() {
  const router = useRouter()
  const [subs, setSubs] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [paid, setPaid] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadSubs = async () => {
    setLoading(true)
    const { data } = await supabase.from('subscriptions').select('*').order('monthly_cost', { ascending: false })
    if (data) setSubs(data as Subscription[])
    setLoading(false)
  }

  const resetForm = () => {
    setToolName('')
    setMonthlyCost('')
    setSeatsPaid('')
    setSeatsUsed('')
    setCategory('')
    setRenewalDate('')
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const paidSeats = Math.max(1, parseInt(seatsPaid) || 1)
    const usedSeats = Math.max(0, parseInt(seatsUsed || seatsPaid) || 0)
    if (usedSeats > paidSeats) {
      setError('Le nombre de comptes utilisés ne peut pas dépasser le nombre de comptes payés.')
      return
    }
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaving(false)
      router.push('/login')
      return
    }
    const { error: insertError } = await supabase.from('subscriptions').insert({
      user_id: user.id,
      tool_name: toolName.trim(),
      monthly_cost: Math.max(0, parseFloat(monthlyCost.replace(',', '.')) || 0),
      seats_paid: paidSeats,
      seats_used: usedSeats,
      category: category.trim() || null,
      renewal_date: renewalDate || null,
    })
    setSaving(false)
    if (insertError) {
      setError("L'abonnement n'a pas pu être enregistré. Réessayez dans un instant.")
      return
    }
    resetForm()
    setFormOpen(false)
    loadSubs()
  }

  const handleDelete = async (s: Subscription) => {
    if (!window.confirm(`Supprimer ${s.tool_name} de votre liste ?`)) return
    await supabase.from('subscriptions').delete().eq('id', s.id)
    loadSubs()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (checkingAuth) return null

  if (!paid) {
    return (
      <main className="mx-auto max-w-md px-5 py-20 font-semibold">
        <p className={`${serif} text-lg`}>Licences</p>
        <h1 className={`${serif} mt-8 text-3xl leading-tight`}>Votre accès n&apos;est pas encore activé.</h1>
        <p className="mt-3 text-[#4A4F57]">
          Aucun abonnement actif pour <strong className="text-[#1A1F26]">{userEmail}</strong>. Si vous avez déjà payé,
          connectez-vous avec l&apos;adresse email utilisée lors du paiement.
        </p>
        <a
          href={STRIPE_LINK}
          className="mt-8 block rounded-md bg-[#D4622B] px-6 py-4 text-center text-lg text-[#FFF6EE] shadow-[0_3px_0_#A44A1F]"
        >
          Activer mon accès, 49 €/mois
        </a>
        <button onClick={handleLogout} className="mt-4 w-full py-3 text-sm text-[#4A4F57] underline underline-offset-4">
          Changer d&apos;adresse email
        </button>
      </main>
    )
  }

  const totalYear = subs.reduce((sum, s) => sum + Number(s.monthly_cost) * 12, 0)
  const wastedYear = subs.reduce((sum, s) => sum + wastedPerYear(s), 0)
  const unusedSubs = subs.filter((s) => s.seats_used < s.seats_paid)

  const byCategory: Record<string, Subscription[]> = {}
  subs.forEach((s) => {
    const key = (s.category || '').trim().toLowerCase()
    if (key) (byCategory[key] ||= []).push(s)
  })
  const duplicates = Object.values(byCategory).filter((list) => list.length > 1)

  const upcoming = subs
    .filter((s) => s.renewal_date && daysUntil(s.renewal_date) >= 0 && daysUntil(s.renewal_date) <= 30)
    .sort((a, b) => daysUntil(a.renewal_date!) - daysUntil(b.renewal_date!))

  const alerts: { title: string; detail: string }[] = []
  upcoming.forEach((s) => {
    const d = daysUntil(s.renewal_date!)
    alerts.push({
      title: `${s.tool_name} se renouvelle ${d === 0 ? "aujourd'hui" : d === 1 ? 'demain' : `dans ${d} jours`}`,
      detail: `Le ${frDate(s.renewal_date!)}. Décidez maintenant de le garder ou de le couper.`,
    })
  })
  unusedSubs.forEach((s) => {
    const n = s.seats_paid - s.seats_used
    alerts.push({
      title: `${s.tool_name} : ${n} compte${n > 1 ? 's' : ''} payé${n > 1 ? 's' : ''} pour rien`,
      detail: `${eurRound(wastedPerYear(s))} par an à récupérer en retirant ${n > 1 ? 'ces comptes' : 'ce compte'}.`,
    })
  })
  duplicates.forEach((list) => {
    alerts.push({
      title: `${list.length} outils font la même chose`,
      detail: `${list.map((s) => s.tool_name).join(', ')} (${list[0].category}). Pouvez-vous n'en garder qu'un ?`,
    })
  })

  const form = (
    <form onSubmit={handleAdd} className="mt-4 grid gap-4 rounded-md border border-[#DCD5C6] bg-white/60 p-4 sm:grid-cols-2">
      <label className={`${label} sm:col-span-2`}>
        Nom de l&apos;outil
        <input className={input} value={toolName} onChange={(e) => setToolName(e.target.value)} placeholder="Slack" required maxLength={80} />
      </label>
      <label className={label}>
        Coût par mois (€)
        <input className={input} value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value)} inputMode="decimal" placeholder="80" required />
      </label>
      <label className={label}>
        Catégorie
        <input className={input} value={category} onChange={(e) => setCategory(e.target.value)} list="categories" placeholder="Communication" maxLength={40} />
        <datalist id="categories">
          {CATEGORIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>
      <label className={label}>
        Comptes payés
        <input className={input} value={seatsPaid} onChange={(e) => setSeatsPaid(e.target.value)} inputMode="numeric" placeholder="10" required />
      </label>
      <label className={label}>
        Comptes réellement utilisés
        <input className={input} value={seatsUsed} onChange={(e) => setSeatsUsed(e.target.value)} inputMode="numeric" placeholder="6" />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Date du prochain renouvellement
        <input className={input} type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} />
      </label>
      {error && <p className="text-sm text-[#B42318] sm:col-span-2">{error}</p>}
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-md bg-[#D4622B] px-4 py-3 text-[#FFF6EE] shadow-[0_3px_0_#A44A1F] disabled:opacity-60"
        >
          {saving ? 'Enregistrement…' : "Ajouter l'abonnement"}
        </button>
        {subs.length > 0 && (
          <button type="button" onClick={() => { setFormOpen(false); setError('') }} className="rounded-md border border-[#DCD5C6] px-4 py-3">
            Annuler
          </button>
        )}
      </div>
    </form>
  )

  return (
    <main className="mx-auto max-w-3xl px-5 pb-16 font-semibold">
      <header className="flex items-center justify-between py-5">
        <span className={`${serif} text-lg`}>Licences</span>
        <nav className="flex items-center gap-4 text-sm">
          <a href={PORTAL_LINK} className="text-[#D4622B] underline underline-offset-4">Mon abonnement</a>
          <button onClick={handleLogout} className="text-[#4A4F57] underline underline-offset-4">Se déconnecter</button>
        </nav>
      </header>

      {loading ? (
        <p className="py-20 text-center text-[#6B6F76]">Chargement de vos abonnements…</p>
      ) : subs.length === 0 ? (
        <section className="pt-6">
          <h1 className={`${serif} text-3xl leading-tight sm:text-4xl`}>Commencez par l&apos;outil que vous payez le plus cher.</h1>
          <p className="mt-3 max-w-[52ch] text-[#4A4F57]">
            Ajoutez vos abonnements un par un, à partir de vos relevés bancaires ou de vos factures. Dès le premier, Licences
            calcule ce qu&apos;il vous coûte par an et ce que vous payez pour rien.
          </p>
          {form}
        </section>
      ) : (
        <>
          <section className="border-b border-[#DCD5C6] pb-8 pt-6">
            <p className="text-sm text-[#5A5F67]">Vous payez chaque année</p>
            <p className={`${serif} text-5xl leading-none tracking-tight sm:text-6xl`}>{eurRound(totalYear)}</p>
            <p className="mt-3 text-[#4A4F57]">
              pour {subs.length} outil{subs.length > 1 ? 's' : ''}
              {wastedYear > 0 ? (
                <>
                  , dont <span className="text-[#D4622B]">{eurRound(wastedYear)} pour des comptes que personne n&apos;utilise</span>.
                </>
              ) : (
                <>. Aucun compte inutilisé pour l&apos;instant.</>
              )}
            </p>
          </section>

          {alerts.length > 0 && (
            <section className="py-8">
              <h2 className={`${serif} text-xl`}>À traiter</h2>
              <ul className="mt-4 space-y-3">
                {alerts.map((a, i) => (
                  <li key={i} className="border-l-2 border-[#D4622B] bg-white/60 py-3 pl-4 pr-3">
                    <p>{a.title}</p>
                    <p className="mt-1 text-sm text-[#4A4F57]">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="py-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className={`${serif} text-xl`}>Vos abonnements</h2>
              {!formOpen && (
                <button onClick={() => setFormOpen(true)} className="text-sm text-[#D4622B] underline underline-offset-4">
                  Ajouter un abonnement
                </button>
              )}
            </div>
            {formOpen && form}

            <ul className="mt-4 divide-y divide-[#DCD5C6] border-y border-[#DCD5C6]">
              {subs.map((s) => {
                const unused = s.seats_paid - s.seats_used
                const usedPct = s.seats_paid ? Math.round((s.seats_used / s.seats_paid) * 100) : 0
                const perPerson = s.seats_used ? (Number(s.monthly_cost) * 12) / s.seats_used : null
                return (
                  <li key={s.id} className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className={`${serif} truncate text-lg`}>{s.tool_name}</p>
                        {s.category && <p className="text-sm text-[#6B6F76]">{s.category}</p>}
                      </div>
                      <div className="shrink-0 text-right">
                        <p>{eur(Number(s.monthly_cost))}<span className="text-sm text-[#6B6F76]"> /mois</span></p>
                        <p className="text-sm text-[#6B6F76]">{eurRound(Number(s.monthly_cost) * 12)} /an</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDE8DE]">
                        <div className="h-full bg-[#1A1F26]" style={{ width: `${usedPct}%` }} />
                      </div>
                      <p className="mt-1.5 text-sm text-[#4A4F57]">
                        {s.seats_used} compte{s.seats_used > 1 ? 's' : ''} utilisé{s.seats_used > 1 ? 's' : ''} sur {s.seats_paid}
                        {unused > 0 && <span className="text-[#D4622B]"> · {eurRound(wastedPerYear(s))} /an perdus</span>}
                        {perPerson !== null && <span className="text-[#6B6F76]"> · {eurRound(perPerson)} /an par personne</span>}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-sm text-[#6B6F76]">
                      <span>{s.renewal_date ? `Renouvellement le ${frDate(s.renewal_date)}` : 'Date de renouvellement non renseignée'}</span>
                      <button onClick={() => handleDelete(s)} className="underline underline-offset-4 hover:text-[#B42318]">
                        Supprimer
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        </>
      )}

      <footer className="pt-4 text-center text-xs text-[#7A7E85]">
        Une question ? contact.licences@gmail.com
      </footer>
    </main>
  )
}
