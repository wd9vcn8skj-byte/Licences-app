'use client'

import { useState } from 'react'

type Ligne = { outil: string; prix: string; payes: string; utilises: string }

const vide: Ligne = { outil: '', prix: '', payes: '', utilises: '' }
const serif = 'font-[family-name:var(--font-fraunces)]'
const champ =
  'w-full rounded-md border border-[#DCD5C6] bg-white px-3 py-2 text-base outline-none focus:border-[#D4622B]'

function nombre(v: string) {
  const n = parseFloat(v.replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? n : 0
}

function euros(n: number) {
  return n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
}

export default function Calculateur() {
  const [lignes, setLignes] = useState<Ligne[]>([{ ...vide }, { ...vide }, { ...vide }])

  function modifier(i: number, cle: keyof Ligne, valeur: string) {
    setLignes(lignes.map((l, j) => (j === i ? { ...l, [cle]: valeur } : l)))
  }

  let coutAnnuel = 0
  let perteAnnuelle = 0
  let comptesPayes = 0
  let comptesInutiles = 0
  for (const l of lignes) {
    const prix = nombre(l.prix)
    const payes = Math.round(nombre(l.payes))
    const utilises = Math.min(Math.round(nombre(l.utilises)), payes)
    coutAnnuel += prix * payes * 12
    perteAnnuelle += prix * (payes - utilises) * 12
    comptesPayes += payes
    comptesInutiles += payes - utilises
  }

  return (
    <div>
      <div className="space-y-4">
        {lignes.map((l, i) => (
          <div key={i} className="rounded-lg border border-[#DCD5C6] bg-[#FBF9F5] p-4">
            <label className="text-sm text-[#4A4F57]">
              Outil {i + 1}
              <input
                className={`${champ} mt-1`}
                placeholder="ex. Microsoft 365"
                value={l.outil}
                onChange={(e) => modifier(i, 'outil', e.target.value)}
              />
            </label>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <label className="text-xs text-[#4A4F57]">
                Prix / compte / mois (€)
                <input className={`${champ} mt-1`} inputMode="decimal" placeholder="12" value={l.prix}
                  onChange={(e) => modifier(i, 'prix', e.target.value)} />
              </label>
              <label className="text-xs text-[#4A4F57]">
                Comptes payés
                <input className={`${champ} mt-1`} inputMode="numeric" placeholder="20" value={l.payes}
                  onChange={(e) => modifier(i, 'payes', e.target.value)} />
              </label>
              <label className="text-xs text-[#4A4F57]">
                Vraiment utilisés
                <input className={`${champ} mt-1`} inputMode="numeric" placeholder="15" value={l.utilises}
                  onChange={(e) => modifier(i, 'utilises', e.target.value)} />
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setLignes([...lignes, { ...vide }])}
        className="mt-3 text-sm underline underline-offset-4"
      >
        + Ajouter un outil
      </button>

      <div className="mt-6 rounded-lg bg-[#1A1F26] p-5 text-[#F7F4EE]">
        <div className="text-sm opacity-80">Vous payez pour rien chaque année</div>
        <div className={`${serif} mt-1 text-4xl text-[#F0A274]`}>{euros(perteAnnuelle)}</div>
        <div className="mt-3 text-sm opacity-80">
          {comptesInutiles} compte{comptesInutiles > 1 ? 's' : ''} inutilisé{comptesInutiles > 1 ? 's' : ''} sur{' '}
          {comptesPayes} payé{comptesPayes > 1 ? 's' : ''}, pour un coût total de {euros(coutAnnuel)} par an.
        </div>
      </div>
    </div>
  )
}