# Qualtrics x SpaceXAI

This private Next.js site is a GTM leave-behind for Qualtrics. It shows three illustrative Grok Bot workflows and keeps every draft behind human review.

## Run the site

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configure the password

Set `SITE_PASSWORD` in the local or deployment environment. The password gate protects the page and the private video route.

## Brand assets

`public/brand/qualtrics-wordmark.svg` contains the official Qualtrics-authored wordmark. The recorded source is [Qualtrics Employee Pulse](https://www.qualtrics.com/employee-pulse/).

The target deployment is `https://qualtrics-grokbot.vercel.app`.
