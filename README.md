# Paraluman website

## Homepage implementation

- The static homepage lives in `src/components/paraluman-home`.
- Brand-ready assets live in `public/assets`; raw client files remain in ignored `assets/source`.
- The page uses the supplied vector logo exports, Mona Sans with restrained editorial accents, the eight-point star motif, paper texture, and approved cover artwork.
- Section-specific GSAP choreography adds scroll rhythm while preserving a readable reduced-motion experience.

## Documentation

- Start with [`docs/README.md`](docs/README.md) for current project decisions.
- Client source documents are indexed in [`original-docs/README.md`](original-docs/README.md) and remain unchanged.
- Raw brand packages remain in `assets/source`; optimized runtime assets live in `public/assets`.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Run the development server with the project package manager:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The homepage route is [`src/app/page.tsx`](src/app/page.tsx).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
