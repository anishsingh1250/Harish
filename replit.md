# Transport ERP System

## Overview

This is a comprehensive Transport ERP (Enterprise Resource Planning) system that has been migrated from Flask to Next.js with Supabase. The application manages transportation operations, finance, client relationships, and vehicle management with features like Excel-like spreadsheet interfaces, direct PDF invoice generation, and multi-tenant architecture for managing multiple transport companies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS with custom dark theme optimized for transport operations
- **UI Components**: Custom components with responsive design for desktop and mobile
- **State Management**: React hooks for local state management
- **Routing**: Next.js App Router for modern routing patterns

### Backend Architecture
- **Database**: Supabase (PostgreSQL) with Row Level Security policies
- **Authentication**: Supabase Auth for user management and session handling
- **API Layer**: Next.js API routes replacing Flask blueprints
- **Legacy Support**: Flask launcher (`main.py`) maintains compatibility with existing Replit workflow

### Core Modules Structure
- **Operations**: Transaction management, vehicle routing, goods tracking
- **Finance**: Invoice management, payments, journal entries with PDF generation
- **Masters**: Client, employee, vehicle, vendor, and location management
- **Management**: Cost tracking, receivables, payables
- **Reports**: Analytics, export functionality, aging reports
- **Admin**: User management, permissions, system settings

### Database Schema
- **Multi-tenant**: Companies table for multiple transport businesses
- **Users**: Authentication and role-based access control
- **Clients**: Customer relationship management
- **Vehicles**: Fleet management and tracking
- **Invoices**: Financial transaction records
- Row Level Security ensures data isolation between companies

### PDF Invoice System
- **Template Engine**: JSON-based template configuration (Friends Star template)
- **Field Types**: Manual (fixed text), Auto (generated data), Excel (spreadsheet columns A-M)
- **Column Mapping**: A=Date, B=Client Name, C=Container, D=From Location, E=To Location, F=Rate, G=Quantity, H=Token, I=VDM, J=MEODC, K=Washing Due, L=Other Charges, M=Total
- **Direct Generation**: Automatic PDF creation without template selection popups

### Excel-like Interface Features
- Interactive spreadsheet with copy/cut/paste operations
- Insert/delete rows and columns functionality
- Horizontal and vertical scrolling
- Professional Excel ribbon interface
- Real-time data binding to invoice generation

## External Dependencies

### Core Framework Dependencies
- **Next.js**: Modern React framework for server-side rendering and routing
- **React & React DOM**: UI component library and DOM rendering
- **TypeScript**: Type safety and development tooling

### Database & Authentication
- **Supabase**: Backend-as-a-Service providing PostgreSQL database and authentication
- **@supabase/supabase-js**: JavaScript client for Supabase services
- **@supabase/auth-helpers-nextjs**: Next.js integration helpers for Supabase Auth

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **@tailwindcss/postcss**: PostCSS integration for Tailwind
- **Autoprefixer**: CSS vendor prefix handling

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing and transformation
- **Node.js Types**: TypeScript definitions for Node.js environment

### Legacy Infrastructure
- **Python/Flask**: Maintains backward compatibility through main.py launcher
- **ReportLab**: PDF generation capabilities (to be migrated to JavaScript solution)
- **SQLAlchemy**: Database ORM (being replaced by Supabase client)