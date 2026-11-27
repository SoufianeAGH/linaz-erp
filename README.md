# Linaz ERP

ERP pour promoteur immobilier (Linaz Living, Casablanca) : projets et chantiers, lots, ventes et CRM, rapport journalier, pointage des ouvriers, suivi des coûts et de l'investissement, synthèse IA.

Cahier des charges : voir le document partagé par l'agence.

## Prototype cliquable (V0)

Application Next.js avec des **données d'exemple** et sans serveur de données. Le code servira de base à la vraie application.

- Les noms de programmes, quartiers, surfaces et pourcentages vendus viennent du site linazliving.com.
- Les nombres de lots, prix, budgets, ouvriers et clients sont **inventés** pour la démonstration (`src/lib/data.ts`).
- Couleurs bordeaux et sable provisoires, à remplacer par la charte officielle (`tailwind.config.ts`).

### Écrans

| Écran | Adresse |
| --- | --- |
| Tableau de bord direction (multi-projets, trajectoire) | `/` |
| Synthèse IA du matin | `/synthese` |
| Projets, planning et grille des lots | `/projets`, `/projets/oasis-2` |
| Ventes : pipeline, fiche client, échéancier VEFA, réservation | `/ventes`, `/ventes/c5`, `/ventes/reservation` |
| Coûts et investissement (budget / prévu à date / réel) | `/couts` |
| Pointage RH (jours travaillés et absences, export CSV) | `/pointage` |
| Application chef de chantier (pointage et rapport du jour) | `/chantier` |
| Import Google Sheets (CSV, correspondance des colonnes) | `/import` |

### Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

Pour partager le prototype avec le client, le plus simple est de connecter ce dépôt à Vercel (gratuit) : chaque pull request obtient alors un lien de prévisualisation.
