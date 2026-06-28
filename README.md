# M.E.G.A. — Marketing & Sales Website

A production Next.js (App Router) website to market and sell **M.E.G.A.**
(Machine Enhanced General Assistant) — a local-first Windows AI assistant.
It handles a one-time **$50** purchase via **Square** and delivers the product
through a **secure, gated, single-use download**.

- **Framework:** Next.js 14 (App Router) · TypeScript · Tailwind CSS
- **Animation:** Framer Motion + GSAP (all motion respects `prefers-reduced-motion`)
- **Payments:** Square (via REST — no SDK)
- **Downloads:** HMAC-signed, single-use, time-limited tokens

---

## 1. Quick start (local)

```bash
npm install
cp .env.example .env.local      # then edit values (see §3)
npm run dev                     # http://localhost:3000
```

To preview the **entire purchase → download flow without Square**, enable demo
mode in `.env.local`:

```
MEGA_DEMO_MODE=true
```

With demo mode on, the Buy button skips real payment and sends you straight to a
working download page. Turn it **off** for production.

---

## 2. How it fits together

| Area | Files |
|---|---|
| Product facts (name, price, contact) | `lib/constants.ts` |
| Square checkout | `lib/square.ts`, `app/api/checkout/route.ts` |
| Payment confirmation | `app/api/webhooks/square/route.ts` |
| Paid-order record | `lib/store.ts` |
| Download tokens | `lib/downloadTokens.ts`, `app/api/download/token/route.ts` |
| File delivery (gated) | `app/api/download/file/route.ts` |
| Rate limiting | `lib/rateLimit.ts` |
| The product ZIP | `private/mega-app.zip` (not public) |

**Flow:** Buy → Square Checkout → Square webhook marks the order paid
(`lib/store.ts`) → the download page exchanges the order reference for a
**single-use, signed token** → the file route verifies + redeems the token and
streams `private/mega-app.zip`.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Public site URL (e.g. `https://yourdomain.com`). Used for Square redirect URLs. |
| `SQUARE_ACCESS_TOKEN` | Square access token (sandbox or production). |
| `SQUARE_LOCATION_ID` | Your Square location ID. |
| `SQUARE_ENVIRONMENT` | `sandbox` or `production`. |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | Signature key for the webhook subscription (verifies authenticity). |
| `DOWNLOAD_SIGNING_SECRET` | Secret used to sign download tokens. **Generate your own** (below). |
| `MEGA_ZIP_PATH` | Optional. Absolute path to the real ZIP. Defaults to `private/mega-app.zip`. |
| `MEGA_DEMO_MODE` | `true` to preview the flow without Square. Leave unset/`false` in production. |

Generate a strong signing secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 4. Square setup

1. Create an application in the [Square Developer Dashboard](https://developer.squareup.com/apps).
2. Copy the **Access Token** and **Location ID** into `.env.local`. Use
   **sandbox** credentials while testing; switch to **production** when ready and
   set `SQUARE_ENVIRONMENT=production`.
3. Create a **webhook subscription** pointing at:
   ```
   https://YOUR_DOMAIN/api/webhooks/square
   ```
   Subscribe to payment events (e.g. `payment.updated`). Copy the
   **Signature Key** into `SQUARE_WEBHOOK_SIGNATURE_KEY`.
4. The webhook handler verifies the signature and only marks an order paid when
   the payment is **COMPLETED** for the correct amount (`$50`,
   `lib/constants.ts → PRODUCT.priceCents`).

> Until Square is configured, the checkout route returns a clear "not configured"
> response. Use `MEGA_DEMO_MODE=true` to demo the UX in the meantime.

---

## 5. Drop in the real product

The download is served from `private/mega-app.zip`, which is **outside** `public/`
and never directly accessible. Replace the placeholder with your real build:

```bash
# Option A: replace the file
cp /path/to/your/MEGA-build.zip private/mega-app.zip

# Option B: point at it instead
echo "MEGA_ZIP_PATH=C:\\path\\to\\MEGA-build.zip" >> .env.local
```

Update the displayed file name/size in `lib/constants.ts`
(`downloadFileName`, `downloadDisplaySize`) to match.

`.gitignore` excludes `private/*.zip` so you don't commit the real artifact.

---

## 6. Production hardening (important)

The reference implementation uses **in-memory** stores so it runs with zero
external services out of the box. These reset whenever the server restarts and do
**not** work across multiple serverless instances. Before real sales, swap them
for durable storage:

- **`lib/store.ts`** — records which order references are paid, and which tokens
  have been consumed. Back this with a database or KV (e.g. Vercel KV, Redis,
  Postgres). The functions to reimplement are clearly marked.
- **`lib/rateLimit.ts`** — in-memory limiter; replace with a shared limiter
  (e.g. Redis/Upstash) so limits hold across instances.

Both files contain comments calling out exactly what to replace. The token
signing/verification in `lib/downloadTokens.ts` is stateless (HMAC) and is
production-ready as-is, but **consumption tracking** (single-use enforcement)
lives in `lib/store.ts` and must be durable.

---

## 7. Deploy to Vercel

1. Push the repo to Git and import it in Vercel.
2. Add all environment variables from §3 in the Vercel project settings.
3. Add a **persistent store** (Vercel KV / Redis / a database) and wire up
   `lib/store.ts` and `lib/rateLimit.ts` as described in §6.
4. Configure the Square webhook URL to your deployed domain (§4).
5. Upload/commit the real `private/mega-app.zip`, or set `MEGA_ZIP_PATH`.

The download routes send `Cache-Control: no-store` and `X-Robots-Tag: noindex`
(see `next.config.mjs`), so download URLs are never cached or indexed.

---

## 8. Editing content

- **Product facts, price, contact details:** `lib/constants.ts`
  (currently set to support email `johncomputers2024@gmail.com` and phone
  `(786) 452-6881`).
- **Home page sections & order:** `app/page.tsx`.
- **Installation guide:** `app/docs/installation/page.tsx`.
- **Docs / command reference:** `app/docs/page.tsx`.
- **Legal pages:** `app/legal/*` (have a lawyer review before launch).

---

## 9. Honesty & accuracy

Copy throughout the site is intentionally honest about M.E.G.A. being a **beta**
product. It runs **locally by default** on free Ollama models and needs **no API
key to get started** (web search is keyless via DuckDuckGo). It can **optionally**
use cloud providers — Claude, GPT-4o, Gemini, or Grok — with the user's own key,
stored in M.E.G.A.'s local encrypted vault. Please keep new copy consistent with
what the product actually does, and keep the beta warnings in place.

---

## 10. Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # lint
```

---

**Support / contact:** johncomputers2024@gmail.com · (786) 452-6881
