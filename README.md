This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documentation

### 1. Structure

- `/__tests__`: Define test specs for component testing.
- `/components`: Define all components are using in the app.
- `/helpers`: Utilities helper functions.
- `/pages`: Define site's route and API structure.
- `/public`: All static assets will be stored in here.
- `/services/GrapSchema.ts`: Define graphql query schema.
- `/next-seo.config.ts`: Default SEO settings.

### 2. Config `.env`

- `NEXT_PUBLIC_STRAPI_API_URL`: URL of strapi API, default is `localhost:3030`

### 3. Routes

Next.js has a file-system based router built on the concept of pages. When a file is added to the pages directory it's automatically available as a route.

- `/`: This route return home page component that's defined in `pages/index.tsx`.
- `pages/article/[slug].tsx`: This route render the detail article. This page will match with route path `/article/any-article-slug`.
- `pages/category/[slug].tsx`: This route render the categories page. This page will match with route path `/category/any-article-slug`.
