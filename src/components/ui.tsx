import type { Trajectoire, StatutLot } from "@/lib/data";

export function Pastille({ t }: { t: Trajectoire }) {
  const map = {
    ok: { c: "bg-ok/10 text-ok border-ok/30", l: "Sur la bonne voie" },
    attention: { c: "bg-attention/10 text-attention border-attention/30", l: "À surveiller" },
    derive: { c: "bg-derive/10 text-derive border-derive/30", l: "En dérive" },
  }[t];
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${map.c}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{map.l}</span>;
}

export const couleurStatut: Record<StatutLot, string> = {
  disponible: "bg-white border-sable-600 text-encre",
  option: "bg-attention/15 border-attention text-encre",
  reserve: "bg-sable-300 border-sable-600 text-bordeaux-900",
  vendu: "bg-bordeaux border-bordeaux text-white",
};
export const libelleStatut: Record<StatutLot, string> = {
  disponible: "Disponible",
  option: "En option",
  reserve: "Réservé",
  vendu: "Vendu",
};

export function Barre({ valeur, repere, couleur = "bg-bordeaux" }: { valeur: number; repere?: number; couleur?: string }) {
  return (
    <div className="relative h-2 w-full rounded-full bg-sable-100">
      <div className={`h-2 rounded-full ${couleur}`} style={{ width: `${Math.min(100, valeur)}%` }} />
      {repere !== undefined && (
        <div className="absolute -top-1 h-4 w-0.5 bg-encre" style={{ left: `${Math.min(100, repere)}%` }} title={`Prévu : ${repere} %`} />
      )}
    </div>
  );
}

export function EnTete({ titre, sousTitre, children }: { titre: string; sousTitre?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div className="min-w-0">
        <h1 className="text-3xl sm:text-4xl font-semibold">{titre}</h1>
        {sousTitre && <p className="mt-1 text-gris max-w-2xl">{sousTitre}</p>}
      </div>
      {children}
    </div>
  );
}

export function Kpi({ label, valeur, detail }: { label: string; valeur: string; detail?: string }) {
  return (
    <div className="carte p-4 min-w-0">
      <div className="etiquette">{label}</div>
      <div className="mt-1 text-2xl font-semibold num text-bordeaux-900">{valeur}</div>
      {detail && <div className="text-xs text-gris mt-0.5">{detail}</div>}
    </div>
  );
}
