import { ImportSheets } from "@/components/ImportSheets";
import { EnTete } from "@/components/ui";

export default function Import() {
  return (
    <>
      <EnTete titre="Import Google Sheets" sousTitre="Reprenez vos fichiers actuels (ouvriers, achats, stock, dépenses) sans rien ressaisir. Exportez la feuille en CSV depuis Google Sheets, puis déposez-la ici." />
      <ImportSheets />
    </>
  );
}
