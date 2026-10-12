# Prashant Sagar Bimoli - Portfolio Website

A personal portfolio, blog, and learning journey site built for **Prashant Sagar Bimoli** (Aspiring Data Engineer), inspired by modern minimalist developer sites.

## 🚀 Features

- **Zero Build Step**: Pure static HTML, CSS, and JS — loads instantly, zero bundle overhead.
- **Dark / Light Mode**: LocalStorage-persisted with system preference detection and zero flash on load.
- **Pages**:
  - `Home`: Bio, photo avatar, latest blog entries.
  - `About`: Full background and skills grid.
  - `Resume`: Work, projects, and education timeline.
  - `Now`: Current learning and building priorities.
  - `Journey`: Weekly log of data engineering milestones.
  - `Writing / Blog`: Article catalog with code syntax styling.
  - `Projects`: Interactive project cards with links.
  - `Stack`: Daily languages, databases, tools, and platforms.
  - `Search`: Instant client-side search across articles.
  - `Privacy` & `Terms`: Static legal pages.
- **Custom Favicon & Avatar**: Optimized profile photo assets.
- **Cloudflare Ready**: Includes `_headers` for caching and security policies.

## 📦 Local Development

Open `index.html` in your browser or run any local HTTP server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## ☁️ Cloudflare Pages Deployment

1. Push this repository to GitHub.
2. In Cloudflare Dashboard, go to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. **Build settings**:
   - Framework preset: `None`
   - Build command: *(leave blank)*
   - Build output directory: `/`
5. Click **Save and Deploy**.
