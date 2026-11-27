import Link from "next/link";
import { projets, totaux, ouvriers, compteurs, clients, mmad, pct } from "@/lib/data";
import { EnTete, Pastille } from "@/components/ui";

// Prototype : texte construit à partir des données d'exemple.
// Dans la version réelle, un modèle d'IA rédige cette synthèse chaque nuit à partir des rapports journaliers.
export default function Synthese() {
  return (
    <>
      <EnTete titre="Synthèse du matin" sousTitre="Rédigée à 6 h 00 à partir des rapports journaliers du jeudi 26 novembre, du planning, des ventes et des coûts." />

      <div className="carte p-5 mb-6 bg-bordeaux-50 border-bordeaux-100">
        <div className="etiquette mb-2">En bref</div>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>CFC 2 Bureaux</strong> est en dérive : les dépenses dépassent de 7 % le prévu à date (gros œuvre +10 %) et le chantier a 8 points de retard sur le planning.</li>
          <li><strong>Oasis 2</strong> est à surveiller : 6 points de retard, liés au retard du terrassement en début d'année. Les coûts du gros œuvre dépassent le prévu de 12 %.</li>
          <li><strong>CFC 2 Résidentiel</strong> avance comme prévu. Il reste {totauxRestants("cfc-2")} lots à vendre.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        {projets.map((p) => {
          const t = totaux(p);
          const ov = ouvriers.filter((o) => o.projetId === p.id);
          const presents = ov.filter((o) => o.presences[o.presences.length - 1] === "P").length;
          const absRepetes = ov.filter((o) => compteurs(o).absences >= 4);
          const aRelancer = clients.filter((c) => c.projetId === p.id && (c.etape === "Option" || c.etape === "Réservé"));
          const pire = [...p.postes].sort((a, b) => b.reel / b.prevuADate - a.reel / a.prevuADate)[0];
          return (
            <section key={p.id} className="carte p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h2 className="text-2xl font-semibold">{p.nom}</h2>
                <Pastille t={t.trajectoire} />
              </div>
              <div className="grid gap-4 md:grid-cols-2 text-[15px] leading-relaxed">
                <div>
                  <div className="etiquette mb-1">Chantier</div>
                  <p>Avancement {p.avancement} % pour {p.avancementPrevu} % prévu. Hier, {presents} ouvriers présents sur {ov.length}.
                    {p.id === "oasis-2" && " Coulage de la dalle du 5e étage du bâtiment A terminé. Livraison d'acier de 12 t reçue avec un jour de retard."}
                    {p.id === "cfc-2" && " Pose du carrelage aux étages 4 et 5, faux plafonds au 3e. Aucun incident signalé."}
                    {p.id === "cfc-2-bureaux" && " Les menuiseries Strugal du 2e étage ne sont pas livrées : le fournisseur annonce le 3 décembre."}
                  </p>
                  {absRepetes.length > 0 && (
                    <p className="mt-2 text-derive">Absences répétées ce mois : {absRepetes.map((o) => `${o.nom} (${compteurs(o).absences} j)`).join(", ")}.</p>
                  )}
                </div>
                <div>
                  <div className="etiquette mb-1">Coûts et ventes</div>
                  <p>Dépensé {mmad(t.reel)} pour {mmad(t.prevuADate)} prévus à date. Poste le plus en écart : {pire.poste.toLowerCase()} (+{Math.round((pire.reel / pire.prevuADate - 1) * 100)} %).
                    {" "}Vendus {pct(t.pctVendu)}, {mmad(t.encaisse)} encaissés.</p>
                  {aRelancer.length > 0 && <p className="mt-2">À relancer : {aRelancer.map((c) => <Link key={c.id} href={`/ventes/${c.id}`} className="underline text-bordeaux">{c.nom}</Link>).reduce<React.ReactNode[]>((acc, el, i) => (i ? [...acc, ", ", el] : [el]), [])}.</p>}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href={`/projets/${p.id}`} className="btn-secondaire">Voir le projet</Link>
                <Link href={`/couts?projet=${p.id}`} className="btn-secondaire">Voir les coûts</Link>
              </div>
              <p className="text-xs text-gris mt-3">Sources : 1 rapport journalier du 26/11, pointage du 26/11, planning v4, {p.postes.length} postes budgétaires.</p>
            </section>
          );
        })}
      </div>
    </>
  );
}

function totauxRestants(id: string) {
  const p = projets.find((x) => x.id === id)!;
  const t = totaux(p);
  return t.nbLots - t.nbVendus;
}
