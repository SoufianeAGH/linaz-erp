import { Suspense } from "react";
import { FormReservation } from "@/components/FormReservation";
import { EnTete } from "@/components/ui";

export default function Reservation() {
  return (
    <>
      <EnTete titre="Option ou réservation" sousTitre="Enregistrez le client, choisissez le lot et fixez la durée de l'option." />
      <Suspense fallback={null}><FormReservation /></Suspense>
    </>
  );
}
