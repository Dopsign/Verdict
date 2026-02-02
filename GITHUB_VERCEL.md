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

### La dernière version du code n’apparaît pas sur Vercel

Si Vercel affiche toujours l’ancienne version (ex. thème sombre) alors que vous avez modifié le code en local :

**Cause :** Les changements n’ont pas été **commités et poussés** sur GitHub. Vercel déploie uniquement ce qui est sur GitHub (branche `main`).

**À faire :** Dans le dossier Verdict, exécutez :

```powershell
cd C:\Users\Abyssin\Documents\Verdict
git add .
git commit -m "Redesign: thème clair, 3 plans CHF, contact, legal, Stripe Premium"
git push origin main
```

Attendez 1–2 minutes que Vercel termine le déploiement, puis rafraîchissez le site avec **Ctrl+Shift+R**.

### Le code est poussé sur GitHub mais le site affiche encore l’ancienne version

Si vous avez bien fait `git push origin main` et que le commit « Redesign... » est sur GitHub :

1. **Vercel → Deployments**  
   - Regardez le **dernier déploiement** en haut : le message de commit doit être **« Redesign: thème clair... »** (pas « Initial commit »).  
   - Si c’est encore « Initial commit » : cliquez sur les **3 points** (⋯) de ce déploiement → **Redeploy** → cochez **Clear Build Cache** → validez.  
   - Si le dernier déploiement avec « Redesign... » n’est **pas** en Production : cliquez dessus → **Promote to Production**.

2. **Project Settings → Git**  
   - **Production Branch** doit être **`main`**. Si c’est autre chose (ex. `master`), changez en `main` et sauvegardez.

3. **Cache du navigateur**  
   - Ouvrez le site (ex. verdictonline.ch) et faites **Ctrl+Shift+R** (ou **Ctrl+F5**), ou testez en **navigation privée**. Sinon le navigateur peut afficher l’ancienne version en cache.

**Deploy Hooks :** ce n’est pas là qu’on « met main » pour mettre à jour le site. Les Hooks servent à avoir une URL pour déclencher un redéploiement. Pour créer un hook : donnez un **nom** (ex. « Redéploiement manuel »), pas vide.

### Le site ne s’actualise pas après un redéploiement

Si vous avez redéployé mais que vous voyez toujours l’ancienne version :

1. **Forcer un nouveau déploiement sans cache (Vercel)**  
   - Allez sur **https://vercel.com** → votre projet VERDICT.  
   - Onglet **Deployments** → cliquez sur les **3 points** (⋯) du dernier déploiement → **Redeploy**.  
   - **Cochez « Clear Build Cache »** (ou « Redeploy with cache cleared » selon l’interface).  
   - Validez. Attendez la fin du build.

2. **Vérifier que c’est bien la prod**  
   - Dans **Deployments**, le déploiement en haut doit être **Production** (badge vert).  
   - Si ce n’est pas le cas : cliquez sur ce déploiement → **Promote to Production**.

3. **Forcer le rafraîchissement dans le navigateur**  
   - **Windows** : `Ctrl + Shift + R` ou `Ctrl + F5`.  
   - **Mac** : `Cmd + Shift + R`.  
   - Ou ouvrir le site en **navigation privée** pour éviter le cache.

4. **Vérifier la branche (c’est ici qu’il faut « main »)**  
   - **Project Settings** → **Git** → **Production Branch** doit être **`main`** (pas dans « Deploy Hooks »).  
   - C’est cette branche qui est déployée en production quand vous faites `git push origin main`.  
   - **Deploy Hooks** = uniquement une URL pour *déclencher* un redéploiement à la demande (optionnel). Le champ « Branch » dans un hook peut être `main`, mais ça ne remplace pas le fait de pousser le code. Si vous créez un hook : mettez un **nom** (ex. « Redéploiement manuel »), pas vide, sinon erreur « Hook name must not be empty ».

5. **Vérifier l’URL**  
   - Vous regardez bien l’URL de production (ex. `https://votre-projet.vercel.app`) et pas une ancienne URL ou un lien en cache.

En résumé : **Redeploy avec « Clear Build Cache »** + **Promote to Production** si besoin + **Ctrl+Shift+R** dans le navigateur.

---

## Récap

| Où | Quoi faire |
|----|-------------|
| **GitHub** | Créer un **nouveau** dépôt (nom unique), ne pas ajouter README/.gitignore |
| **PowerShell** | `git init` → `git add .` → `git commit` → `git remote add origin URL` → `git push -u origin main` |
| **Vercel** | Import du dépôt, nom de projet **unique**, branche **main**, ajouter les variables d’environnement |
