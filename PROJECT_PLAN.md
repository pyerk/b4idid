# Photography Portfolio Website - Project Plan

## 🎯 Project Goals

1. **Portfolio Display**: Showcase photography work in a visually stunning way
2. **Print Sales**: Enable customers to purchase prints via Stripe
3. **Booking System**: Allow clients to schedule photoshoot inquiries
4. **Content Management**: Upload and organize photos by photoshoot/gallery
5. **Professional Design**: Eye-catching, modern, and functional

## 🛠️ Recommended Tech Stack

### Frontend
- **Next.js 14** (App Router) with TypeScript
  - Built-in image optimization
  - SEO-friendly for portfolio visibility
  - Server-side rendering for performance
  - API routes for backend functionality

### Styling
- **Tailwind CSS**
  - Modern, responsive design
  - Fast development
  - Great for portfolio layouts

### Database & Storage
- **Supabase (PostgreSQL)**
  - Galleries/Photoshoots table
  - Photos table (with metadata)
  - Print orders table
  - Booking inquiries table
  - User authentication (for admin uploads)

- **Supabase Storage**
  - High-resolution images
  - Optimized thumbnails
  - CDN delivery

### Payments
- **Stripe**
  - Stripe Checkout for print purchases
  - Webhook handling for order processing
  - Support for multiple print sizes/prices

### Deployment
- **Vercel**
  - Automatic deployments from GitHub
  - Optimized for Next.js
  - Edge functions for API routes

## 📁 Project Structure

```
b4idid/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   │   ├── page.tsx       # Home/Portfolio page
│   │   ├── gallery/[id]/  # Individual gallery view
│   │   ├── prints/        # Print shop
│   │   └── contact/       # Booking/Contact page
│   ├── (admin)/           # Admin routes (protected)
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── upload/        # Photo upload interface
│   │   └── orders/        # Order management
│   ├── api/               # API routes
│   │   ├── stripe/        # Stripe webhooks
│   │   ├── photos/        # Photo management
│   │   └── bookings/      # Booking submissions
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── gallery/           # Gallery components
│   ├── prints/            # Print shop components
│   ├── booking/           # Booking form
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities
│   ├── supabase/          # Supabase client & helpers
│   ├── stripe/            # Stripe integration
│   └── utils/             # Helper functions
├── types/                 # TypeScript types
├── public/                # Static assets
└── supabase/              # Supabase migrations (optional)
```

## 🗄️ Database Schema (Supabase)

### Tables

1. **galleries**
   - id (uuid, primary key)
   - title (text)
   - description (text)
   - cover_image_url (text)
   - date (date)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **photos**
   - id (uuid, primary key)
   - gallery_id (uuid, foreign key)
   - image_url (text)
   - thumbnail_url (text)
   - title (text, nullable)
   - description (text, nullable)
   - order_index (integer)
   - is_available_for_print (boolean)
   - created_at (timestamp)

3. **print_products**
   - id (uuid, primary key)
   - photo_id (uuid, foreign key)
   - size (text) - e.g., "8x10", "11x14", "16x20"
   - price (decimal)
   - stripe_price_id (text)
   - is_active (boolean)

4. **orders**
   - id (uuid, primary key)
   - stripe_checkout_session_id (text)
   - customer_email (text)
   - customer_name (text)
   - total_amount (decimal)
   - status (text) - "pending", "completed", "shipped"
   - shipping_address (jsonb)
   - created_at (timestamp)

5. **order_items**
   - id (uuid, primary key)
   - order_id (uuid, foreign key)
   - photo_id (uuid, foreign key)
   - print_size (text)
   - quantity (integer)
   - price (decimal)

6. **bookings**
   - id (uuid, primary key)
   - client_name (text)
   - client_email (text)
   - client_phone (text, nullable)
   - event_type (text) - "wedding", "portrait", "event", etc.
   - event_date (date, nullable)
   - message (text)
   - status (text) - "pending", "confirmed", "completed"
   - created_at (timestamp)

## 🎨 Key Features

### 1. Portfolio/Gallery Display
- Grid/masonry layout for photos
- Lightbox for full-screen viewing
- Filter by category/type
- Responsive design (mobile-first)

### 2. Print Shop
- Browse available prints
- Select size and quantity
- Stripe Checkout integration
- Order confirmation emails

### 3. Booking System
- Contact form for photoshoot inquiries
- Calendar integration (optional)
- Email notifications for new bookings
- Admin dashboard to manage bookings

### 4. Admin Panel
- Upload photos to galleries
- Create new galleries
- Manage print products
- View and manage orders
- View and respond to bookings

### 5. Image Management
- Drag-and-drop upload interface
- Automatic thumbnail generation
- Image optimization
- Organize by gallery

## 🔐 Authentication

- Supabase Auth for admin access
- Public routes don't require auth
- Protected admin routes

## 📦 Dependencies (Initial)

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/auth-helpers-nextjs": "^0.8.0",
    "@stripe/stripe-js": "^2.0.0",
    "stripe": "^14.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0"
  }
}
```

## 🚀 Development Phases

### Phase 1: Foundation
- [x] Project setup
- [ ] Next.js + TypeScript setup
- [ ] Tailwind CSS configuration
- [ ] Supabase project setup
- [ ] Database schema creation
- [ ] Basic layout and navigation

### Phase 2: Portfolio Display
- [ ] Gallery listing page
- [ ] Individual gallery view
- [ ] Photo lightbox/modal
- [ ] Image optimization

### Phase 3: Print Shop
- [ ] Print product setup
- [ ] Stripe integration
- [ ] Checkout flow
- [ ] Order management

### Phase 4: Booking System
- [ ] Contact/booking form
- [ ] Database integration
- [ ] Email notifications

### Phase 5: Admin Panel
- [ ] Authentication
- [ ] Photo upload interface
- [ ] Gallery management
- [ ] Order dashboard
- [ ] Booking management

### Phase 6: Polish
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Testing

## 🔑 Environment Variables Needed

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## 📝 Next Steps

1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS
3. Configure Supabase connection
4. Create database schema
5. Build basic layout and navigation
6. Start with portfolio display

