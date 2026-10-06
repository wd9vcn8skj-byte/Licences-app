import Link from 'next/link'

export const metadata = { title: 'Mentions légales — Licences' }

const h2 = 'mt-8 font-[family-name:var(--font-fraunces)] text-xl'
const p = 'mt-2 text-[#4A4F57]'

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 font-semibold leading-relaxed">
      <Link href="/" className="text-sm underline underline-offset-4">← Accueil</Link>
      <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-3xl">Mentions légales</h1>

      <h2 className={h2}>Éditeur du site</h2>
      <p className={p}>
        Abdel-Kader Menheim, entrepreneur individuel (EI)<br />
        SIREN : 889 152 468 — SIRET : 889 152 468 00050<br />
        Adresse : 11 rue Raymond Weil, 02400 Château-Thierry, France<br />
        Email : contact.licences@gmail.com<br />
        TVA non applicable, art. 293 B du CGI.
      </p>

      <h2 className={h2}>Directeur de la publication</h2>
      <p className={p}>Abdel-Kader Menheim</p>

      <h2 className={h2}>Hébergement</h2>
      <p className={p}>
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com
      </p>

      <h2 className={h2}>Propriété intellectuelle</h2>
      <p className={p}>
        L&apos;ensemble des contenus du site (textes, visuels, code) est la propriété de l&apos;éditeur. Toute
        reproduction sans autorisation est interdite.
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>Pour toute question : contact.licences@gmail.com</p>
    </main>
  )
}
