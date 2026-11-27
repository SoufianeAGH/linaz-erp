"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { lots, projets, mad } from "@/lib/data";

export function FormReservation() {
  const sp = useSearchParams();
  const lotInitial = sp.get("lot") ?? "";
  const [lotId, setLotId] = useState(lotInitial);
  const [remise, setRemise] = useState(0);
  const [fait, setFait] = useState<null | "option" | "reservation">(null);
  const dispo = lots.filter((l) => l.statut === "disponible" || l.id === lotInitial);
  const lot = lots.find((l) => l.id === lotId);
  const prixNet = lot ? lot.prix * (1 - remise / 100) : 0;

  if (fait) {
    return (
      <div className="carte p-6 max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">{fait === "option" ? "Option posée" : "Réservation enregistrée"}</h2>
        <p className="text-sm">Le lot {lot?.numero} est maintenant {fait === "option" ? "en option pendant 7 jours" : "réservé"}.{remise > 5 && " La remise dépasse 5 % : elle a été envoyée au directeur commercial pour validation."}</p>
        <div className="flex gap-3 mt-4"><Link className="btn-primaire" href="/ventes">Retour aux ventes</Link></div>
      </div>
    );
  }

  return (
    <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={(e) => e.preventDefault()}>
      <div className="carte p-5 grid gap-4 sm:grid-cols-2">
        <Champ id="nom" label="Nom et prénom" defaut="Rania Benkirane" />
        <Champ id="tel" label="Téléphone" defaut="+212 661 234 567" />
        <Champ id="cin" label="CIN" defaut="BE 123456" />
        <div className="flex flex-col gap-1">
          <label htmlFor="source" className="etiquette">Source</label>
          <select id="source" className="rounded border border-sable-300 px-3 py-2 text-sm bg-white"><option>Bureau de vente</option><option>Site web</option><option>Instagram</option><option>Recommandation</option></select>
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="lot" className="etiquette">Lot</label>
          <select id="lot" value={lotId} onChange={(e) => setLotId(e.target.value)} className="rounded border border-sable-300 px-3 py-2 text-sm bg-white">
            <option value="">Choisir un lot disponible</option>
            {projets.map((p) => (
              <optgroup key={p.id} label={p.nom}>
                {dispo.filter((l) => l.projetId === p.id).map((l) => <option key={l.id} value={l.id}>{l.numero} · {l.type} · {l.surface} m² · {mad(l.prix)}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="remise" className="etiquette">Remise (%)</label>
          <input id="remise" type="number" min={0} max={15} step={0.5} value={remise} onChange={(e) => setRemise(Number(e.target.value))} className="rounded border border-sable-300 px-3 py-2 text-sm" />
          <span className="text-xs text-gris">Au-delà de 5 %, validation du directeur commercial.</span>
        </div>
      </div>
      <div className="carte p-5 h-fit flex flex-col gap-3">
        <div className="etiquette">Récapitulatif</div>
        {lot ? (
          <>
            <div className="text-sm">Lot {lot.numero} · {lot.type} · {lot.surface} m²</div>
            <div className="text-sm text-gris num">Prix catalogue {mad(lot.prix)}</div>
            <div className="text-2xl font-semibold num text-bordeaux-900">{mad(prixNet)}</div>
            <div className="text-sm num">Avance à la réservation (10 %) : {mad(prixNet * 0.1)}</div>
          </>
        ) : <p className="text-sm text-gris">Choisissez un lot.</p>}
        <button type="button" disabled={!lot} onClick={() => setFait("option")} className="btn-secondaire disabled:opacity-40">Poser une option 7 jours</button>
        <button type="button" disabled={!lot} onClick={() => setFait("reservation")} className="btn-primaire disabled:opacity-40">Réserver</button>
      </div>
    </form>
  );
}

function Champ({ id, label, defaut }: { id: string; label: string; defaut: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="etiquette">{label}</label>
      <input id={id} defaultValue={defaut} className="rounded border border-sable-300 px-3 py-2 text-sm" />
    </div>
  );
}
