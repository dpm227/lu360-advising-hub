# LU360 AI Chat Assistant

Next.js, React, TypeScript, and Prisma implementation for the LU360 AI Chat Assistant.

The first slice includes:

- Discover page with program carousel, recommendations, and program cards.
- Advisor chat page with local fallback responses and optional OpenAI runtime support.
- Student profile page styled to match the Figma Material 3 direction.
- Prisma schema for organizations, users, Google OAuth tables, students, advisors, programs, requirements, chat threads/messages, saved/hidden programs, and recommendation results.

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

The UI works with the static program catalog even before a database is configured.


## Database

The repo includes a local Docker PostgreSQL setup in `docker-compose.yml`.

Start Postgres:

```bash
npm run db:docker:up
```

The local database connection string is already listed in `.env.example`:

```env
DATABASE_URL="postgresql://lu360:lu360_dev_password@localhost:5432/lu360_advising_hub?schema=public"
```

Prisma 7 reads this connection string from `prisma.config.ts`, not directly from `prisma/schema.prisma`. The app and seed script use Prisma's PostgreSQL driver adapter for direct local database connections.

After copying `.env.example` to `.env`, initialize Prisma:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Useful Docker commands:

```bash
npm run db:docker:logs
npm run db:docker:down
```

`db:docker:down` stops the database container but keeps the named Docker volume, so local database data is preserved. To fully delete local database data, remove the `lu360_postgres_data` Docker volume manually.

The schema is intentionally lean. It models the program requirement fields needed now, including deadline, period, eligible class years, colleges, credit, work study, financial aid, GPA requirement, funding type, opportunity type, SDG tags, and keywords.

## Google OAuth

The app uses Auth.js / NextAuth with Google OAuth and the Prisma adapter.

Add these values to `.env`:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
```

In Google Cloud Console, configure the OAuth client with this redirect URI:

```text
http://localhost:3000/api/auth/callback/google
```

For production, replace the host with the production domain:

```text
https://your-domain.com/api/auth/callback/google
```

## Chat

Without `OPENAI_API_KEY`, `/api/chat` returns deterministic advising responses from local program data. With `OPENAI_API_KEY`, it calls the OpenAI Responses API and still stores messages in Prisma when `DATABASE_URL` is configured.

## How the app fits together

### Directory map

```text
advising-hub/
├── app/
│   ├── page.tsx                 # Discover page and its data-loading flow
│   └── api/                     # API route handlers
├── components/
│   ├── AppShell.tsx             # Shared page layout and navigation
│   ├── DiscoverCarousel.tsx     # Featured program carousel
│   ├── ProgramCard.tsx          # Program cards in the catalog
│   └── ProgramActions.tsx       # Save, apply, chat, and source actions
├── lib/
│   ├── program-data.ts          # Static program catalog and fallback data
│   ├── program-records.ts       # Selects database or fallback records
│   └── recommendations.ts       # Program scoring and ranking
└── prisma/
    ├── schema.prisma            # PostgreSQL data model
    └── seed.mjs                 # Copies the static catalog into PostgreSQL
```

### Discover page flow

1. **Load the page context.** [`app/page.tsx`](app/page.tsx) handles `/` and loads the program catalog together with the student's profile and saved or hidden programs. Signed-out users use the demo profile.

2. **Select the program source.** [`lib/program-records.ts`](lib/program-records.ts) reads from PostgreSQL when the database is available and contains programs. Otherwise, it falls back to [`lib/program-data.ts`](lib/program-data.ts).

3. **Filter and rank.** Hidden programs are removed, then [`lib/recommendations.ts`](lib/recommendations.ts) scores and sorts the remaining programs using class year, college, interests, keywords, and funding needs.

4. **Render the results.** [`DiscoverCarousel`](components/DiscoverCarousel.tsx) displays featured matches, while [`ProgramCard`](components/ProgramCard.tsx) renders the full visible catalog. Both use [`ProgramActions`](components/ProgramActions.tsx) for program interactions.

### Static catalog and database data

Running `npm run db:seed` executes [`prisma/seed.mjs`](prisma/seed.mjs), which copies the static catalog into PostgreSQL. The seed script does not run while the Discover page renders.

At runtime, Discover uses database records when PostgreSQL is configured, reachable, and non-empty. Otherwise, it uses the static catalog as a fallback.
