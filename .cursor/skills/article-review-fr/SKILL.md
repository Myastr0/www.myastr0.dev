---
name: article-review-fr
description: Évalue la qualité éditoriale et l’exactitude (fact-check) d’articles de blog en français. À utiliser quand l’utilisateur demande une relecture, une évaluation de qualité, un audit d’exactitude, un fact-check, ou fournit un brouillon/markdown d’article.
---

# Article review (FR)

## Objectif

Produire une **relecture actionnable** d’un article (souvent en Markdown) avec :
- une décision **PASS / NEEDS WORK**
- les corrections prioritaires
- un **fact-check** avec sources
- une proposition de réécriture ciblée (sections critiques)

## Entrées attendues

- Article complet (texte ou fichier) + éventuellement : audience, objectif (SEO, conversion, newsletter), ton (didactique, opiniâtre), contraintes (longueur, CTA, sources imposées).

Si des infos manquent, **déduire** depuis le texte (ne pas bloquer).

## Procédure (ordre recommandé)

### 1) Compréhension rapide
- Identifier : sujet, promesse, public, angle, structure, CTA.
- Extraire 5–10 “claims” (affirmations vérifiables) et 5–10 points “qualité” (clarté, cohérence, etc.).

### 2) Évaluer la qualité éditoriale (sans réécrire tout)
Vérifier, et noter les problèmes concrets (avec extraits) :
- **Clarté**: phrases longues, jargon non défini, ambiguïtés.
- **Structure**: intro → plan → progression → conclusion, titres informatifs, transitions.
- **Exactitude interne**: contradictions, définitions incohérentes, chiffres qui ne s’additionnent pas.
- **Lisibilité**: scannabilité, listes, exemples, “so what”, charge cognitive.
- **Ton & crédibilité**: excès de certitude, promesses non étayées, disclaimers nécessaires.
- **SEO (léger)**: intention de recherche, H2/H3, mots-clés naturels, méta/slug suggérés si pertinent.
- **Accessibilité**: acronymes, unités, liens descriptifs, tableaux lisibles.

### 3) Fact-check (live)
Pour chaque “claim” important :
- Rechercher 1–3 sources fiables (docs officielles, publications reconnues, standards, pages de référence).
- Conclure par **Vrai / Plutôt vrai / Incertain / Plutôt faux / Faux**.
- Si incertain : proposer une reformulation prudente + ce qu’il faut vérifier.

**Règles de sources**
- Préférer : documentation officielle, organismes publics, standards, articles techniques de référence.
- Éviter : posts non sourcés, contenus marketing, agrégateurs.
- Citer la source avec : titre court + éditeur + date si dispo.

### 4) Proposer des corrections
Prioriser :
- **P0**: erreurs factuelles / sécurité / claims trompeurs / contradictions.
- **P1**: structure et clarté (intro, sections clés).
- **P2**: style, SEO, polish.

Donner des corrections sous forme :
- modification précise (phrase/section)
- proposition de texte (courte) quand utile
- justification (1 ligne)

## Format de sortie (à respecter)

```markdown
## Verdict
PASS / NEEDS WORK

## Résumé (5–8 lignes)
- Sujet, public cible, promesse
- Forces principales
- Risques majeurs (si NEEDS WORK)

## Problèmes prioritaires (P0 → P2)
### P0 (bloquants)
- [extrait] → problème → correction proposée

### P1 (importants)
- ...

### P2 (améliorations)
- ...

## Fact-check (claims)
| Claim | Évaluation | Preuves / sources | Correction / reformulation |
|---|---|---|---|
| ... | Vrai/Incertain/... | 1–3 sources | ... |

## Réécriture ciblée (option)
### Intro (proposée)
... (max 120–180 mots)

### Une section critique (proposée)
... (uniquement si nécessaire)

## Suggestions SEO (option)
- Titre: ...
- Slug: ...
- Meta description (140–160): ...
- 3–7 mots-clés: ...
```

## Barème de décision (PASS vs NEEDS WORK)

- **NEEDS WORK** si au moins un :
  - erreur factuelle importante, ou claim non sourcé mais présenté comme certain
  - conseil dangereux (sécurité, finances, santé) sans disclaimers / prudence
  - structure cassée (promesse non tenue, conclusion absente, sections incohérentes)
- **PASS** si :
  - pas d’erreur majeure détectée
  - fact-check: claims clés sourcés ou reformulés prudemment
  - corrections restantes ≤ P2, ou P1 mineurs

## Notes

- Ne pas “tout réécrire” par défaut : corriger ce qui augmente le plus la qualité perçue.
- Toujours inclure des **extraits** (ou références précises) pour que l’utilisateur puisse appliquer les changements rapidement.
