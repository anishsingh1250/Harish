# Transport ERP System

A comprehensive Transport ERP (Enterprise Resource Planning) system built with Flask and SQLAlchemy. The application manages transportation operations, finance, client relationships, vehicle management, and administrative functions for transportation companies.

## Features

### Multi-Tenant Architecture
- Super Admin dashboard for managing multiple transport companies
- Automatic credential generation for new companies
- Company-specific dashboards and data isolation

### Excel-like Spreadsheet Interface
- Interactive spreadsheet with Excel-like functionality
- Copy/Cut/Paste operations with visual feedback
- Insert/Delete rows and columns
- Horizontal and vertical scrolling
- Professional Excel ribbon interface

### Direct Invoice Generation
- Automatic PDF invoice generation without template selection popups
- Friends Star template with exact field allocation
- Column mapping (A-M) for transport data:
  - A=Date, B=Client Name, C=Container, D=From Location
  - E=To Location, F=Rate, G=Quantity, H=Token, I=VDM
  - J=MEODC, K=Washing Due, L=Other Charges, M=Total

### Core Modules
- **Operations**: Transaction management, vehicle routing, goods tracking
- **Finance**: Invoice management, payments, journal entries  
- **Masters**: Client, employee, vehicle, vendor, and location management
- **Management**: Cost tracking, receivables, payables
- **Reports**: Analytics, export functionality, aging reports
- **Admin**: User management, permissions, system settings

## Technology Stack

### Backend
- **Framework**: Flask (Python web framework)
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy
- **Authentication**: Flask-Login for session management
- **PDF Generation**: ReportLab for invoice PDFs
- **Database**: PostgreSQL (production) / SQLite (development)

### Frontend
- **UI Framework**: Bootstrap 5 with dark theme
- **Icons**: Feather Icons
- **Charts**: Chart.js
- **JavaScript**: Vanilla JavaScript with Excel-like functionality

## Quick Start

### Default Credentials

**Super Admin Access:**
- Username: `superadmin`
- Password: `superadmin123`

**Company Admin Access:**
- Username: `fst002_admin`
- Password: `admin123`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/harishvazirani/Anish.git
cd Anish
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set environment variables:
```bash
export DATABASE_URL="your_database_url"
export SESSION_SECRET="your_session_secret"
```

4. Run the application:
```bash
python main.py
```

The application will be available at `http://localhost:5000`

## Database Models

### Core Models
- **Company**: Multi-tenant company information
- **User**: Authentication and role-based permissions
- **Client**: Customer information and contacts
- **Invoice**: Financial documents with transport details
- **Vehicle**: Fleet management
- **Employee**: Staff management

### Transport-Specific Fields
- Container information
- From/To locations  
- Token and VDM details
- MEODC charges
- Washing fees and other charges

## Architecture

### Request Flow
1. User authenticates via Flask-Login
2. Route handlers check permissions using decorators
3. Business logic processes requests using SQLAlchemy models
4. Templates render data with Bootstrap components
5. JavaScript handles dynamic interactions

### Data Processing
1. Form submissions validated server-side
2. Database operations through SQLAlchemy ORM
3. Business calculations in utility functions
4. Report generation with PDF/CSV export
5. Email notifications for key events

## Development

### Project Structure
```
├── app.py                 # Flask application setup
├── models.py              # Database models
├── routes.py              # Route handlers
├── auth.py               # Authentication logic
├── utils.py              # Utility functions
├── invoice_templates.py   # PDF template generation
├── templates/            # HTML templates
├── static/              # CSS, JS, images
└── attached_assets/     # User uploaded files
```

### Key Features Implementation
- **Field Allocation System**: Automatic mapping of Excel columns to PDF invoice fields
- **Template System**: JSON configuration for customizable invoice templates
- **Multi-tenant Security**: Company-based data isolation and access control
- **Excel Interface**: Full spreadsheet functionality with keyboard shortcuts
- **Direct PDF Generation**: No popup template selection, automatic Friends Star format

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.