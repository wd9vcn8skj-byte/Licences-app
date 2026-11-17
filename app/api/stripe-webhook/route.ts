import Stripe from 'stripe'
import { supabaseAdmin } from '../../lib/supabase-admin'

// Client HTTP basé sur fetch : indispensable sur Cloudflare Workers (le client Node par défaut
// y reste bloqué), et fonctionne aussi sur Node.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { httpClient: Stripe.createFetchHttpClient() })
// Vérification de signature via Web Crypto (la version synchrone ne marche pas sur Workers).
const cryptoProvider = Stripe.createSubtleCryptoProvider()

function getCustomerId(c: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!c) return null
  return typeof c === 'string' ? c : c.id
}

function dbError(message: string) {
  console.error('Erreur base de données :', message)
  return new Response('Erreur base de données', { status: 500 })
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Signature manquante', { status: 400 })

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
      undefined,
      cryptoProvider,
    )
  } catch (e) {
    const err = e as { type?: string; message?: string }
    console.error('stripe webhook', err?.type, err?.message)
    return new Response('Signature invalide', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email?.trim().toLowerCase()
    if (email) {
      const { error } = await supabaseAdmin
        .from('paying_customers')
        .upsert({ email, stripe_customer_id: getCustomerId(session.customer) })
      if (error) return dbError(error.message)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const customerId = getCustomerId(subscription.customer)
    if (customerId) {
      const { error } = await supabaseAdmin.from('paying_customers').delete().eq('stripe_customer_id', customerId)
      if (error) return dbError(error.message)
    }
  }

  return new Response('ok', { status: 200 })
}
