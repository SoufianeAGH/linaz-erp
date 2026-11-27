import Link from "next/link";
import { notFound } from "next/navigation";
import { projet, projets, totaux, lots, clients, mmad, pct } from "@/lib/data";
import { Barre, EnTete, Kpi, Pastille } from "@/components/ui";
import { GrilleLots } from "@/components/GrilleLots";

export function generateStaticParams() {
  return projets.map((p) => ({ id: p.id }));
}

export default async function PageProjet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = projet(id);
  if (!p) notFound();
  const t = totaux(p);
  const lp = lots.filter((l) => l.projetId === p.id);
  const cl = clients.filter((c) => c.projetId === p.id).map((c) => ({ id: c.id, nom: c.nom, lotId: c.lotId }));

  return (
    <>
      <div className="text-sm mb-2"><Link href="/projets" className="text-bordeaux underline">Projets</Link> / {p.nom}</div>
      <EnTete titre={p.nom} sousTitre={`${p.quartier} · ${p.usage} · ${p.statut} · livraison prévue ${p.livraisonPrevue}`}>
        <Pastille t={t.trajectoire} />
      </EnTete>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Kpi label="Avancement" valeur={`${p.avancement} %`} detail={`prévu ${p.avancementPrevu} %`} />
        <Kpi label="Lots vendus" valeur={`${t.nbVendus} / ${t.nbLots}`} detail={pct(t.pctVendu)} />
        <Kpi label="Chiffre d'affaires vendu" valeur={mmad(t.caVendu)} detail={`sur ${mmad(t.ca)} au total`} />
        <Kpi label="Dépensé / budget" valeur={mmad(t.reel)} detail={`budget ${mmad(t.budget)}`} />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Grille des lots</h2>
        <GrilleLots lots={lp} batiments={p.batiments} clients={cl} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Planning et jalons</h2>
        <div className="carte divide-y divide-sable-300">
          {p.jalons.map((j) => (
            <div key={j.nom} className="grid grid-cols-1 sm:grid-cols-[1fr_200px_120px] gap-2 sm:gap-6 px-5 py-3 items-center">
              <div className="font-medium">{j.nom}</div>
              <Barre valeur={j.avancement} couleur={j.avancement === 100 ? "bg-ok" : "bg-bordeaux"} />
              <div className="text-sm text-gris num">Prévu {j.prevu}{j.reel && j.reel !== j.prevu && <span className="text-derive"> · fait {j.reel}</span>}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
