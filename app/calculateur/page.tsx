import Link from 'next/link'
import Calculateur from './Calculateur'

export const metadata = {
  title: 'Calculateur gratuit de licences logicielles inutilisées — Licences',
  description:
    'Calculez en 2 minutes combien votre entreprise paie chaque année pour des comptes logiciels que personne n’utilise. Gratuit, sans inscription.',
  alternates: { canonical: '/calculateur' },
}

const serif = 'font-[family-name:var(--font-fraunces)]'
const h2 = `${serif} mt-10 text-2xl`
const p = 'mt-3 text-[#4A4F57]'

export default function PageCalculateur() {
  return (
    <main className="mx-auto max-w-xl px-5 font-semibold leading-relaxed">
      <header className="flex items-center justify-between py-5">
        <Link href="/" className={`${serif} text-lg`}>Licences</Link>
        <Link href="/login" className="text-sm underline underline-offset-4">Se connecter</Link>
      </header>

      <h1 className={`${serif} mt-6 text-4xl leading-[1.1] tracking-tight`}>
        Combien vous coûtent vos licences inutilisées ?
      </h1>
      <p className={p}>
        Pour chaque logiciel, indiquez le prix d&apos;un compte, le nombre de comptes payés et le nombre de personnes
        qui s&apos;en servent vraiment. Le calcul se fait dans votre navigateur : rien n&apos;est envoyé ni enregistré.
      </p>

      <div className="mt-6">
        <Calculateur />
      </div>

      <div className="mt-6 rounded-lg border border-[#DCD5C6] p-5">
        <p className="text-[#1A1F26]">
          Licences fait ce calcul pour tous vos abonnements, en continu, et vous prévient avant chaque renouvellement.
        </p>
        <Link
          href="/"
          className="mt-4 block rounded-md bg-[#D4622B] px-6 py-3 text-center text-[#FFF6EE] shadow-[0_3px_0_#A44A1F]"
        >
          Découvrir Licences — 49 € par mois
        </Link>
      </div>

      <h2 className={h2}>Comment savoir si une licence est inutilisée ?</h2>
      <p className={p}>
        La plupart des logiciels affichent, dans leur espace d&apos;administration, la date de dernière connexion de
        chaque compte. Un compte sans connexion depuis 30 à 60 jours est un bon candidat. Les cas les plus fréquents :
        un salarié parti dont le compte n&apos;a pas été fermé, un outil remplacé par un autre, ou des licences achetées
        « au cas où » lors d&apos;une embauche.
      </p>

      <h2 className={h2}>Où trouver le prix de chaque compte ?</h2>
      <p className={p}>
        Sur la dernière facture de l&apos;éditeur, ou sur vos relevés bancaires. Si la facture est annuelle, divisez
        le montant par 12, puis par le nombre de comptes.
      </p>

      <h2 className={h2}>Que faire des comptes inutilisés ?</h2>
      <p className={p}>
        Avant de supprimer un compte, vérifiez qu&apos;il ne contient pas de fichiers ou d&apos;historique utiles, puis
        réduisez le nombre de licences dans l&apos;espace de facturation de l&apos;éditeur. La baisse s&apos;applique en
        général à la prochaine échéance : faites-le avant le renouvellement, surtout pour un engagement annuel.
      </p>

      <footer className="mt-12 border-t border-[#DCD5C6] py-6 text-center text-xs text-[#7A7E85]">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </div>
      </footer>
    </main>
  )
}