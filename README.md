# AIA — Build Feature : Dashboard Google Reviews

Projet de départ de la leçon *Build Feature* du module Claude Mastery. 

## Pour démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) et upload le fichier `data/takeout-sample.zip` pour valider que tout tourne.

## Mission (45 min max)

Ajoute **4 nouveaux KPIs** dans la même veine que la note moyenne :

1. Évolution du nombre d’avis ce mois-ci vs mois précédent (delta + flèche colorée)
2. Graphe de progression mensuelle sur 12 mois (note moyenne par mois)
3. Répartition par étoiles (barres horizontales 5★ / 4★ / 3★ / 2★ / 1★)
4. Cartes meilleur avis + pire avis

## Critères de succès

- [ ] La page affiche **5 KPIs** (1 livré + 4 ajoutés)
- [ ] Le projet de départ n’est pas cassé (la note moyenne fonctionne toujours)
- [ ] Au moins 2 commits visibles dans `git log`
- [ ] Le rendu reste lisible sur mobile 375px
- [ ] Aucun appel API LLM dans le code (agrégation JS pure)

## Bloqué ?

La solution est dans la vidéo *Build Feature* du module.
