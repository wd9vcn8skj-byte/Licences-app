import Link from 'next/link'

export const metadata = { title: 'Mentions légales — Licences' }

export default function MentionsLegales() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 font-semibold leading-relaxed">
      <Link href="/" className="text-sm underline underline-offset-4">← Accueil</Link>
      <h1 className="mt-6 font-[family-name:var(--font-fraunces)] text-3xl">Mentions légales</h1>

      <h2 className="mt-8 font-[family-name:var(--font-fraunces)] text-xl">Éditeur du site</h2>
      <p className="mt-2 text-[#4A4F57]">
        [NOM ET PRÉNOM À COMPLÉTER], entrepreneur individuel.<br />
        SIRET : [SIRET À COMPLÉTER]<br />
        Adresse : [ADRESSE À COMPLÉTER]<br />
        Email : [EMAIL DE CONTACT À COMPLÉTER]<br />
        [TVA : mention à compléter selon votre régime (par exemple : TVA non applicable, art. 293 B du CGI).]
      </p>

      <h2 className="mt-8 font-[family-name:var(--font-fraunces)] text-xl">Directeur de la publication</h2>
      <p className="mt-2 text-[#4A4F57]">[NOM ET PRÉNOM À COMPLÉTER]</p>

      <h2 className="mt-8 font-[family-name:var(--font-fraunces)] text-xl">Hébergement</h2>
      <p className="mt-2 text-[#4A4F57]">
        Site : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.<br />
        Base de données : Supabase.
      </p>

      <h2 className="mt-8 font-[family-name:var(--font-fraunces)] text-xl">Propriété intellectuelle</h2>
      <p className="mt-2 text-[#4A4F57]">
        L&apos;ensemble des contenus du site (textes, visuels, code) est protégé. Toute reproduction sans autorisation est interdite.
      </p>

      <h2 className="mt-8 font-[family-name:var(--font-fraunces)] text-xl">Contact</h2>
      <p className="mt-2 text-[#4A4F57]">Pour toute question : [EMAIL DE CONTACT À COMPLÉTER].</p>
    </main>
  )
}
