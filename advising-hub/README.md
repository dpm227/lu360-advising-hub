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
npm run dev
```

Open `http://localhost:3000`.

The UI works with seed data even before a database is configured.

## Database

Create `.env` from `.env.example`, then set `DATABASE_URL`.

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

The schema is intentionally lean. It models the program requirement fields needed now, including deadline, period, eligible class years, colleges, credit, work study, financial aid, GPA requirement, funding type, opportunity type, SDG tags, and keywords.

## Chat

Without `OPENAI_API_KEY`, `/api/chat` returns deterministic advising responses from local program data. With `OPENAI_API_KEY`, it calls the OpenAI Responses API and still stores messages in Prisma when `DATABASE_URL` is configured.

