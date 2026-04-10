# GearTrack 🎸

A high-performance marketplace insights and tracking application for musicians and gear enthusiasts. Monitor listings across Reverb, eBay, and Kijiji, track historical price trends, and leverage AI-driven market analysis — all in one unified dashboard.

---

## Features

- **🎸 Multi-Platform Monitoring**: Seamlessly track instrument listings from Reverb, eBay, and Kijiji in a single, high-performance interface.
- **📉 Price History & Trends**: Visualize historical price data with Recharts snapshots to identify market trends and optimal buy/sell timing.
- **🤖 AI-Driven Insights**: Integrated with Gemini 1.5 Pro for automated fair market price estimation and listing sentiment analysis.
- **🔔 Smart Alerts**: Set custom watchlists and price alerts to receive instant notifications when gear hits your target price.
- **🔐 Secure Authentication**: Enterprise-grade user management and synchronization powered by Clerk.
- **📊 Real-time Sync**: Robust background ingestion pipelines and scrapers to keep marketplace data fresh and accurate.

## Tech Stack

- **Next.js 16 & React 19**: Modern App Router architecture utilizing Server Components for maximum performance.
- **Tailwind CSS 4 & Framer Motion**: Cutting-edge styling with fluid, high-quality animations and responsive design.
- **Gemini 1.5 Pro**: Google’s Generative AI for structured market recommendations and data parsing.
- **Prisma & PostgreSQL**: Type-safe ORM with optimized database connections via `@prisma/adapter-pg`.
- **Clerk**: Secure, scalable authentication and user profile management.
- **Zustand & Zod**: Lightweight client-side state management and rigorous schema-based validation.

---

## Installation & Setup

**Prerequisites:**

- Node.js 20+
- PostgreSQL database
- Clerk Account (API Keys)
- Google AI Studio API Key (Gemini)

```bash
# Clone the repository
git clone https://github.com/yourusername/geartrack.git
cd geartrack

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in: DATABASE_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, GEMINI_API_KEY

# Setup the database
npx prisma generate
npx prisma db push
```

## Usage

**Run the Development Server:**

```bash
npm run dev
```

**Run Linting & Formatting:**

```bash
npm run lint
npm run format
```

**Build for Production:**

```bash
npm run build
npm run start
```

---

## Things Learned

Developing GearTrack involved exploring modern architectural patterns and cutting-edge web technologies:

- **Next.js 16 Server Components**: Leveraging server-side logic for Prisma and Clerk fetching to reduce client-side bundle size.
- **AI Ingestion Pipeline**: Engineering prompts for Gemini 1.5 Pro to ensure 100% JSON-compliant responses for market analysis.
- **Headless Scraping Patterns**: Implementing `cheerio` scrapers to normalize inconsistent listing data from multiple marketplace sources.
- **Relational Trend Analysis**: Designing a `PriceSnapshot` model to efficiently store and query historical price data for charting.
- **Tailwind 4 Utility Engine**: Adopting the latest CSS-in-JS evolution for improved build times and streamlined styling workflows.
