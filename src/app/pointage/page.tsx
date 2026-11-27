import { PointageRH } from "@/components/PointageRH";
import { EnTete } from "@/components/ui";

export default function Pointage() {
  return (
    <>
      <EnTete titre="Pointage RH" sousTitre="Jours travaillés et jours d'absence de chaque ouvrier, saisis chaque matin par le chef de chantier. Novembre 2026, jusqu'au 27." />
      <PointageRH />
    </>
  );
}
