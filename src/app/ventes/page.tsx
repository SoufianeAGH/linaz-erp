import Link from "next/link";
import { clients, etapes, projet, lots, mad } from "@/lib/data";
import { EnTete } from "@/components/ui";

export default function Ventes() {
  return (
    <>
      <EnTete titre="Ventes et clients" sousTitre="Du premier contact à l'acte définitif, tous programmes confondus.">
        <Link href="/ventes/reservation" className="btn-primaire">Nouveau prospect</Link>
      </EnTete>
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-cols-6 gap-3 min-w-[1080px]">
          {etapes.map((e) => {
            const cs = clients.filter((c) => c.etape === e);
            return (
              <div key={e} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between px-1">
                  <span className="etiquette">{e}</span>
                  <span className="text-xs text-gris num">{cs.length}</span>
                </div>
                {cs.map((c) => {
                  const l = c.lotId ? lots.find((x) => x.id === c.lotId) : undefined;
                  return (
                    <Link key={c.id} href={`/ventes/${c.id}`} className="carte p-3 text-sm hover:border-bordeaux">
                      <div className="font-semibold">{c.nom}</div>
                      <div className="text-xs text-gris">{projet(c.projetId)?.nom}{l ? ` · lot ${l.numero}` : ""}</div>
                      <div className="text-xs mt-1 num">{l ? mad(l.prix) : `Budget ${mad(c.budget)}`}</div>
                      <div className="text-xs mt-2 text-bordeaux">{c.prochaineAction}</div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
