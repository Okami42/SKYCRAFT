# Instructions pour configurer les téléchargements

## Comment ça fonctionne maintenant

J'ai modifié tous les boutons de téléchargement pour qu'ils déclenchent automatiquement le téléchargement de fichiers .exe (ou autres formats selon la plateforme).

### Liens configurés :

1. **Bouton principal "Télécharger maintenant"** → `public/SkyCraft-Setup.exe`
2. **Windows** → `public/SkyCraft-Windows-Setup.exe`  
3. **macOS** → `public/SkyCraft-macOS.dmg`
4. **Linux** → `public/SkyCraft-Linux.AppImage`

## Ce que vous devez faire maintenant :

### Option 1: Fichiers locaux (Recommandé pour tests)
Placez vos fichiers d'installation dans le dossier `public/` avec ces noms :
```
public/
├── SkyCraft-Setup.exe              (fichier principal)
├── SkyCraft-Windows-Setup.exe      (version Windows)
├── SkyCraft-macOS.dmg             (version macOS)
├── SkyCraft-Linux.AppImage        (version Linux)
└── [vos images et GIFs existants]
```

### Option 2: Hébergement externe (Recommandé pour production)
Si vos fichiers sont trop gros ou hébergés ailleurs, modifiez les liens dans `index.html` :

```html
<!-- Exemple avec Google Drive -->
<a href="https://drive.google.com/uc?export=download&id=VOTRE_ID_FICHIER" 
   download="SkyCraft-Setup.exe" class="btn-primary btn-large">

<!-- Exemple avec un serveur -->
<a href="https://votre-serveur.com/downloads/SkyCraft-Setup.exe" 
   download="SkyCraft-Setup.exe" class="btn-primary btn-large">

<!-- Exemple avec GitHub Releases -->
<a href="https://github.com/votre-repo/releases/download/v1.0/SkyCraft-Setup.exe" 
   download="SkyCraft-Setup.exe" class="btn-primary btn-large">
```

## Fonctionnalités ajoutées :

✅ **Téléchargement automatique** - Clic = téléchargement immédiat
✅ **Nom de fichier personnalisé** - L'attribut `download` définit le nom du fichier téléchargé
✅ **Multi-plateforme** - Liens différents selon l'OS
✅ **Compatible tous navigateurs** - Fonctionne sur Chrome, Firefox, Safari, Edge

## Notes importantes :

### Taille des fichiers
- Les navigateurs peuvent avoir des limites pour les gros fichiers
- Pour des fichiers > 100MB, considérez un hébergement externe

### Sécurité
- Certains navigateurs peuvent bloquer les téléchargements .exe
- Ajoutez un certificat de signature de code si possible

### Alternative avec JavaScript
Si vous voulez plus de contrôle, vous pouvez aussi utiliser JavaScript :

```javascript
function downloadFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
```

## Test
Pour tester, placez un fichier test dans `public/SkyCraft-Setup.exe` et ouvrez votre site. Le clic sur "Télécharger maintenant" devrait déclencher le téléchargement.

---
**Conseil :** Commencez avec des fichiers de test de petite taille pour vérifier que tout fonctionne avant d'ajouter vos vrais installateurs.
