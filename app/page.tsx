import Link from 'next/link'

const STRIPE_LINK = 'https://buy.stripe.com/test_00w7sN8dv8gxa5e1wx7ss00'
const serif = 'font-[family-name:var(--font-fraunces)]'
const cta =
  'block rounded-md bg-[#D4622B] px-6 py-4 text-center text-lg text-[#FFF6EE] shadow-[0_3px_0_#A44A1F] active:translate-y-[2px]'

export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-5 font-semibold">
      <header className="flex items-center justify-between py-5">
        <span className={`${serif} text-lg`}>Licences</span>
        <Link href="/login" className="text-sm underline underline-offset-4">
          Se connecter
        </Link>
      </header>

      <section className="pb-8 pt-8">
        <h1 className={`${serif} text-4xl leading-[1.1] tracking-tight`}>
          Vous payez des logiciels <span className="text-[#D4622B]">que personne n&apos;utilise</span>.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[#4A4F57]">
          Licences liste tous vos abonnements, leur coût réel par personne, et vous montre exactement où vous payez
          pour rien.
        </p>

        <div className="my-7 grid grid-cols-3 gap-3 border-y border-[#DCD5C6] py-5 text-center">
          <div>
            <div className={`${serif} text-2xl text-[#D4622B]`}>49 €</div>
            <div className="mt-1 text-xs text-[#5A5F67]">par mois, sans engagement</div>
          </div>
          <div>
            <div className={`${serif} text-2xl text-[#D4622B]`}>5 min</div>
            <div className="mt-1 text-xs text-[#5A5F67]">pour saisir vos outils</div>
          </div>
          <div>
            <div className={`${serif} text-2xl text-[#D4622B]`}>0</div>
            <div className="mt-1 text-xs text-[#5A5F67]">appel, 0 rendez-vous</div>
          </div>
        </div>

        <a href={STRIPE_LINK} className={cta}>
          Voir mes abonnements
        </a>
        <p className="mt-3 text-center text-xs text-[#6B6F76]">Paiement sécurisé par Stripe · Résiliable à tout moment</p>
      </section>

      <section className="py-6">
        {[
          ['01', 'Une seule liste, tout le monde dedans', "Chaque abonnement, son coût annuel et le nombre de comptes réellement utilisés, même quand chaque service a souscrit dans son coin."],
          ['02', 'Les doublons sautent aux yeux', 'Deux équipes qui paient deux outils pour faire la même chose : repéré automatiquement, sans recouper à la main.'],
          ['03', 'Un rappel avant chaque renouvellement', 'Vous décidez de garder ou de couper un outil avant qu’il ne se renouvelle tout seul.'],
        ].map(([n, t, d]) => (
          <div key={n} className="flex gap-4 border-t border-[#DCD5C6] py-5 last:border-b">
            <span className={`${serif} pt-0.5 text-sm text-[#D4622B]`}>{n}</span>
            <div>
              <h2 className={`${serif} text-lg leading-snug`}>{t}</h2>
              <p className="mt-1 text-sm text-[#4A4F57]">{d}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="py-8">
        <h2 className={`${serif} mb-4 text-2xl`}>Comment ça marche</h2>
        <ol className="space-y-3 text-[#333]">
          <li>1. Vous payez : votre accès est prêt tout de suite.</li>
          <li>2. Vous saisissez vos abonnements, un par un.</li>
          <li>3. Vous voyez le coût réel, les doublons et les comptes à couper.</li>
        </ol>
      </section>

      <section className="pb-12">
        <a href={STRIPE_LINK} className={cta}>
          Voir mes abonnements
        </a>
        <p className="mt-3 text-center text-sm text-[#5A5F67]">
          <strong className="text-[#1A1F26]">49 €/mois</strong>, sans engagement.
        </p>
      </section>

      <footer className="border-t border-[#DCD5C6] py-6 text-center text-xs text-[#7A7E85]">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </div>
        <div className="mt-3">Licences — Abdel-Kader Menheim, EI · SIRET 889 152 468 00050</div>
      </footer>
    </main>
  )
}

