# Mettre VERDICT sur GitHub et déployer sur Vercel

## Étape 1 : Créer un NOUVEAU dépôt sur GitHub

1. Allez sur **https://github.com** et connectez-vous.
2. Cliquez sur le **+** en haut à droite → **New repository**.
3. **Repository name** : par exemple `verdict` ou `verdict-saas` (choisissez un nom qui n’est pas déjà pris).
4. **Public**.
5. **Ne cochez pas** "Add a README" ni ".gitignore" (le projet en a déjà).
6. Cliquez sur **Create repository**.
7. Sur la page du nouveau dépôt, notez l’URL, par exemple :  
   `https://github.com/VOTRE-USERNAME/verdict.git`

---

## Étape 2 : Mettre votre dossier Verdict dans ce dépôt (PowerShell)

Ouvrez **PowerShell** et exécutez :

```powershell
cd C:\Users\Abyssin\Documents\Verdict

# Initialiser Git (si pas déjà fait)
git init

# (Optionnel) Renommer la branche en "main" (recommandé pour Vercel)
git branch -M main

# Tout ajouter (sauf .env.local grâce au .gitignore)
git add .

# Premier commit
git commit -m "Initial commit - VERDICT SaaS"

# Remplacer par VOTRE URL GitHub (celle de l’étape 1)
git remote add origin https://github.com/VOTRE-USERNAME/verdict.git

# Envoyer sur GitHub (utilisez "main" si vous avez fait branch -M main, sinon "master")
git push -u origin main
```

Remplacez `VOTRE-USERNAME/verdict` par votre vrai nom d’utilisateur et nom du dépôt.

**Si vous avez déjà une branche "master"** : vous pouvez soit faire `git branch -M main` puis `git push -u origin main`, soit garder "master" et dans Vercel (Project Settings → Git) mettre **Production Branch** = `master`.

Si GitHub demande un mot de passe : utilisez un **Personal Access Token** (Settings → Developer settings → Personal access tokens) à la place du mot de passe.

---

## Étape 3 : Déployer sur Vercel

1. Allez sur **https://vercel.com** et connectez-vous (avec GitHub si possible).
2. **Add New** → **Project**.
3. **Import** le dépôt **verdict** (il apparaît dans la liste des repos GitHub).
4. Si on vous propose un nom de projet déjà utilisé :
   - Changez le **Project Name** (ex. `verdict-abyssin` ou `mon-verdict`) pour qu’il soit unique.
5. **Framework Preset** : Next.js (détecté automatiquement).
6. **Root Directory** : laissez vide (`.`).
7. **Branch** : laissez **main** (c’est la branche qu’on a poussée).
8. **Environment Variables** : ajoutez les variables (comme dans `.env.example`) :
   - `NEXT_PUBLIC_SITE_URL` = `https://VOTRE-NOM-DE-PROJET.vercel.app`
   - Puis Supabase, OpenAI, Stripe, etc.
9. Cliquez sur **Deploy**.

---

## Problèmes courants

### "Already used" / "Name already taken"
- Le **nom du projet Vercel** ou le **nom du dépôt GitHub** est déjà pris.
- **Solution** : utilisez un nom unique, par exemple `verdict-abyssin`, `verdict-2025`, etc.

### "Cannot find branch" / "Branch not found"
- Vercel cherche une branche qui n’existe pas (ex. il cherche `main` mais votre branche s’appelle `master`, ou l’inverse).
- **Solution** :
  1. Sur GitHub, onglet **Code** : regardez le nom de la branche en haut (main ou master).
  2. Dans Vercel : **Project Settings** → **Git** → **Production Branch** : mettez **exactement** ce nom (`main` ou `master`).
  3. Si votre dépôt est en `master` et que vous voulez utiliser `main` : dans le dossier Verdict faites `git branch -M main` puis `git push -u origin main`.

### Après avoir changé le code
Pour redéployer :
1. Dans le dossier Verdict :
   ```powershell
   git add .
   git commit -m "Description des changements"
   git push origin main
   ```
2. Vercel redéploie automatiquement quand vous poussez sur `main`.

---

## Récap

| Où | Quoi faire |
|----|-------------|
| **GitHub** | Créer un **nouveau** dépôt (nom unique), ne pas ajouter README/.gitignore |
| **PowerShell** | `git init` → `git add .` → `git commit` → `git remote add origin URL` → `git push -u origin main` |
| **Vercel** | Import du dépôt, nom de projet **unique**, branche **main**, ajouter les variables d’environnement |
