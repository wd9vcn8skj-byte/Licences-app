import Link from 'next/link'

export const metadata = { title: 'Politique de confidentialité — Licences' }

const h2 = 'mt-8 font-[family-name:var(--font-fraunces)] text-xl'
const p = 'mt-2 text-[#4A4F57]'

export default function Confidentialite() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 font-semibold leading-relaxed">
      <Link href="/" className="text-sm underline underline-offset-4">← Accueil</Link>
      <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-3xl">Politique de confidentialité</h1>
      <p className={p}>Dernière mise à jour : [DATE À COMPLÉTER]</p>

      <h2 className={h2}>Responsable du traitement</h2>
      <p className={p}>[NOM ET PRÉNOM À COMPLÉTER], [ADRESSE À COMPLÉTER], [EMAIL À COMPLÉTER].</p>

      <h2 className={h2}>Données collectées</h2>
      <p className={p}>Votre adresse email (pour la connexion), les informations d&apos;abonnements que vous saisissez (outil, coût, comptes, catégorie, date de renouvellement) et les informations de paiement traitées par Stripe. Nous ne collectons pas de données sensibles.</p>

      <h2 className={h2}>Finalités et bases légales</h2>
      <p className={p}>Fournir le service et gérer votre abonnement (exécution du contrat) ; vous envoyer les rappels de renouvellement et les emails de connexion (exécution du contrat) ; respecter nos obligations comptables et légales.</p>

      <h2 className={h2}>Sous-traitants</h2>
      <p className={p}>Supabase (base de données et authentification), Vercel (hébergement), Stripe (paiement). [PRÉCISER LES RÉGIONS D&apos;HÉBERGEMENT ET LES GARANTIES POUR LES TRANSFERTS HORS UE : À COMPLÉTER.]</p>

      <h2 className={h2}>Durée de conservation</h2>
      <p className={p}>Vos données sont conservées pendant la durée de votre abonnement, puis [DURÉE À COMPLÉTER] après sa fin. Les données de facturation sont conservées selon les durées légales.</p>

      <h2 className={h2}>Vos droits</h2>
      <p className={p}>Vous pouvez accéder à vos données, les rectifier, les effacer, vous opposer à leur traitement, en demander la limitation ou la portabilité, en écrivant à [EMAIL À COMPLÉTER]. Vous pouvez aussi saisir la CNIL (cnil.fr).</p>

      <h2 className={h2}>Cookies et mesure d&apos;audience</h2>
      <p className={p}>Le site utilise uniquement le stockage nécessaire à votre connexion. [SI UNE MESURE D&apos;AUDIENCE EST AJOUTÉE : LA DÉCRIRE ICI.]</p>
    </main>
  )
}
