import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Création différée : la clé service_role n'existe qu'à l'exécution (secret Cloudflare),
// pas pendant la compilation. Le client est créé au premier appel.
let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }
  return client
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const c = getClient()
    const value = Reflect.get(c, prop)
    return typeof value === 'function' ? value.bind(c) : value
  },
})
