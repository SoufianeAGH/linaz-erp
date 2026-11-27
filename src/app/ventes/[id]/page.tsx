import Link from "next/link";
import { notFound } from "next/navigation";
import { clients, lots, projet, etapesEcheancier, etapes, mad } from "@/lib/data";
import { EnTete } from "@/components/ui";

export function generateStaticParams() {
  return clients.map((c) => ({ id: c.id }));
}

export default async function FicheClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = clients.find((x) => x.id === id);
  if (!c) notFound();
  const p = projet(c.projetId)!;
  const l = c.lotId ? lots.find((x) => x.id === c.lotId) : undefined;
  const idxEtape = etapes.indexOf(c.etape);

  return (
    <>
      <div className="text-sm mb-2"><Link href="/ventes" className="text-bordeaux underline">Ventes</Link> / {c.nom}</div>
      <EnTete titre={c.nom} sousTitre={`${p.nom} · suivi par ${c.commercial} · source : ${c.source}`}>
        <div className="flex gap-2 flex-wrap">
          <button className="btn-secondaire" type="button">Générer le contrat de réservation</button>
          <button className="btn-primaire" type="button">Enregistrer un paiement</button>
        </div>
      </EnTete>

      <ol className="flex flex-wrap gap-2 mb-8">
        {etapes.map((e, i) => (
          <li key={e} className={`rounded-full px-3 py-1 text-xs border ${i < idxEtape ? "bg-sable-300 border-sable-600" : i === idxEtape ? "bg-bordeaux text-white border-bordeaux" : "bg-white border-sable-300 text-gris"}`}>{e}</li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="carte p-5 h-fit">
          <div className="etiquette mb-3">Coordonnées et bien</div>
          <dl className="grid grid-cols-[110px_1fr] gap-y-2 text-sm">
            <dt className="text-gris">Téléphone</dt><dd className="num select-all">{c.telephone}</dd>
            <dt className="text-gris">CIN</dt><dd className="text-gris">à saisir</dd>
            <dt className="text-gris">Budget</dt><dd className="num">{mad(c.budget)}</dd>
            <dt className="text-gris">Lot</dt><dd>{l ? <Link className="underline text-bordeaux" href={`/projets/${p.id}`}>{l.numero} · {l.type} · {l.surface} m²</Link> : "Aucun lot choisi"}</dd>
            {l && (<><dt className="text-gris">Prix</dt><dd className="num font-semibold">{mad(l.prix)}</dd></>)}
            <dt className="text-gris">Dernière action</dt><dd>{c.derniereAction}</dd>
            <dt className="text-gris">Prochaine</dt><dd className="text-bordeaux">{c.prochaineAction}</dd>
          </dl>
        </div>

        <div className="carte overflow-x-auto">
          <div className="px-5 pt-5 etiquette">Échéancier VEFA (modèle d'exemple à valider)</div>
          {l ? (
            <table className="w-full min-w-[560px] text-sm mt-3">
              <thead className="bg-sable-100 text-left"><tr>{["Étape", "Part", "Montant", "Jalon du chantier", "Statut"].map((h) => <th key={h} className="px-5 py-2 etiquette">{h}</th>)}</tr></thead>
              <tbody>
                {etapesEcheancier.map((e) => {
                  const atteint = e.etape === "Réservation" ? idxEtape >= 3 : p.avancement >= e.seuil;
                  const paye = atteint && (e.etape === "Réservation" || idxEtape >= 4);
                  return (
                    <tr key={e.etape} className="border-t border-sable-300">
                      <td className="px-5 py-3 font-medium">{e.etape}</td>
                      <td className="px-5 py-3 num">{e.part * 100} %</td>
                      <td className="px-5 py-3 num">{mad(l.prix * e.part)}</td>
                      <td className="px-5 py-3 text-gris">{e.jalon}</td>
                      <td className="px-5 py-3">{paye ? <span className="text-ok font-medium">Payé</span> : atteint ? <span className="text-derive font-medium">Appel de fonds envoyé, en attente</span> : <span className="text-gris">À venir</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="p-5 text-sm text-gris">L'échéancier apparaît dès qu'un lot est réservé.</p>
          )}
        </div>
      </div>
    </>
  );
}
