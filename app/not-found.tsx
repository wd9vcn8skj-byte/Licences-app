import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center font-semibold">
      <p className="font-[family-name:var(--font-fraunces)] text-6xl text-[#D4622B]">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-2xl">Cette page n&apos;existe pas.</h1>
      <p className="mt-2 text-[#4A4F57]">Le lien est peut-être erroné ou la page a été déplacée.</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-[#D4622B] px-6 py-3 text-[#FFF6EE]">
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}
