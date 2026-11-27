// Données d'exemple du prototype.
// Les noms de projets, quartiers, surfaces et pourcentages vendus viennent du site linazliving.com.
// Les nombres de lots, prix, budgets, ouvriers et clients sont INVENTÉS pour la démonstration.

export type StatutLot = "disponible" | "option" | "reserve" | "vendu";
export type Trajectoire = "ok" | "attention" | "derive";

export interface Lot {
  id: string;
  projetId: string;
  batiment: string;
  etage: number;
  numero: string;
  type: string;
  usage: "Appartement" | "Bureau";
  surface: number;
  prix: number;
  statut: StatutLot;
  clientId?: string;
}

export interface PosteBudget {
  poste: string;
  budget: number;
  reel: number;
  prevuADate: number;
}

export interface Jalon {
  nom: string;
  prevu: string;
  reel?: string;
  avancement: number;
}

export interface Projet {
  id: string;
  nom: string;
  quartier: string;
  usage: string;
  statut: string;
  avancement: number;
  avancementPrevu: number;
  livraisonPrevue: string;
  batiments: { nom: string; etages: number; lotsParEtage: number }[];
  prixM2: number;
  objectifVendu: number;
  postes: PosteBudget[];
  investissement: { apports: number; credit: number };
  jalons: Jalon[];
  chefChantier: string;
}

// Générateur pseudo-aléatoire déterministe pour que les données soient stables.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const projets: Projet[] = [
  {
    id: "oasis-2",
    nom: "Oasis 2",
    quartier: "L'Oasis, Casablanca",
    usage: "Résidentiel",
    statut: "En commercialisation",
    avancement: 38,
    avancementPrevu: 44,
    livraisonPrevue: "T4 2028",
    batiments: [
      { nom: "A", etages: 6, lotsParEtage: 4 },
      { nom: "B", etages: 6, lotsParEtage: 4 },
    ],
    prixM2: 19500,
    objectifVendu: 0.25,
    chefChantier: "Hicham Bennani",
    investissement: { apports: 38_000_000, credit: 30_000_000 },
    postes: [
      { poste: "Foncier", budget: 28_000_000, reel: 28_000_000, prevuADate: 28_000_000 },
      { poste: "Études et honoraires", budget: 4_200_000, reel: 3_100_000, prevuADate: 3_000_000 },
      { poste: "Gros œuvre", budget: 31_000_000, reel: 15_900_000, prevuADate: 14_200_000 },
      { poste: "Second œuvre et finitions", budget: 22_500_000, reel: 1_200_000, prevuADate: 1_400_000 },
      { poste: "Main-d'œuvre directe", budget: 6_800_000, reel: 3_050_000, prevuADate: 2_700_000 },
      { poste: "Frais commerciaux", budget: 2_100_000, reel: 640_000, prevuADate: 700_000 },
      { poste: "Frais financiers", budget: 2_400_000, reel: 820_000, prevuADate: 800_000 },
    ],
    jalons: [
      { nom: "Autorisation de construire", prevu: "03/2025", reel: "03/2025", avancement: 100 },
      { nom: "Terrassement et sous-sols", prevu: "11/2025", reel: "01/2026", avancement: 100 },
      { nom: "Gros œuvre bâtiment A", prevu: "09/2026", avancement: 70 },
      { nom: "Gros œuvre bâtiment B", prevu: "12/2026", avancement: 45 },
      { nom: "Second œuvre", prevu: "02/2028", avancement: 5 },
      { nom: "Permis d'habiter", prevu: "10/2028", avancement: 0 },
    ],
  },
  {
    id: "cfc-2",
    nom: "CFC 2 Résidentiel",
    quartier: "Entrée du CFC, Casablanca",
    usage: "Résidentiel",
    statut: "Dernière opportunité",
    avancement: 72,
    avancementPrevu: 74,
    livraisonPrevue: "T3 2027",
    batiments: [{ nom: "R", etages: 9, lotsParEtage: 4 }],
    prixM2: 26000,
    objectifVendu: 0.7,
    chefChantier: "Youssef El Idrissi",
    investissement: { apports: 45_000_000, credit: 25_000_000 },
    postes: [
      { poste: "Foncier", budget: 34_000_000, reel: 34_000_000, prevuADate: 34_000_000 },
      { poste: "Études et honoraires", budget: 5_100_000, reel: 4_600_000, prevuADate: 4_700_000 },
      { poste: "Gros œuvre", budget: 33_000_000, reel: 32_400_000, prevuADate: 32_000_000 },
      { poste: "Second œuvre et finitions", budget: 27_000_000, reel: 13_900_000, prevuADate: 13_500_000 },
      { poste: "Main-d'œuvre directe", budget: 7_400_000, reel: 5_300_000, prevuADate: 5_200_000 },
      { poste: "Frais commerciaux", budget: 2_600_000, reel: 1_900_000, prevuADate: 1_850_000 },
      { poste: "Frais financiers", budget: 2_900_000, reel: 2_050_000, prevuADate: 2_000_000 },
    ],
    jalons: [
      { nom: "Autorisation de construire", prevu: "01/2024", reel: "01/2024", avancement: 100 },
      { nom: "Sous-sols et fondations", prevu: "08/2024", reel: "09/2024", avancement: 100 },
      { nom: "Gros œuvre", prevu: "06/2026", reel: "06/2026", avancement: 100 },
      { nom: "Second œuvre", prevu: "03/2027", avancement: 52 },
      { nom: "VRD et espaces communs", prevu: "06/2027", avancement: 10 },
      { nom: "Permis d'habiter", prevu: "09/2027", avancement: 0 },
    ],
  },
  {
    id: "cfc-2-bureaux",
    nom: "CFC 2 Bureaux",
    quartier: "Entrée du CFC, Casablanca",
    usage: "Bureaux",
    statut: "Dernière opportunité",
    avancement: 68,
    avancementPrevu: 76,
    livraisonPrevue: "T4 2027",
    batiments: [{ nom: "B", etages: 7, lotsParEtage: 3 }],
    prixM2: 24000,
    objectifVendu: 0.7,
    chefChantier: "Youssef El Idrissi",
    investissement: { apports: 26_000_000, credit: 18_000_000 },
    postes: [
      { poste: "Foncier", budget: 21_000_000, reel: 21_000_000, prevuADate: 21_000_000 },
      { poste: "Études et honoraires", budget: 3_300_000, reel: 3_200_000, prevuADate: 2_900_000 },
      { poste: "Gros œuvre", budget: 22_000_000, reel: 23_600_000, prevuADate: 21_400_000 },
      { poste: "Second œuvre et finitions", budget: 15_500_000, reel: 7_900_000, prevuADate: 6_900_000 },
      { poste: "Main-d'œuvre directe", budget: 4_600_000, reel: 3_700_000, prevuADate: 3_300_000 },
      { poste: "Frais commerciaux", budget: 1_500_000, reel: 1_050_000, prevuADate: 1_000_000 },
      { poste: "Frais financiers", budget: 1_900_000, reel: 1_400_000, prevuADate: 1_350_000 },
    ],
    jalons: [
      { nom: "Autorisation de construire", prevu: "01/2024", reel: "01/2024", avancement: 100 },
      { nom: "Sous-sols et fondations", prevu: "08/2024", reel: "10/2024", avancement: 100 },
      { nom: "Gros œuvre", prevu: "07/2026", reel: "10/2026", avancement: 100 },
      { nom: "Façades et menuiseries Strugal", prevu: "01/2027", avancement: 35 },
      { nom: "Climatisation centralisée TRANE", prevu: "05/2027", avancement: 15 },
      { nom: "Permis d'habiter", prevu: "11/2027", avancement: 0 },
    ],
  },
];

const prenoms = ["Karim", "Salma", "Omar", "Nadia", "Mehdi", "Imane", "Rachid", "Leila", "Anas", "Kenza", "Adil", "Sara", "Hamza", "Meryem", "Tarik", "Ghita"];
const noms = ["Alaoui", "Benjelloun", "Tazi", "Chraibi", "Berrada", "Fassi", "Lahlou", "Sqalli", "Kettani", "Bennis", "Naciri", "Amrani", "Squalli", "Guessous", "Lamrani", "Ziani"];

export type EtapeClient = "Nouveau" | "Visite" | "Option" | "Réservé" | "Compromis" | "Acte signé";
export const etapes: EtapeClient[] = ["Nouveau", "Visite", "Option", "Réservé", "Compromis", "Acte signé"];

export interface Client {
  id: string;
  nom: string;
  telephone: string;
  source: string;
  budget: number;
  etape: EtapeClient;
  projetId: string;
  lotId?: string;
  commercial: string;
  derniereAction: string;
  prochaineAction: string;
}

const sources = ["Site web", "Instagram", "Bureau de vente", "Recommandation", "Salon SMAP", "Appel entrant"];
const commerciaux = ["Fatima Zahra", "Amine", "Houda"];

function typeOasis(r: number) {
  return r < 0.5 ? { type: "Type A", surface: 41 + Math.round(r * 18) } : { type: "Type B", surface: 55 + Math.round((r - 0.5) * 20) };
}
function typeCfc(i: number) {
  const t = [
    { type: "Type A", surface: 78 },
    { type: "Type B", surface: 83 },
    { type: "Type C", surface: 93 },
    { type: "Type B", surface: 83 },
  ];
  return t[i % 4];
}

function genererLots(): Lot[] {
  const lots: Lot[] = [];
  for (const p of projets) {
    const r = rng(p.id.length * 97 + p.prixM2);
    const lp: Lot[] = [];
    for (const b of p.batiments) {
      for (let e = 0; e < b.etages; e++) {
        for (let i = 0; i < b.lotsParEtage; i++) {
          const x = r();
          const t =
            p.id === "oasis-2"
              ? typeOasis(x)
              : p.id === "cfc-2"
                ? typeCfc(i)
                : { type: "Plateau", surface: [96, 128, 182][i % 3] };
          const etageCoef = 1 + e * 0.012;
          lp.push({
            id: `${p.id}-${b.nom}${e}${String(i + 1).padStart(2, "0")}`,
            projetId: p.id,
            batiment: b.nom,
            etage: e,
            numero: `${b.nom}${e}${String(i + 1).padStart(2, "0")}`,
            type: t.type,
            usage: p.usage === "Bureaux" ? "Bureau" : "Appartement",
            surface: t.surface,
            prix: Math.round((t.surface * p.prixM2 * etageCoef) / 1000) * 1000,
            statut: "disponible",
          });
        }
      }
    }
    // Répartit les statuts pour coller au pourcentage vendu affiché sur le site.
    const nbVendus = Math.round(lp.length * p.objectifVendu);
    const ordre = lp.map((l, idx) => ({ idx, k: r() })).sort((a, b) => a.k - b.k);
    ordre.forEach((o, n) => {
      if (n < nbVendus) lp[o.idx].statut = n % 5 === 0 ? "reserve" : "vendu";
      else if (n < nbVendus + 3) lp[o.idx].statut = "option";
    });
    lots.push(...lp);
  }
  return lots;
}

export const lots: Lot[] = genererLots();

function genererClients(): Client[] {
  const r = rng(42);
  const res: Client[] = [];
  const etapesCycle: EtapeClient[] = ["Nouveau", "Visite", "Visite", "Option", "Réservé", "Compromis", "Acte signé", "Nouveau", "Option", "Réservé", "Visite", "Compromis", "Acte signé", "Nouveau"];
  etapesCycle.forEach((etape, i) => {
    const p = projets[i % 3];
    const statutCible: StatutLot | null =
      etape === "Option" ? "option" : etape === "Réservé" ? "reserve" : etape === "Compromis" || etape === "Acte signé" ? "vendu" : null;
    let lotId: string | undefined;
    if (statutCible) {
      const l = lots.find((x) => x.projetId === p.id && x.statut === statutCible && !x.clientId);
      if (l) {
        l.clientId = `c${i + 1}`;
        lotId = l.id;
      }
    }
    const lot = lotId ? lots.find((l) => l.id === lotId) : undefined;
    res.push({
      id: `c${i + 1}`,
      nom: `${prenoms[i % prenoms.length]} ${noms[(i * 3) % noms.length]}`,
      telephone: `+212 6${Math.floor(10 + r() * 89)} ${Math.floor(100 + r() * 899)} ${Math.floor(100 + r() * 899)}`,
      source: sources[i % sources.length],
      budget: lot ? Math.round(lot.prix / 100000) * 100000 : Math.round((0.9 + r() * 1.6) * 10) * 100000,
      etape,
      projetId: p.id,
      lotId,
      commercial: commerciaux[i % 3],
      derniereAction: ["Appel le 25/11", "Visite le 22/11", "Email le 26/11", "Rendez-vous le 24/11"][i % 4],
      prochaineAction: ["Relancer le 30/11", "Visite du lot témoin le 02/12", "Signature compromis le 05/12", "Envoyer le plan PDF"][i % 4],
    });
  });
  return res;
}

export const clients: Client[] = genererClients();

// Échéancier VEFA d'exemple (paramétrable, à valider par le conseil juridique du client).
export const etapesEcheancier = [
  { etape: "Réservation", part: 0.1, jalon: "Signature du contrat de réservation", seuil: 0 },
  { etape: "Achèvement des fondations", part: 0.2, jalon: "Sous-sols et fondations", seuil: 20 },
  { etape: "Achèvement du gros œuvre", part: 0.3, jalon: "Gros œuvre", seuil: 60 },
  { etape: "Achèvement des travaux", part: 0.3, jalon: "Second œuvre", seuil: 95 },
  { etape: "Acte définitif", part: 0.1, jalon: "Permis d'habiter", seuil: 100 },
];

export interface Ouvrier {
  id: string;
  nom: string;
  metier: string;
  projetId: string;
  tauxJour: number;
  presences: ("P" | "A" | "C")[]; // P présent, A absent, C congé, pour chaque jour ouvré du mois
}

const metiers = [
  { m: "Maçon", t: 220 },
  { m: "Ferrailleur", t: 230 },
  { m: "Coffreur", t: 230 },
  { m: "Manœuvre", t: 150 },
  { m: "Électricien", t: 260 },
  { m: "Plombier", t: 260 },
  { m: "Carreleur", t: 250 },
  { m: "Chef d'équipe", t: 320 },
];
const prenomsOuvriers = ["Mohamed", "Abdellah", "Brahim", "Said", "Mustapha", "Lahcen", "Hassan", "Driss", "Aziz", "Khalid", "Jamal", "Noureddine", "Ahmed", "Mbarek", "Youssef", "Ali", "Hamid", "Abdelkader"];
const nomsOuvriers = ["Ait Lahcen", "Ouali", "Boukhari", "El Mansouri", "Chakir", "Haddaoui", "Ouazzani", "Rami", "Belkadi", "Moussaoui", "Zerouali", "Hilali"];

// Jours ouvrés (lundi à samedi) de novembre 2026 jusqu'au 27.
export const joursMois: string[] = (() => {
  const j: string[] = [];
  for (let d = 1; d <= 27; d++) {
    const date = new Date(Date.UTC(2026, 10, d));
    if (date.getUTCDay() !== 0) j.push(`${String(d).padStart(2, "0")}/11`);
  }
  return j;
})();

function genererOuvriers(): Ouvrier[] {
  const r = rng(7);
  const res: Ouvrier[] = [];
  const parProjet: Record<string, number> = { "oasis-2": 18, "cfc-2": 14, "cfc-2-bureaux": 10 };
  let n = 0;
  for (const p of projets) {
    for (let i = 0; i < parProjet[p.id]; i++) {
      const met = metiers[i % metiers.length];
      const assiduite = i % 7 === 3 ? 0.72 : 0.93 + r() * 0.06;
      res.push({
        id: `o${++n}`,
        nom: `${prenomsOuvriers[n % prenomsOuvriers.length]} ${nomsOuvriers[(n * 5) % nomsOuvriers.length]}`,
        metier: met.m,
        projetId: p.id,
        tauxJour: met.t,
        presences: joursMois.map((_, k) => (i % 9 === 4 && k >= 10 && k < 13 ? "C" : r() < assiduite ? "P" : "A")),
      });
    }
  }
  return res;
}

export const ouvriers: Ouvrier[] = genererOuvriers();

// ---------- Calculs ----------

export function projet(id: string) {
  return projets.find((p) => p.id === id);
}

export function totaux(p: Projet) {
  const budget = p.postes.reduce((s, x) => s + x.budget, 0);
  const reel = p.postes.reduce((s, x) => s + x.reel, 0);
  const prevuADate = p.postes.reduce((s, x) => s + x.prevuADate, 0);
  const lp = lots.filter((l) => l.projetId === p.id);
  const vendus = lp.filter((l) => l.statut === "vendu" || l.statut === "reserve");
  const ca = lp.reduce((s, l) => s + l.prix, 0);
  const caVendu = vendus.reduce((s, l) => s + l.prix, 0);
  // Encaissé : part de l'échéancier atteinte selon les jalons franchis.
  const partAtteinte = p.avancement >= 70 ? 0.6 : p.avancement >= 30 ? 0.3 : 0.1;
  const encaisse = Math.round(caVendu * partAtteinte);
  const investi = p.investissement.apports + p.investissement.credit;
  const ecart = reel / prevuADate - 1;
  return {
    budget,
    reel,
    prevuADate,
    ecart,
    nbLots: lp.length,
    nbVendus: vendus.length,
    pctVendu: vendus.length / lp.length,
    ca,
    caVendu,
    encaisse,
    investi,
    margePrev: ca - budget,
    trajectoire: trajectoire(ecart, p.avancement - p.avancementPrevu),
  };
}

export function trajectoire(ecartCout: number, ecartAvancement: number): Trajectoire {
  if (ecartCout > 0.06 || ecartAvancement <= -7) return "derive";
  if (ecartCout > 0.02 || ecartAvancement <= -3) return "attention";
  return "ok";
}

export function compteurs(o: Ouvrier) {
  const travailles = o.presences.filter((x) => x === "P").length;
  const absences = o.presences.filter((x) => x === "A").length;
  const conges = o.presences.filter((x) => x === "C").length;
  return { travailles, absences, conges, cout: travailles * o.tauxJour };
}

export const mad = (n: number) =>
  new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n).replace(/ | /g, " ") + " MAD";

export const mmad = (n: number) => (n / 1_000_000).toFixed(1).replace(".", ",") + " M MAD";

export const pct = (n: number) => Math.round(n * 100) + " %";
