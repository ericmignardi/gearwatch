# Gemini CLI Context: Gear Marketplace Insights Tracker

## Project Overview
This project is a high-performance **Gear Marketplace Insights and Tracking** application built with **Next.js 16** and **React 19**. It enables users to monitor instrument and gear listings across multiple platforms (Reverb, eBay, etc.), track price history, and receive AI-driven market analysis.

### Main Technologies
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI & Styling:** React 19, Tailwind CSS 4, Framer Motion, Lucide Icons
- **Authentication:** [Clerk](https://clerk.com/)
- **Database & ORM:** PostgreSQL with [Prisma](https://www.prisma.io/)
- **AI Integration:** [Google Generative AI](https://ai.google.dev/) (Gemini 1.5 Pro) for market sentiment analysis and fair market price estimation.
- **Data Visualization:** [Recharts](https://recharts.org/) for price history snapshots.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Validation:** [Zod](https://zod.dev/)

## Architecture Highlights
- **Server-Side Rendering:** Heavy use of Next.js Server Components for data fetching (Prisma + Clerk).
- **AI Insights Pipeline:** A dedicated API route (`/api/ai/insights`) that combines Prisma listing data with recent sales history to generate JSON-formatted market recommendations via Gemini.
- **Relational Data Model:** 
    - `Listing`: Tracks active gear items and their source (Reverb, eBay, etc.).
    - `PriceSnapshot`: Stores historical price points for trend analysis.
    - `Watchlist` & `PriceAlert`: User-specific tracking parameters.
    - `User`: Synchronized with Clerk auth.

## Building and Running
### Development
```bash
# Install dependencies
npm install

# Set up environment variables (.env)
# Required: DATABASE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, GEMINI_API_KEY

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma db push

# Start development server
npm run dev
```

### Production
```bash
# Build the project
npm run build

# Start the production server
npm run start
```

### Testing & Quality
```bash
# Run ESLint
npm run lint
```

## Development Conventions
- **Routing:** Follows Next.js App Router conventions in the `app/` directory.
- **API Routes:** Located in `app/api/`, using standard `route.ts` handlers.
- **Prisma Client:** Initialized in `libs/prisma.ts` for singleton reuse.
- **Validation:** Use Zod schemas in `validators/` for both API requests and form data.
- **Styling:** Adhere to Tailwind CSS 4 utility classes; custom animations should use Framer Motion.
- **AI Prompts:** When modifying AI logic in `app/api/ai/`, ensure Gemini's response is strictly requested as JSON to maintain compatibility with the frontend parsers.
