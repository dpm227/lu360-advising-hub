# LU360 Advising Hub

Next.js, React, TypeScript, and Prisma implementation for the LU360 Advising Hub.

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

The UI works with seed data even before a database is configured.

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
