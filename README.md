# Muhammad Ahsan Shaaf — Personal Portfolio

Production-ready personal portfolio for:

**https://iamahsanshaaf.github.io/**

## Repository

This project is intended for the GitHub user Pages repository:

```text
iamahsanshaaf/iamahsanshaaf.github.io
```

Because the repository name matches the GitHub username Pages convention, GitHub publishes it at the root URL:

```text
https://iamahsanshaaf.github.io/
```

## Stack

- Semantic HTML5
- Modern responsive CSS
- Vanilla JavaScript
- Local SVG assets
- No framework dependency
- No build step
- GitHub Pages compatible
- Dark/light mode
- Accessibility and reduced-motion support
- SEO + Open Graph + JSON-LD

## Project structure

```text
.
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── .nojekyll
└── assets
    ├── css
    │   └── styles.css
    ├── js
    │   └── main.js
    └── images
        ├── favicon.svg
        ├── brand-mark.svg
        ├── hero-mobile-engineering.svg
        ├── cleandense-ecosystem.svg
        ├── about-orbit.svg
        └── og-image.png
```

## Deploy to GitHub Pages

### Option A — Push with Git

From this folder:

```bash
git init
git branch -M main
git add .
git commit -m "Launch personal portfolio"
git remote add origin https://github.com/iamahsanshaaf/iamahsanshaaf.github.io.git
git push -u origin main
```

Then open:

```text
Repository → Settings → Pages
```

Choose:

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

Save.

Your portfolio will publish at:

```text
https://iamahsanshaaf.github.io/
```

### Option B — Upload files in GitHub

You can also use **Add file → Upload files** and upload the contents of this folder.

Important: upload the files/folders themselves to the repository root. Do not upload the ZIP as a single file.

## Local preview

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Public identity links

- Portfolio: https://iamahsanshaaf.github.io/
- GitHub: https://github.com/iamahsanshaaf
- LinkedIn: https://www.linkedin.com/in/iamahsanshaaf/
- X: https://x.com/iamAhsanShaaf
- Company: https://intuitexaisol.com

## Notes

- `Intuitex AI Solutions` remains linked as the founder/company identity.
- SEO canonical URLs now point to `iamahsanshaaf.github.io`.
- `robots.txt` and `sitemap.xml` are configured for the GitHub Pages domain.
- `.nojekyll` is included so GitHub Pages serves the site as plain static files.
