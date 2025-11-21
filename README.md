# b4idid - Photography Portfolio

A modern photography portfolio website with print sales and booking functionality.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Payments**: Stripe
- **Deployment**: Vercel

## 📋 Features

- 📸 Portfolio/Gallery Display
- 🛒 Print Sales (Stripe Integration)
- 📅 Photoshoot Booking System
- 📤 Photo Upload & Management
- 🎨 Modern, Responsive Design

## 🔧 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account

### Installation

1. **Install Node.js** (if not already installed):
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase and Stripe credentials

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🗄️ Database Setup (Supabase)

See `PROJECT_PLAN.md` for the complete database schema. You'll need to create the following tables in Supabase:

- `galleries` - Photo galleries/photoshoots
- `photos` - Individual photos
- `print_products` - Print size and pricing
- `orders` - Customer orders
- `order_items` - Order line items
- `bookings` - Photoshoot inquiries

## 📝 Project Structure

```
b4idid/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (admin)/           # Admin routes (protected)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utilities
│   ├── supabase/          # Supabase client
│   └── stripe/            # Stripe integration
├── types/                 # TypeScript types
└── public/                 # Static assets
```

## 🚀 Deployment

This project is configured for automatic deployment on Vercel:

1. Push to `main` branch on GitHub
2. Vercel automatically detects and deploys
3. Your site will be live at `https://your-project.vercel.app`

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 Project Status

🚧 Project setup complete - Ready for development!

See `PROJECT_PLAN.md` for detailed project planning and development phases.
