"use client";
import { useState } from "react";
import { ouvriers, projets } from "@/lib/data";

type Etat = "P" | "A" | "D" | "C" | undefined;

export function AppChantier() {
  const [pid, setPid] = useState("oasis-2");
  const [onglet, setOnglet] = useState<"pointage" | "rapport">("pointage");
  const [demiJournee, setDemiJournee] = useState(false);
  const [etat, setEtat] = useState<Record<string, Etat>>({});
  const [envoye, setEnvoye] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const p = projets.find((x) => x.id === pid)!;
  const equipe = ouvriers.filter((o) => o.projetId === pid);
  const nbMarques = equipe.filter((o) => etat[o.id]).length;
  const presents = equipe.filter((o) => etat[o.id] === "P").length;

  const options: { v: Etat; l: string; c: string }[] = [
    { v: "P", l: "Présent", c: "bg-ok text-white" },
    { v: "A", l: "Absent", c: "bg-derive text-white" },
    ...(demiJournee ? [{ v: "D" as Etat, l: "½ j", c: "bg-attention text-white" }] : []),
  ];

  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[2rem] border-8 border-encre bg-sable-50 shadow-xl overflow-hidden">
      <div className="bg-bordeaux text-sable-50 px-4 pt-4 pb-3">
        <div className="flex justify-between text-[11px] text-sable-300"><span>Ven. 27/11 · 7 h 42</span><span>Hors ligne · 2 envois en attente</span></div>
        <select value={pid} onChange={(e) => { setPid(e.target.value); setEtat({}); setEnvoye(null); }} className="mt-2 w-full bg-bordeaux-700 rounded px-2 py-1.5 text-sm font-semibold" aria-label="Chantier">
          {projets.map((x) => <option key={x.id} value={x.id}>{x.nom}</option>)}
        </select>
        <div className="flex mt-3 gap-1 bg-bordeaux-900/40 rounded p-1 text-sm">
          {(["pointage", "rapport"] as const).map((o) => (
            <button key={o} onClick={() => { setOnglet(o); setEnvoye(null); }} className={`flex-1 rounded py-1.5 ${onglet === o ? "bg-sable text-bordeaux-900 font-semibold" : ""}`}>{o === "pointage" ? "Pointage" : "Rapport du jour"}</button>
          ))}
        </div>
      </div>

      <div className="p-4 h-[600px] overflow-y-auto">
        {envoye ? (
          <div className="text-center py-16 px-4">
            <div className="font-titre text-2xl text-bordeaux-900 mb-2">Enregistré</div>
            <p className="text-sm">{envoye}</p>
            <p className="text-xs text-gris mt-2">Pas de réseau : l'envoi partira automatiquement dès que la connexion revient.</p>
            <button className="btn-secondaire mt-6" onClick={() => setEnvoye(null)}>Modifier</button>
          </div>
        ) : onglet === "pointage" ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm"><span className="font-semibold num">{nbMarques}/{equipe.length}</span> ouvriers pointés · <span className="num">{presents}</span> présents</div>
              <button className="text-xs underline text-bordeaux" onClick={() => setEtat(Object.fromEntries(equipe.map((o) => [o.id, "P"])))}>Tous présents</button>
            </div>
            <label className="flex items-center gap-2 text-xs text-gris mb-3"><input type="checkbox" checked={demiJournee} onChange={(e) => setDemiJournee(e.target.checked)} /> Autoriser la demi-journée (réglage à valider avec le client)</label>
            <ul className="flex flex-col gap-2">
              {equipe.map((o) => (
                <li key={o.id} className="carte p-3 flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{o.nom}</div>
                    <div className="text-xs text-gris">{o.metier}</div>
                  </div>
                  {options.map((op) => (
                    <button key={op.l} onClick={() => setEtat({ ...etat, [o.id]: op.v })} className={`rounded px-2.5 py-2 text-xs font-medium border ${etat[o.id] === op.v ? op.c + " border-transparent" : "bg-white border-sable-300"}`}>{op.l}</button>
                  ))}
                </li>
              ))}
            </ul>
            <button disabled={nbMarques < equipe.length} onClick={() => setEnvoye(`Pointage du 27/11 pour ${p.nom} : ${presents} présents, ${equipe.length - presents} absents.`)} className="btn-primaire w-full mt-4 py-3 disabled:opacity-40">
              {nbMarques < equipe.length ? `Encore ${equipe.length - nbMarques} à pointer` : "Valider le pointage"}
            </button>
          </>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setEnvoye(`Rapport du 27/11 pour ${p.nom} avec ${photos.length} photo(s).`); }}>
            <fieldset>
              <legend className="etiquette mb-1">Météo</legend>
              <div className="flex gap-2">{["Beau", "Nuageux", "Pluie", "Vent fort"].map((m, i) => <label key={m} className="flex-1"><input type="radio" name="meteo" defaultChecked={i === 0} className="peer sr-only" /><span className="block text-center rounded border border-sable-300 py-2 text-xs peer-checked:bg-bordeaux peer-checked:text-white">{m}</span></label>)}</div>
            </fieldset>
            <div>
              <div className="etiquette mb-1">Tâches réalisées (planning du jour)</div>
              {[["Coffrage poteaux R+5", "m²", 42], ["Ferraillage dalle R+5", "t", 3.2], ["Maçonnerie cloisons R+3", "m²", 65]].map(([t, u, q]) => (
                <div key={String(t)} className="flex items-center gap-2 mb-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4" aria-label={String(t)} />
                  <span className="flex-1 text-sm">{t}</span>
                  <input defaultValue={String(q)} inputMode="decimal" className="w-16 rounded border border-sable-300 px-2 py-1 text-sm num text-right" aria-label={`Quantité ${t}`} />
                  <span className="text-xs text-gris w-6">{u}</span>
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="livraisons" className="etiquette">Livraisons reçues</label>
              <input id="livraisons" defaultValue="Acier HA12 · 12 t · BL 4471" className="mt-1 w-full rounded border border-sable-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="incidents" className="etiquette">Incidents ou blocages</label>
              <textarea id="incidents" rows={3} defaultValue="Livraison d'acier arrivée avec un jour de retard." className="mt-1 w-full rounded border border-sable-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <div className="etiquette mb-1">Photos</div>
              <label className="btn-secondaire w-full cursor-pointer">
                Prendre ou ajouter des photos
                <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => setPhotos([...photos, ...Array.from(e.target.files ?? []).map((f) => URL.createObjectURL(f))])} />
              </label>
              {photos.length > 0 && <div className="grid grid-cols-3 gap-2 mt-2">{photos.map((u) => <img key={u} src={u} alt="Photo du chantier" className="aspect-square object-cover rounded" />)}</div>}
            </div>
            <button type="submit" className="btn-primaire w-full py-3">Envoyer le rapport</button>
          </form>
        )}
      </div>
    </div>
  );
}
