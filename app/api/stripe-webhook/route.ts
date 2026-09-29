import Stripe from 'stripe'
import { supabaseAdmin } from '../../lib/supabase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Signature manquante', { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Signature invalide', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email?.trim().toLowerCase()

    if (email) {
      const { error } = await supabaseAdmin.from('paying_customers').upsert({ email })
      if (error) {
        console.error('Enregistrement du client impossible :', error.message)
        return new Response('Erreur base de données', { status: 500 })
      }
    }
  }

  return new Response('ok', { status: 200 })
}
