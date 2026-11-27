import Link from "next/link";
import { projets, projet, totaux, mmad, ouvriers, compteurs, mad } from "@/lib/data";
import { Barre, EnTete, Kpi, Pastille } from "@/components/ui";

export default async function Couts({ searchParams }: { searchParams: Promise<{ projet?: string }> }) {
  const sp = await searchParams;
  const p = projet(sp.projet ?? "") ?? projets[0];
  const t = totaux(p);
  const mo = ouvriers.filter((o) => o.projetId === p.id).reduce((s, o) => s + compteurs(o).cout, 0);

  return (
    <>
      <EnTete titre="Coûts et investissement" sousTitre="Budget prévu, dépensé réel et argent investi par programme. Suivi de pilotage, sans comptabilité générale.">
        <Link href="/import" className="btn-secondaire">Importer des dépenses (Google Sheets)</Link>
      </EnTete>

      <div className="flex flex-wrap gap-2 mb-6">
        {projets.map((x) => (
          <Link key={x.id} href={`/couts?projet=${x.id}`} className={`rounded-full border px-4 py-1.5 text-sm ${x.id === p.id ? "bg-bordeaux text-white border-bordeaux" : "bg-white border-sable-300"}`}>{x.nom}</Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-2xl font-semibold">{p.nom}</h2>
        <Pastille t={t.trajectoire} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Kpi label="Budget total" valeur={mmad(t.budget)} />
        <Kpi label="Dépensé à date" valeur={mmad(t.reel)} detail={`prévu à date ${mmad(t.prevuADate)}`} />
        <Kpi label="Argent investi" valeur={mmad(t.investi)} detail={`apports ${mmad(p.investissement.apports)} · crédit ${mmad(p.investissement.credit)}`} />
        <Kpi label="Encaissé clients" valeur={mmad(t.encaisse)} detail={`sur ${mmad(t.caVendu)} vendus`} />
      </div>

      <div className="carte overflow-x-auto mb-8">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-sable-100 text-left">
            <tr>{["Poste", "Budget", "Prévu à date", "Dépensé", "Écart", "Consommation du budget"].map((h) => <th key={h} className="px-4 py-3 etiquette">{h}</th>)}</tr>
          </thead>
          <tbody>
            {p.postes.map((x) => {
              const ec = x.reel / x.prevuADate - 1;
              const c = ec > 0.06 ? "text-derive" : ec > 0.02 ? "text-attention" : "text-ok";
              return (
                <tr key={x.poste} className="border-t border-sable-300">
                  <td className="px-4 py-3 font-medium">{x.poste}</td>
                  <td className="px-4 py-3 num">{mmad(x.budget)}</td>
                  <td className="px-4 py-3 num">{mmad(x.prevuADate)}</td>
                  <td className="px-4 py-3 num">{mmad(x.reel)}</td>
                  <td className={`px-4 py-3 num font-medium ${c}`}>{ec >= 0 ? "+" : ""}{(ec * 100).toFixed(1).replace(".", ",")} %</td>
                  <td className="px-4 py-3 w-56"><Barre valeur={(x.reel / x.budget) * 100} repere={Math.round((x.prevuADate / x.budget) * 100)} couleur={ec > 0.06 ? "bg-derive" : ec > 0.02 ? "bg-attention" : "bg-ok"} /></td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-sable-600 font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 num">{mmad(t.budget)}</td>
              <td className="px-4 py-3 num">{mmad(t.prevuADate)}</td>
              <td className="px-4 py-3 num">{mmad(t.reel)}</td>
              <td className="px-4 py-3 num">{t.ecart >= 0 ? "+" : ""}{(t.ecart * 100).toFixed(1).replace(".", ",")} %</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="carte p-5">
          <div className="etiquette mb-2">Main-d'œuvre de novembre (depuis le pointage)</div>
          <div className="text-2xl font-semibold num text-bordeaux-900">{mad(mo)}</div>
          <p className="text-sm text-gris mt-1">Jours travaillés × coût journalier de chaque ouvrier. <Link href="/pointage" className="underline text-bordeaux">Voir le pointage</Link></p>
        </div>
        <div className="carte p-5">
          <div className="etiquette mb-2">Marge prévisionnelle</div>
          <div className="text-2xl font-semibold num text-bordeaux-900">{mmad(t.margePrev)}</div>
          <p className="text-sm text-gris mt-1">Chiffre d'affaires total des lots ({mmad(t.ca)}) moins le budget total.</p>
        </div>
      </div>
      <p className="text-xs text-gris mt-6">Règle de trajectoire (paramétrable) : à surveiller au-delà de +2 % de dépenses ou 3 points de retard, en dérive au-delà de +6 % ou 7 points.</p>
    </>
  );
}
