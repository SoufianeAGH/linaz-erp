import Link from "next/link";
import { projets, totaux, pct } from "@/lib/data";
import { EnTete, Pastille } from "@/components/ui";

export default function Projets() {
  return (
    <>
      <EnTete titre="Projets et lots" sousTitre="Choisissez un programme pour voir son planning et la grille de ses lots." />
      <div className="carte overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-sable-100 text-left">
            <tr>{["Programme", "Usage", "Lots", "Vendus", "Avancement", "Livraison", "Trajectoire"].map((h) => <th key={h} className="px-4 py-3 etiquette">{h}</th>)}</tr>
          </thead>
          <tbody>
            {projets.map((p) => {
              const t = totaux(p);
              return (
                <tr key={p.id} className="border-t border-sable-300 hover:bg-sable-50">
                  <td className="px-4 py-3"><Link href={`/projets/${p.id}`} className="font-semibold text-bordeaux underline-offset-2 hover:underline">{p.nom}</Link><div className="text-xs text-gris">{p.quartier}</div></td>
                  <td className="px-4 py-3">{p.usage}</td>
                  <td className="px-4 py-3 num">{t.nbLots}</td>
                  <td className="px-4 py-3 num">{pct(t.pctVendu)}</td>
                  <td className="px-4 py-3 num">{p.avancement} %</td>
                  <td className="px-4 py-3">{p.livraisonPrevue}</td>
                  <td className="px-4 py-3"><Pastille t={t.trajectoire} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
