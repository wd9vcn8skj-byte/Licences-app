import Link from 'next/link'

export const metadata = { title: 'Politique de confidentialité — Licences' }

const h2 = 'mt-8 font-[family-name:var(--font-fraunces)] text-xl'
const p = 'mt-2 text-[#4A4F57]'

export default function Confidentialite() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 font-semibold leading-relaxed">
      <Link href="/" className="text-sm underline underline-offset-4">← Accueil</Link>
      <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-3xl">Politique de confidentialité</h1>
      <p className={p}>Dernière mise à jour : 6 octobre 2026</p>

      <h2 className={h2}>Responsable du traitement</h2>
      <p className={p}>
        Abdel-Kader Menheim, EI, 11 rue Raymond Weil, 02400 Château-Thierry — contact.licences@gmail.com
      </p>

      <h2 className={h2}>Données collectées</h2>
      <p className={p}>
        Votre adresse email (pour la connexion), les informations d&apos;abonnements logiciels que vous saisissez
        (outil, coût, comptes, catégorie, date de renouvellement) et les informations de paiement, traitées directement
        par Stripe. Nous ne collectons aucune donnée sensible.
      </p>

      <h2 className={h2}>Finalités et bases légales</h2>
      <p className={p}>
        Fournir le service, gérer votre abonnement et vous envoyer les emails de connexion (exécution du contrat) ;
        tenir notre comptabilité (obligation légale).
      </p>

      <h2 className={h2}>Sous-traitants</h2>
      <p className={p}>
        Supabase (base de données et authentification), Vercel (hébergement du site), Stripe (paiement et facturation).
        Certains de ces prestataires peuvent traiter des données hors de l&apos;Union européenne ; ces transferts sont
        encadrés par les clauses contractuelles types de la Commission européenne.
      </p>

      <h2 className={h2}>Durée de conservation</h2>
      <p className={p}>
        Vos données sont conservées pendant toute la durée de votre abonnement, puis 12 mois après sa fin. Les factures
        sont conservées 10 ans, conformément aux obligations comptables.
      </p>

      <h2 className={h2}>Vos droits</h2>
      <p className={p}>
        Vous pouvez accéder à vos données, les rectifier, les effacer, vous opposer à leur traitement, en demander la
        limitation ou la portabilité, en écrivant à contact.licences@gmail.com. Vous pouvez aussi adresser une
        réclamation à la CNIL (cnil.fr).
      </p>

      <h2 className={h2}>Cookies</h2>
      <p className={p}>
        Le site utilise uniquement le stockage strictement nécessaire à votre connexion. Aucun cookie publicitaire ni de
        suivi n&apos;est déposé.
      </p>
    </main>
  )
}
