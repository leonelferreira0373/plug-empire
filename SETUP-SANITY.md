# Activate the Admin Panel (Sanity) — 5 minutes

The site works fine without Sanity (falls back to hardcoded products). Sanity is
only required to give the client an editable admin panel at `/studio`.

## 1 · Create the Sanity project

1. Open [sanity.io/manage](https://www.sanity.io/manage) and sign in with Google
   (use the brand's Google account — `Plugempire.contact@gmail.com`).
2. Click **Create new project**.
3. Project name: `plug-empire` · Dataset: `production` · Plan: **Free**.
4. After creation, note the **Project ID** (visible in the project overview).

## 2 · Generate an API token

1. In the project, go to **API → Tokens → Add API token**.
2. Name: `migration + writes` · Permissions: **Editor**.
3. Copy the token now (only shown once).

## 3 · Add env vars locally

Edit `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<paste your project id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=<paste your token>
```

## 4 · Run the migration

Pushes all 7 products + page content into Sanity (with images):

```
node scripts/migrate-to-sanity.mjs
```

Safe to re-run — uses stable document IDs.

## 5 · Push the same env vars to Vercel

```
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
vercel env add NEXT_PUBLIC_SANITY_DATASET production
vercel env add SANITY_API_WRITE_TOKEN production
```

(or via the Vercel dashboard → Project → Settings → Environment Variables)

## 6 · Redeploy

```
vercel deploy --prod --yes
```

Open `https://plug-empire.vercel.app/studio`. Log in with the Google account
that owns the Sanity project. The client logs in the same way.

---

## Admin panel layout

The Studio at `/studio` shows 5 sections:

- **🏠 Página Inicial** — hero text, manifesto
- **📖 Sobre** — story, pillars
- **📞 Contacto** — emails, social handles, address
- **🛍 Produtos** — full product catalog
- **📦 Encomendas** — all orders received via `/api/order`, with status

Each product card has 3 tabs:

- **✏️ Essenciais** — photos, name, price, description, stock (99% of edits)
- **Detalhes** — category, sizes, colors, feature bullets
- **Avançado** — EN translation, badge, URL slug, related products

## Where things live

| Concern        | Provider          | Cost       |
| -------------- | ----------------- | ---------- |
| Site frontend  | Vercel            | Free       |
| Email sending  | Brevo SMTP relay  | Free (300/day) |
| Admin + data   | Sanity            | Free (3 users, 10k docs, 20GB) |
| Source code    | GitHub            | Free       |
