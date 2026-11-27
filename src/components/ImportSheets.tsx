"use client";
import { useState } from "react";
import { projets } from "@/lib/data";

const exemple = `Date;Fournisseur;Désignation;Chantier;Montant TTC
03/11/2026;Sonasid;Acier HA12 - 12 t;Oasis 2;98400
05/11/2026;Lafarge Holcim;Ciment CPJ45 - 400 sacs;Oasis 2;31200
08/11/2026;Strugal Maroc;Acompte menuiseries;CFC 2 Bureaux;450000
12/11/2026;Location Engins Atlas;Grue mobile - 3 jours;CFC 2 Résidentiel;27000
15/11/2026;Carrelages du Nord;Carrelage grès 60x60 - 300 m²;CFC 2 Résidentiel;61500
19/11/2026;Sonasid;Acier HA10 - 8 t;Oasis 2;64800`;

const champs = ["Date", "Fournisseur", "Libellé", "Programme", "Montant", "Ignorer"];

function lireCsv(t: string) {
  const lignes = t.trim().split(/\r?\n/);
  const sep = lignes[0].includes(";") ? ";" : ",";
  return lignes.map((l) => l.split(sep).map((c) => c.replace(/^"|"$/g, "").trim()));
}

export function ImportSheets() {
  const [type, setType] = useState("Dépenses et achats");
  const [lignes, setLignes] = useState<string[][] | null>(null);
  const [map, setMap] = useState<string[]>([]);
  const [fini, setFini] = useState(false);

  function charger(t: string) {
    const l = lireCsv(t);
    setLignes(l);
    setMap(l[0].map((h) => (/date/i.test(h) ? "Date" : /fourn/i.test(h) ? "Fournisseur" : /d[ée]sign|libell/i.test(h) ? "Libellé" : /chantier|projet|programme/i.test(h) ? "Programme" : /montant|prix|total/i.test(h) ? "Montant" : "Ignorer")));
    setFini(false);
  }

  const corps = lignes?.slice(1) ?? [];
  const iProg = map.indexOf("Programme");
  const iMt = map.indexOf("Montant");
  const inconnus = iProg >= 0 ? corps.filter((r) => !projets.some((p) => p.nom.toLowerCase() === (r[iProg] ?? "").toLowerCase())).length : 0;
  const total = iMt >= 0 ? corps.reduce((s, r) => s + (Number((r[iMt] ?? "").replace(/\s/g, "").replace(",", ".")) || 0), 0) : 0;

  if (fini) {
    return (
      <div className="carte p-6 max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">Import terminé</h2>
        <p className="text-sm">{corps.length - inconnus} lignes importées dans « {type} », pour un total de {new Intl.NumberFormat("fr-MA").format(total)} MAD. Les coûts des programmes sont à jour.</p>
        <p className="text-sm text-gris mt-2">La correspondance des colonnes est enregistrée : le prochain import de ce fichier se fera en un clic.</p>
        <button className="btn-secondaire mt-4" onClick={() => { setLignes(null); setFini(false); }}>Importer un autre fichier</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="carte p-5 flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="etiquette">Type de fichier</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="rounded border border-sable-300 px-3 py-2 text-sm bg-white">
            <option>Dépenses et achats</option><option>Liste des ouvriers</option><option>Stock</option><option>Paie des ouvriers (historique)</option>
          </select>
        </div>
        <label className="btn-primaire cursor-pointer">
          Choisir un fichier CSV
          <input type="file" accept=".csv,text/csv" className="sr-only" onChange={async (e) => { const f = e.target.files?.[0]; if (f) charger(await f.text()); }} />
        </label>
        <button className="btn-secondaire" onClick={() => charger(exemple)}>Essayer avec un fichier d'exemple</button>
      </div>

      {lignes && (
        <>
          <div className="carte overflow-x-auto">
            <div className="px-5 pt-4 etiquette">1. Faites correspondre les colonnes</div>
            <table className="w-full min-w-[720px] text-sm mt-3">
              <thead>
                <tr className="bg-sable-100">
                  {lignes[0].map((h, i) => (
                    <th key={i} className="px-4 py-2 text-left align-top">
                      <div className="text-xs text-gris font-normal mb-1">{h}</div>
                      <select value={map[i]} onChange={(e) => setMap(map.map((m, k) => (k === i ? e.target.value : m)))} className="rounded border border-sable-300 px-2 py-1 text-xs bg-white" aria-label={`Champ pour la colonne ${h}`}>
                        {champs.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {corps.map((r, i) => (
                  <tr key={i} className="border-t border-sable-300">
                    {r.map((c, k) => <td key={k} className={`px-4 py-2 ${map[k] === "Ignorer" ? "text-gris line-through" : ""} ${k === iProg && !projets.some((p) => p.nom.toLowerCase() === c.toLowerCase()) ? "text-derive" : ""}`}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="carte p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm">
              <div className="etiquette mb-1">2. Vérifiez</div>
              {corps.length} lignes · total {new Intl.NumberFormat("fr-MA").format(total)} MAD
              {inconnus > 0 && <span className="text-derive"> · {inconnus} ligne(s) avec un programme inconnu seront ignorées</span>}
            </div>
            <button className="btn-primaire" onClick={() => setFini(true)}>3. Importer</button>
          </div>
        </>
      )}
    </div>
  );
}
