# Corriger le push bloqué par GitHub (secrets détectés)

GitHub a bloqué le push car `.env.example` contenait des **vraies clés** (OpenAI, Stripe, Supabase). Ce fichier a été remplacé par des **placeholders** sans clés réelles.

**Important :** Vos vraies clés doivent rester **uniquement** dans `.env.local` (ce fichier n’est pas envoyé sur Git grâce au `.gitignore`).

---

## Ce qui a été fait

- `.env.example` a été réécrit avec des valeurs factices (`your-openai-api-key-here`, etc.) pour ne plus déclencher la détection de secrets.

---

## Ce que vous devez faire (dans PowerShell)

Les **secrets sont encore dans l’historique Git** (dans le commit "Premier commit"). Il faut réécrire l’historique puis pousser.

Ouvrez **PowerShell** ou **CMD** et allez dans le dossier du projet :

```powershell
cd C:\Users\Abyssin\Documents\Verdict
```

### Option A — Nouveau dépôt propre (recommandé)

1. **Supprimer l’historique local** (garder tous les fichiers) :
   ```powershell
   Remove-Item -Recurse -Force .git
   git init
   git branch -M main
   ```

2. **Vérifier que `.env.example` est bien le bon** (sans vraies clés) :
   ```powershell
   type .env.example
   ```
   Vous devez voir des placeholders comme `your-openai-api-key-here`, pas de vraies clés.

3. **Un seul commit** :
   ```powershell
   git add .
   git commit -m "Initial commit - Verdict"
   git remote add origin https://github.com/Dopsign/Verdict.git
   git push -u origin main
   ```
   Si `remote add origin` dit "already exists", faites :
   ```powershell
   git remote set-url origin https://github.com/Dopsign/Verdict.git
   git push -u origin main
   ```

---

### Option B — Rebase pour modifier le premier commit

Si vous préférez garder l’historique Git et seulement corriger le premier commit :

```powershell
git rebase -i --root
```

Dans l’éditeur : sur la **première ligne** (commit "Premier commit"), remplacez `pick` par `edit`. Enregistrez et fermez.

Puis :

```powershell
git add .env.example
git commit --amend --no-edit
git rebase --continue
```

Enfin :

```powershell
git push -u origin main
```

---

## Après le push

1. **Vérifier vos clés**  
   Ouvrez `.env.local` (il n’est pas sur GitHub) et assurez-vous qu’il contient bien vos **vraies** clés pour le développement local.

2. **Ne plus mettre de vraies clés dans `.env.example`**  
   Ce fichier sert uniquement de modèle (placeholders). Les vrais secrets vont dans `.env.local` ou dans les variables d’environnement Vercel.

3. **Déploiement Vercel**  
   Une fois le push réussi, connectez le dépôt à Vercel et ajoutez les variables d’environnement dans le projet Vercel (Settings → Environment Variables).
