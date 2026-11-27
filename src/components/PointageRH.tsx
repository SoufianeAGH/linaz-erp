"use client";
import { useState } from "react";
import { ouvriers, projets, joursMois, compteurs, mad } from "@/lib/data";

export function PointageRH() {
  const [pid, setPid] = useState("tous");
  const [detail, setDetail] = useState(false);
  const liste = ouvriers.filter((o) => pid === "tous" || o.projetId === pid);
  const tot = liste.reduce((s, o) => { const c = compteurs(o); return { t: s.t + c.travailles, a: s.a + c.absences, cout: s.cout + c.cout }; }, { t: 0, a: 0, cout: 0 });

  function exporter() {
    const lignes = [["Nom", "Métier", "Chantier", "Jours travaillés", "Jours d'absence", "Congés", "Coût journalier", "Total MAD"]];
    liste.forEach((o) => { const c = compteurs(o); lignes.push([o.nom, o.metier, projets.find((p) => p.id === o.projetId)!.nom, String(c.travailles), String(c.absences), String(c.conges), String(o.tauxJour), String(c.cout)]); });
    const csv = lignes.map((l) => l.map((x) => `"${x}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "pointage-novembre-2026.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {[{ id: "tous", nom: "Tous les chantiers" }, ...projets].map((p) => (
          <button key={p.id} onClick={() => setPid(p.id)} className={`rounded-full border px-4 py-1.5 text-sm ${pid === p.id ? "bg-bordeaux text-white border-bordeaux" : "bg-white border-sable-300"}`}>{p.nom}</button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm"><input type="checkbox" checked={detail} onChange={(e) => setDetail(e.target.checked)} /> Voir le détail par jour</label>
        <button onClick={exporter} className="btn-primaire">Exporter pour la paie (CSV)</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="carte p-4"><div className="etiquette">Jours travaillés</div><div className="text-2xl font-semibold num">{tot.t}</div></div>
        <div className="carte p-4"><div className="etiquette">Jours d'absence</div><div className="text-2xl font-semibold num text-derive">{tot.a}</div></div>
        <div className="carte p-4"><div className="etiquette">Coût main-d'œuvre</div><div className="text-2xl font-semibold num">{mad(tot.cout)}</div></div>
      </div>

      <div className="carte overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-sable-100 text-left">
            <tr>
              <th className="px-4 py-3 etiquette sticky left-0 bg-sable-100">Ouvrier</th>
              <th className="px-4 py-3 etiquette">Chantier</th>
              <th className="px-3 py-3 etiquette text-right">Travaillés</th>
              <th className="px-3 py-3 etiquette text-right">Absences</th>
              <th className="px-3 py-3 etiquette text-right">Congés</th>
              <th className="px-3 py-3 etiquette text-right">Coût</th>
              {detail && joursMois.map((j) => <th key={j} className="px-1 py-3 text-[10px] text-gris font-normal num">{j.slice(0, 2)}</th>)}
            </tr>
          </thead>
          <tbody>
            {liste.map((o) => {
              const c = compteurs(o);
              return (
                <tr key={o.id} className="border-t border-sable-300">
                  <td className="px-4 py-2 sticky left-0 bg-white whitespace-nowrap"><div className="font-medium">{o.nom}</div><div className="text-xs text-gris">{o.metier} · {o.tauxJour} MAD/j</div></td>
                  <td className="px-4 py-2 whitespace-nowrap">{projets.find((p) => p.id === o.projetId)!.nom}</td>
                  <td className="px-3 py-2 num text-right">{c.travailles}</td>
                  <td className={`px-3 py-2 num text-right ${c.absences >= 4 ? "text-derive font-semibold" : ""}`}>{c.absences}</td>
                  <td className="px-3 py-2 num text-right">{c.conges}</td>
                  <td className="px-3 py-2 num text-right whitespace-nowrap">{mad(c.cout)}</td>
                  {detail && o.presences.map((x, k) => (
                    <td key={k} className="px-0.5 py-2 text-center"><span className={`inline-block h-5 w-5 rounded-sm text-[10px] leading-5 ${x === "P" ? "bg-ok/15 text-ok" : x === "A" ? "bg-derive/15 text-derive" : "bg-sable-300 text-encre"}`}>{x}</span></td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gris mt-3">P présent · A absent · C congé. La demi-journée est prévue comme option, à confirmer avec le client. En rouge : 4 absences ou plus dans le mois.</p>
    </>
  );
}
