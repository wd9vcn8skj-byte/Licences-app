import { supabaseAdmin } from '../../lib/supabase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { error } = await supabaseAdmin.from('paying_customers').select('email', { count: 'exact', head: true })
  if (error) return new Response('Erreur : ' + error.message, { status: 500 })
  return new Response('ok', { status: 200 })
}
