import Link from "next/link";
import { projets, totaux, mmad, pct, clients, ouvriers, compteurs } from "@/lib/data";
import { Barre, EnTete, Kpi, Pastille } from "@/components/ui";

export default function TableauDeBord() {
  const lignes = projets.map((p) => ({ p, t: totaux(p) }));
  const ca = lignes.reduce((s, x) => s + x.t.caVendu, 0);
  const encaisse = lignes.reduce((s, x) => s + x.t.encaisse, 0);
  const reel = lignes.reduce((s, x) => s + x.t.reel, 0);
  const investi = lignes.reduce((s, x) => s + x.t.investi, 0);
  const presentsHier = ouvriers.filter((o) => o.presences[o.presences.length - 1] === "P").length;
  const relances = clients.filter((c) => c.etape === "Option" || c.etape === "Réservé").length;

  return (
    <>
      <EnTete titre="Bonjour, voici vos projets" sousTitre="Vendredi 27 novembre 2026 · 3 programmes en cours · chiffres d'exemple">
        <Link href="/synthese" className="btn-primaire">Lire la synthèse IA du matin</Link>
      </EnTete>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Kpi label="Ventes signées et réservées" valeur={mmad(ca)} detail={`${mmad(encaisse)} encaissés`} />
        <Kpi label="Dépensé à date" valeur={mmad(reel)} detail="tous postes, 3 programmes" />
        <Kpi label="Argent investi" valeur={mmad(investi)} detail="apports et crédits" />
        <Kpi label="Ouvriers présents hier" valeur={`${presentsHier} / ${ouvriers.length}`} detail={`${relances} dossiers clients à relancer`} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Programmes</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {lignes.map(({ p, t }) => (
          <Link key={p.id} href={`/projets/${p.id}`} className="carte p-5 flex flex-col gap-4 hover:border-bordeaux transition-colors min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-2xl font-semibold">{p.nom}</h3>
                <div className="text-sm text-gris">{p.quartier}</div>
              </div>
              <span className="etiquette whitespace-nowrap">{p.usage}</span>
            </div>
            <Pastille t={t.trajectoire} />
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Avancement travaux</span><span className="num font-medium">{p.avancement} % <span className="text-gris font-normal">/ prévu {p.avancementPrevu} %</span></span></div>
              <Barre valeur={p.avancement} repere={p.avancementPrevu} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>Lots vendus</span><span className="num font-medium">{t.nbVendus} / {t.nbLots} · {pct(t.pctVendu)}</span></div>
              <Barre valeur={t.pctVendu * 100} couleur="bg-sable-600" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="whitespace-nowrap mr-2">Dépensé / budget</span><span className="num font-medium">{mmad(t.reel)} / {mmad(t.budget)}</span></div>
              <Barre valeur={(t.reel / t.budget) * 100} repere={Math.round((t.prevuADate / t.budget) * 100)} couleur={t.ecart > 0.06 ? "bg-derive" : t.ecart > 0.02 ? "bg-attention" : "bg-ok"} />
              <div className="text-xs text-gris mt-1 num">Écart au prévu à date : {t.ecart >= 0 ? "+" : ""}{(t.ecart * 100).toFixed(1).replace(".", ",")} %</div>
            </div>
            <div className="text-xs text-gris border-t border-sable-300 pt-3">Livraison prévue {p.livraisonPrevue} · Chef de chantier {p.chefChantier}</div>
          </Link>
        ))}
      </div>
      <p className="text-xs text-gris mt-6">Les repères noirs sur les barres indiquent le niveau prévu à date selon le planning et le budget.</p>
    </>
  );
}
