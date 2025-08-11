# Transport ERP System

A comprehensive Next.js-based Enterprise Resource Planning system specifically designed for the transport industry. This application provides intelligent spreadsheet management, advanced invoice generation, and complete business operation management.

## Features

### Core Functionality
- **Multi-tenant Architecture**: Manage multiple transport companies from a single system
- **Excel-like Spreadsheet Interface**: Full editing capabilities with copy/paste, row/column operations
- **Advanced Invoice Generation**: PDF generation with customizable templates (Friends Star Transport template included)
- **Real-time Authentication**: Secure user management with role-based access control
- **Dark Theme UI**: Professional interface optimized for extended use

### Business Modules
1. **Operations**: Transaction management, vehicle routing, goods tracking
2. **Finance**: Invoice management, payments, journal entries  
3. **Masters**: Client, employee, vehicle, vendor, and location management
4. **Management**: Cost tracking, receivables, payables
5. **Reports**: Analytics, export functionality, aging reports
6. **Admin**: User management, permissions, system settings, audit logs

## Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS 4 with dark theme
- **Authentication**: Supabase Auth with JWT tokens
- **TypeScript**: Full type safety implementation
- **PDF Generation**: Browser-based PDF creation
- **State Management**: React hooks with Supabase real-time

## Quick Start

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/transport-erp-nextjs.git
cd transport-erp-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run database migrations:
```bash
# Apply the schema from supabase/schema.sql to your Supabase project
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5000](http://localhost:5000) in your browser.

### Demo Login
For testing purposes, you can use:
- **Email**: `superadmin@transport-erp.com`
- **Password**: `superadmin123`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin module pages
│   ├── dashboard/         # Main dashboard
│   ├── finance/           # Financial management
│   ├── login/             # Authentication
│   ├── management/        # Business management
│   ├── masters/           # Master data management
│   ├── operations/        # Core operations
│   ├── reports/           # Reporting and analytics
│   └── layout.tsx         # Root layout component
├── components/            # Reusable React components
│   ├── ExcelSpreadsheet.tsx
│   └── InvoiceGenerator.tsx
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Database client
│   ├── pdf-generator.ts   # PDF generation utilities
│   └── types.ts           # TypeScript definitions
├── supabase/              # Database schema and migrations
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Key Components

### ExcelSpreadsheet Component
Full-featured spreadsheet interface with:
- Cell editing and navigation
- Copy/paste functionality
- Row and column operations
- Keyboard shortcuts
- Data validation

### InvoiceGenerator Component  
Advanced PDF invoice generation featuring:
- Customizable templates
- Dynamic field mapping
- Automatic calculations
- Company branding integration
- Multiple export formats

### Authentication System
Secure user management with:
- JWT-based authentication
- Role-based permissions
- Session management
- Password recovery
- Multi-tenant support

## Database Schema

The application uses a comprehensive database schema including:

- **Users & Authentication**: User management and permissions
- **Companies**: Multi-tenant company data
- **Clients**: Customer information and contacts
- **Vehicles**: Fleet management
- **Transactions**: Core business operations
- **Invoices**: Financial documents
- **Employees**: Staff management
- **Vendors**: Supplier relationships
- **Locations**: Route and destination management

See `supabase/schema.sql` for complete schema definitions.

## Configuration

### Template Configuration
The system supports customizable invoice templates. See `template_config_friends_star.json` for an example configuration.

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (server-side only)
- `NODE_ENV`: Environment mode (development/production)

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Use TypeScript for type safety
- Follow Next.js 15 best practices
- Implement proper error handling
- Write comprehensive tests
- Maintain responsive design
- Follow the established component structure

## License

This project is proprietary software developed for transport industry ERP management.

## Support

For support and questions, please contact the development team or create an issue in the GitHub repository.

---

**Built with ❤️ for the Transport Industry**