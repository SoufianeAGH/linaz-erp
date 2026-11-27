"use client";
import Link from "next/link";
import { useState } from "react";
import type { Lot, StatutLot } from "@/lib/data";
import { mad } from "@/lib/data";
import { couleurStatut, libelleStatut } from "./ui";

type B = { nom: string; etages: number; lotsParEtage: number };

export function GrilleLots({ lots, batiments, clients }: { lots: Lot[]; batiments: B[]; clients: { id: string; nom: string; lotId?: string }[] }) {
  const [choix, setChoix] = useState<Lot | null>(null);
  const [filtre, setFiltre] = useState<StatutLot | "tous">("tous");
  const statuts: StatutLot[] = ["disponible", "option", "reserve", "vendu"];
  const client = choix?.clientId ? clients.find((c) => c.id === choix.clientId) : undefined;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {(["tous", ...statuts] as const).map((s) => (
            <button key={s} onClick={() => setFiltre(s)} className={`rounded-full border px-3 py-1 text-xs ${filtre === s ? "bg-bordeaux text-white border-bordeaux" : "bg-white border-sable-300"}`}>
              {s === "tous" ? "Tous" : libelleStatut[s]} ({s === "tous" ? lots.length : lots.filter((l) => l.statut === s).length})
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {batiments.map((b) => (
            <div key={b.nom} className="carte p-4 overflow-x-auto">
              <div className="etiquette mb-3">Bâtiment {b.nom}</div>
              <div className="flex flex-col-reverse gap-1.5 min-w-[360px]">
                {Array.from({ length: b.etages }, (_, e) => (
                  <div key={e} className="flex items-center gap-1.5">
                    <div className="w-12 text-xs text-gris num shrink-0">{e === 0 ? "RDC" : `R+${e}`}</div>
                    {lots.filter((l) => l.batiment === b.nom && l.etage === e).map((l) => {
                      const masque = filtre !== "tous" && l.statut !== filtre;
                      return (
                        <button
                          key={l.id}
                          onClick={() => setChoix(l)}
                          className={`flex-1 min-w-[64px] rounded border px-2 py-1.5 text-left text-xs ${couleurStatut[l.statut]} ${masque ? "opacity-20" : ""} ${choix?.id === l.id ? "ring-2 ring-encre ring-offset-1" : ""}`}
                          aria-label={`Lot ${l.numero}, ${libelleStatut[l.statut]}`}
                        >
                          <div className="font-semibold num">{l.numero}</div>
                          <div className="opacity-80 num">{l.surface} m²</div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gris">
          {statuts.map((s) => <span key={s} className="flex items-center gap-1.5"><span className={`h-3 w-3 rounded-sm border ${couleurStatut[s]}`} />{libelleStatut[s]}</span>)}
          <span>Sous-sols : 2 niveaux de parkings titrés</span>
        </div>
      </div>

      <aside className="carte p-5 h-fit lg:sticky lg:top-6">
        {!choix ? (
          <p className="text-sm text-gris">Cliquez sur un lot pour voir sa fiche, son prix et son acquéreur.</p>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <div className="etiquette">Lot</div>
              <div className="font-titre text-3xl text-bordeaux-900">{choix.numero}</div>
              <span className={`inline-block mt-1 rounded border px-2 py-0.5 text-xs ${couleurStatut[choix.statut]}`}>{libelleStatut[choix.statut]}</span>
            </div>
            <dl className="grid grid-cols-2 gap-y-2 text-sm">
              <dt className="text-gris">Usage</dt><dd>{choix.usage}</dd>
              <dt className="text-gris">Typologie</dt><dd>{choix.type}</dd>
              <dt className="text-gris">Étage</dt><dd>{choix.etage === 0 ? "RDC" : `R+${choix.etage}`}</dd>
              <dt className="text-gris">Surface</dt><dd className="num">{choix.surface} m²</dd>
              <dt className="text-gris">Prix</dt><dd className="num font-semibold">{mad(choix.prix)}</dd>
              <dt className="text-gris">Prix / m²</dt><dd className="num">{mad(Math.round(choix.prix / choix.surface))}</dd>
            </dl>
            {client && <p className="text-sm">Acquéreur : <Link className="underline text-bordeaux" href={`/ventes/${client.id}`}>{client.nom}</Link></p>}
            {choix.statut === "disponible" && (
              <Link href={`/ventes/reservation?lot=${choix.id}`} className="btn-primaire">Poser une option ou réserver</Link>
            )}
            <button className="btn-secondaire" type="button">Télécharger le plan (PDF)</button>
          </div>
        )}
      </aside>
    </div>
  );
}
