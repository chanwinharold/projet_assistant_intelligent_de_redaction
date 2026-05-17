# Déploiement Intelligent Redac

Guide complet pour héberger l’application en production avec :

| Composant | Hébergeur | Rôle |
|-----------|-----------|------|
| **Frontend** (React + Vite) | **Vercel** | Interface utilisateur |
| **Base de données** (PostgreSQL) | **Neon** | Données utilisateurs, articles, résumés |
| **API** (Node / Express) | **Render** | Auth, CRUD, proxy IA, emails |
| **Service IA** (FastAPI) | **Render** | Appels Hugging Face (titres, autocomplétion, etc.) |

```
Utilisateur
    │
    ▼
┌─────────────────┐
│  Vercel (SPA)   │  VITE_API_URL
└────────┬────────┘
         │ HTTPS + cookies (auth)
         ▼
┌─────────────────┐     ┌──────────────────┐
│  Render (API)   │────▶│  Render (ai-app) │
└────────┬────────┘     └──────────────────┘
         │
         ▼
┌─────────────────┐
│  Neon (Postgres)│
└─────────────────┘
```

---

## Prérequis

- Comptes gratuits ou payants : [Vercel](https://vercel.com), [Neon](https://neon.tech), [Render](https://render.com)
- Dépôt Git (GitHub / GitLab) avec le code poussé
- Token **Hugging Face** (Read) : https://huggingface.co/settings/tokens
- Compte **Gmail** + mot de passe d’application pour les emails (vérif, reset mot de passe)

---

## 1. Base de données — Neon

### 1.1 Créer le projet

1. Neon → **New Project** → région proche de vos utilisateurs (ex. `eu-central-1`).
2. Copier la **connection string** (mode **pooled** recommandé pour l’API) :
   ```
   postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

### 1.2 Schéma SQL

Dans le **SQL Editor** Neon, exécuter dans l’ordre le contenu de :

- `api/queries/user.query.sql`
- `api/queries/article.query.sql`
- `api/queries/resume.query.sql`
- `api/migrations/002_user_prenom_nom.sql` (colonnes `user_prenom`, `user_nom`)

Vérifier que `ir_email_token` contient bien `token_type` (sinon exécuter les migrations déjà utilisées en local).

### 1.3 Variable côté API

Sur Render (étape 2), définir :

```env
DATABASE_URL=postgresql://...?sslmode=require
```

L’API utilise `DATABASE_URL` en priorité (SSL activé pour Neon). Les variables `DB_HOST`, `DB_NAME`, etc. restent un repli pour le dev local.

---

## 2. API Node — Render (Web Service)

### 2.1 Créer le service

1. Render → **New** → **Web Service**
2. Connecter le dépôt Git
3. Paramètres :

| Champ | Valeur |
|-------|--------|
| **Name** | `intelligent-redac-api` |
| **Root Directory** | `api` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm run start:prod` ou `node index.js` |
| **Instance type** | Free (ou Starter si cold start trop lent) |

> Ne pas utiliser `nodemon` en production.

### 2.2 Variables d’environnement (API)

| Variable | Exemple / description |
|----------|------------------------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render injecte souvent `PORT` automatiquement) |
| `DATABASE_URL` | Connection string Neon (pooled) |
| `JWT_SECRET` | Chaîne longue aléatoire (32+ caractères) |
| `FRONTEND_URL` | `https://votre-app.vercel.app` (sans slash final) |
| `AI_SERVICE_URL` | URL du service IA Render, ex. `https://intelligent-redac-ai.onrender.com` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | votre@gmail.com |
| `SMTP_PASS` | mot de passe d’application Google (16 car.) |
| `SMTP_FROM` | `Intelligent Redac <votre@gmail.com>` |

### 2.3 CORS et cookies (domaines différents)

Le front est sur `*.vercel.app`, l’API sur `*.onrender.com` : ce sont des **sites différents**.

- `FRONTEND_URL` doit correspondre **exactement** à l’URL Vercel (y compris `https://`).
- En production, le cookie d’auth utilise `SameSite=None` et `Secure=true` (déjà géré si `NODE_ENV=production`).

### 2.4 Photos de profil (important)

En local, les images sont enregistrées dans `client/public/user_images/`. Sur Render, le disque est **éphémère** : les uploads peuvent disparaître au redémarrage.

**Options :**

1. **Court terme** : accepter la limite ; avatar par défaut après redeploy.
2. **Recommandé** : stockage objet (Cloudinary, S3, Supabase Storage) + URL publique dans `user_image`.
3. **Intermédiaire** : dossier `api/uploads` servi par Express + disque persistant Render (payant).

Voir `docs/logs/problems.md` (section uploads).

### 2.5 URL API

Après déploiement : `https://intelligent-redac-api.onrender.com`  
Tester : `GET /` ne existe pas → utiliser une route auth ou logs Render.

---

## 3. Service IA — Render (Web Service)

### 3.1 Créer le second service

| Champ | Valeur |
|-------|--------|
| **Name** | `intelligent-redac-ai` |
| **Root Directory** | `ai-app` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` ou `pip install fastapi uvicorn python-dotenv requests` |
| **Start Command** | `uvicorn app:app --host 0.0.0.0 --port $PORT` |

Créer un fichier `ai-app/requirements.txt` si absent :

```txt
fastapi>=0.100.0
uvicorn[standard]>=0.23.0
python-dotenv>=1.0.0
requests>=2.31.0
```

### 3.2 Variables d’environnement (IA)

| Variable | Description |
|----------|-------------|
| `HF_TOKEN` | Token Hugging Face `hf_...` |
| `ALLOWED_ORIGINS` | `https://votre-app.vercel.app,https://intelligent-redac-api.onrender.com` |

### 3.3 Fichier `.env` sur Render

- Coller `HF_TOKEN` dans l’interface Render (pas de fichier `.env` commité).
- Enregistrer en **UTF-8 sans BOM** (voir `docs/logs/problems.md`).

### 3.4 Cold start

Le plan gratuit Render met les services en veille : la **première requête IA** peut prendre 30–60 s. Prévoir un message utilisateur ou un plan payant.

---

## 4. Frontend — Vercel

### 4.1 Importer le projet

1. Vercel → **Add New Project** → importer le dépôt Git
2. Paramètres :

| Champ | Valeur |
|-------|--------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 4.2 Variables d’environnement (Vercel)

| Variable | Valeur |
|----------|--------|
| `VITE_API_URL` | `https://intelligent-redac-api.onrender.com` |

Les variables `VITE_*` sont injectées **au build** : redéployer après chaque changement.

### 4.3 Routage SPA

Le fichier `client/vercel.json` redirige toutes les routes vers `index.html` (React Router).

### 4.4 Images statiques par défaut

Les fichiers dans `client/public/` (logo, `user_default_image.png`) sont bien déployés sur Vercel.  
Les **nouvelles** photos uploadées via l’API ne sont **pas** sur Vercel tant qu’elles ne sont pas servies par l’API ou un CDN.

### 4.5 Domaine personnalisé (optionnel)

Vercel → **Domains** → ajouter `www.votredomaine.com`.  
Mettre à jour `FRONTEND_URL` et `ALLOWED_ORIGINS` avec cette URL.

---

## 5. Ordre de déploiement recommandé

1. **Neon** — créer la BDD + exécuter le SQL  
2. **Render ai-app** — déployer + `HF_TOKEN` + noter l’URL  
3. **Render API** — `DATABASE_URL`, `AI_SERVICE_URL`, `FRONTEND_URL` (URL Vercel provisoire ou finale)  
4. **Vercel** — `VITE_API_URL` = URL API  
5. Mettre à jour `FRONTEND_URL` sur l’API avec l’URL Vercel définitive  
6. Mettre à jour `ALLOWED_ORIGINS` sur l’IA  
7. Tester : inscription → email → login → `/write` → sauvegarde → `/save` → fonctionnalités IA  

---

## 6. Checklist de tests production

- [ ] Inscription (prénom, nom, email, mot de passe)
- [ ] Email de vérification reçu (ou SMTP désactivé → connexion directe)
- [ ] Connexion / déconnexion
- [ ] Création et liste d’articles (`/save`)
- [ ] Résumé IA (`/resume`)
- [ ] Suggestion de titre / autocomplétion (`/write`)
- [ ] Mot de passe oublié
- [ ] Profil (prénom, nom)
- [ ] Pas d’erreur CORS dans la console navigateur
- [ ] Cookie `authToken` présent (Application → Cookies) sur le domaine API après login

---

## 7. Dépannage rapide

| Symptôme | Piste |
|----------|--------|
| Liste `/save` vide + erreur HTML | API : voir `docs/logs/solutions.md` (req.body GET) |
| `502` sur `/ai/*` | Service IA down, `HF_TOKEN` invalide, ou cold start Render |
| `[object Object]` dans un toast | Ancienne version client ; messages corrigés via `errorMessage.js` |
| Connexion OK mais déconnecté au refresh | Cookie `SameSite` / `FRONTEND_URL` incorrect |
| IA « HF_TOKEN manquant » | BOM dans `.env` ou variable non définie sur Render |
| CORS blocked | `FRONTEND_URL` ≠ URL exacte du navigateur |

Journal détaillé : `docs/logs/problems.md`, `docs/logs/solutions.md`, `docs/logs/cours.md`.

---

## 8. Coûts indicatifs (2025)

| Service | Free tier | Limite typique |
|---------|-----------|----------------|
| Vercel | Oui | Bande passante / builds |
| Neon | Oui | Stockage + compute limités |
| Render | Oui | 2 services web, spin-down après inactivité |
| Hugging Face | Quota API | Selon le modèle / compte |

---

## 9. Fichiers utiles du dépôt

```
intelligent_redac/
├── client/          → Vercel
│   ├── vercel.json
│   └── .env.example
├── api/             → Render (API)
│   ├── .env.example
│   └── migrations/
├── ai-app/          → Render (IA)
│   └── .env.example
└── docs/
    ├── deploy.md          (ce fichier)
    └── logs/
        ├── problems.md
        ├── cours.md
        └── solutions.md
```

---

## 10. Commandes locales (rappel)

```bash
# Terminal 1 — API
cd api && npm start

# Terminal 2 — Client
cd client && npm run dev

# Terminal 3 — IA
cd ai-app && python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Variables locales : `api/.env`, `client/.env`, `ai-app/.env` (ne jamais commiter les secrets).
