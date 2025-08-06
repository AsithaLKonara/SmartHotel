# SmartHotel - Hotel Portfolio Website + Management System

A modern, full-stack hotel management system with a beautiful portfolio website and comprehensive admin dashboard.

## 🌟 Features

### 🌐 Portfolio Website
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean, luxury-focused design with dark/light mode
- **Room Showcase** - Detailed room listings with filters and search
- **Booking System** - Multi-step booking process with payment integration
- **Gallery** - Beautiful image galleries with lightbox
- **Contact Forms** - Easy communication with guests
- **SEO Optimized** - Built for search engine visibility

### 🛎️ Admin Management System
- **Dashboard Overview** - Real-time analytics and insights
- **Room Management** - Add, edit, and manage all room types
- **Booking Management** - Handle reservations, check-ins, and check-outs
- **Guest Management** - Complete guest profiles and history
- **Staff Management** - Manage employees with role-based access
- **Housekeeping** - Task assignment and tracking
- **Inventory Control** - Stock management with alerts
- **Billing & Invoices** - Automated billing and payment tracking
- **Reports & Analytics** - Comprehensive reporting system
- **Content Management** - Update website content and gallery

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Payments**: Stripe integration
- **Deployment**: Vercel ready

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/smarthotel.git
cd smarthotel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp env.example .env.local
```

Edit `.env.local` and add your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/smarthotel"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (Optional)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Cloudinary (Optional for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Set up the database
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### 6. Access Admin Panel
Visit [http://localhost:3000/admin](http://localhost:3000/admin) and use these credentials:

- **Super Admin**: admin@smarthotel.com / admin123
- **Manager**: manager@smarthotel.com / manager123  
- **Receptionist**: receptionist@smarthotel.com / receptionist123
- **Guest**: guest@example.com / guest123

## 📁 Project Structure

```
smarthotel/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   │   ├── layout.tsx     # Admin layout with sidebar
│   │   ├── page.tsx       # Dashboard overview
│   │   ├── rooms/         # Room management
│   │   └── bookings/      # Booking management
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign in page
│   │   └── signup/        # Sign up page
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication API
│   │   ├── rooms/         # Room management API
│   │   └── bookings/      # Booking management API
│   ├── booking/           # Public booking system
│   ├── rooms/             # Public room listings
│   ├── gallery/           # Hotel gallery
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # UI components (Button, Card, Badge, etc.)
│   ├── navigation.tsx    # Main navigation
│   ├── theme-provider.tsx # Theme management
│   └── protected-route.tsx # Route protection
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   ├── auth.ts          # Authentication config
│   └── utils.ts         # Utility functions
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
├── types/               # TypeScript type definitions
│   └── next-auth.d.ts   # NextAuth type extensions
└── public/              # Static assets
```



## 🎨 Customization

### Colors and Theme
The design system uses Tailwind CSS with custom colors defined in `tailwind.config.js`:
- Primary: Blue shades for main actions
- Luxury: Purple shades for premium features
- Gold: Accent colors for highlights

### Adding New Pages
1. Create a new file in the appropriate directory under `app/`
2. Add navigation links in `components/navigation.tsx`
3. Update the admin sidebar in `app/admin/layout.tsx` if needed

### Database Schema
The Prisma schema is located in `prisma/schema.prisma`. To modify:
1. Update the schema file
2. Run `npm run db:generate` to update the client
3. Run `npm run db:push` to apply changes

## 🔐 Authentication & Authorization

The system supports multiple user roles:
- **Super Admin**: Full access to all features
- **Manager**: Access to operations and reports
- **Receptionist**: Booking and guest management
- **Housekeeping**: Task management only
- **Guest**: Public website access

## 💳 Payment Integration

The booking system supports:
- **Stripe**: Online credit card payments
- **Pay at Hotel**: Deferred payment option
- **Invoice Generation**: Automatic PDF invoices

## 📊 Analytics & Reporting

The admin dashboard includes:
- Revenue trends and forecasts
- Room occupancy rates
- Guest demographics
- Staff performance metrics
- Inventory reports

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Prisma for the excellent ORM
- All contributors and supporters

---

**Built with ❤️ for modern hotel management** 