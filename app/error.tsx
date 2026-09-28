'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center font-semibold">
      <h1 className="font-[family-name:var(--font-fraunces)] text-2xl">Un problème est survenu.</h1>
      <p className="mt-2 text-[#4A4F57]">Ce n&apos;est pas de votre faute. Réessayez, ou revenez à l&apos;accueil.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={() => reset()} className="rounded-md bg-[#D4622B] px-6 py-3 text-[#FFF6EE]">
          Réessayer
        </button>
        <a href="/" className="rounded-md border border-[#DCD5C6] px-6 py-3">Accueil</a>
      </div>
    </main>
  )
}
