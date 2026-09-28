import Link from 'next/link'

export const metadata = { title: 'Conditions générales de vente — Licences' }

const h2 = 'mt-8 font-[family-name:var(--font-fraunces)] text-xl'
const p = 'mt-2 text-[#4A4F57]'

export default function CGV() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 font-semibold leading-relaxed">
      <Link href="/" className="text-sm underline underline-offset-4">← Accueil</Link>
      <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-3xl">Conditions générales de vente</h1>
      <p className={p}>Dernière mise à jour : [DATE À COMPLÉTER]</p>

      <h2 className={h2}>1. Vendeur</h2>
      <p className={p}>[NOM ET PRÉNOM À COMPLÉTER], entrepreneur individuel, SIRET [SIRET À COMPLÉTER], [ADRESSE À COMPLÉTER]. Contact : [EMAIL À COMPLÉTER].</p>

      <h2 className={h2}>2. Objet</h2>
      <p className={p}>Licences est un service en ligne qui permet à une entreprise de recenser ses abonnements logiciels, de suivre leur coût, de repérer les comptes inutilisés et les doublons de fonction, et d&apos;être avertie avant chaque renouvellement. Le service est destiné aux professionnels.</p>

      <h2 className={h2}>3. Prix et paiement</h2>
      <p className={p}>L&apos;abonnement coûte 49 € par mois [HT / TTC : À COMPLÉTER SELON VOTRE RÉGIME DE TVA]. Le paiement s&apos;effectue par carte via Stripe, à la souscription puis chaque mois. Aucune donnée bancaire n&apos;est conservée par Licences.</p>

      <h2 className={h2}>4. Durée et résiliation</h2>
      <p className={p}>L&apos;abonnement est mensuel, sans engagement, et se renouvelle tacitement. Le client peut le résilier à tout moment ; la résiliation prend effet à la fin de la période déjà payée. [MODALITÉ DE RÉSILIATION À COMPLÉTER : par exemple par email à l&apos;adresse de contact.] Aucun remboursement au prorata n&apos;est dû pour une période entamée, sauf disposition légale contraire.</p>

      <h2 className={h2}>5. Accès au service</h2>
      <p className={p}>L&apos;accès est activé après confirmation du paiement, par lien de connexion envoyé à l&apos;adresse email indiquée. Le client est responsable de la confidentialité de cet accès.</p>

      <h2 className={h2}>6. Responsabilité</h2>
      <p className={p}>Licences est un outil d&apos;aide à la décision : les alertes reposent sur les informations saisies par le client. Le vendeur est tenu d&apos;une obligation de moyens et ne peut être tenu responsable d&apos;une décision prise sur la base de données inexactes ou incomplètes. Le service peut être interrompu pour maintenance ; le vendeur s&apos;efforce d&apos;en limiter la durée.</p>

      <h2 className={h2}>7. Données personnelles</h2>
      <p className={p}>Le traitement des données est décrit dans la <Link href="/confidentialite" className="underline underline-offset-4">politique de confidentialité</Link>.</p>

      <h2 className={h2}>8. Droit applicable</h2>
      <p className={p}>Les présentes conditions sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action ; à défaut, les tribunaux compétents seront ceux du ressort de [VILLE À COMPLÉTER].</p>
    </main>
  )
}
