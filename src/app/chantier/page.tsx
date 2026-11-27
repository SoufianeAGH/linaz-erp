import { AppChantier } from "@/components/AppChantier";

export default function Chantier() {
  return (
    <>
      <p className="text-sm text-gris mb-4 max-w-xl">Aperçu de l'application du chef de chantier, telle qu'elle s'affiche sur son téléphone. Elle fonctionne sans réseau et se synchronise dès que la connexion revient.</p>
      <AppChantier />
    </>
  );
}
