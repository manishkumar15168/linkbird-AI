# LinkBird CRM

A modern CRM application for lead management and campaign tracking, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Overview of campaigns, recent activity, and LinkedIn accounts
- **Leads Management**: View and manage leads with detailed profiles
- **Campaign Management**: Create and track marketing campaigns
- **Campaign Details**: Detailed campaign view with leads, sequences, and settings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd linkbird-crm
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

The project includes a `vercel.json` configuration file for optimal deployment.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── campaigns/         # Campaign pages
│   ├── leads/            # Leads page
│   ├── messages/         # Messages page
│   ├── linkedin/         # LinkedIn accounts page
│   ├── settings/         # Settings page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── Header.tsx        # Page header
│   ├── Dashboard.tsx     # Dashboard component
│   ├── LeadsTable.tsx    # Leads table with profile modal
│   ├── CampaignsList.tsx # Campaigns list
│   ├── CampaignDetails.tsx # Campaign details with tabs
│   └── ResponsiveLayout.tsx # Responsive layout wrapper
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json          # Vercel deployment config
```

## Features Overview

### Dashboard
- Campaign overview with status and metrics
- Recent activity feed
- LinkedIn accounts status

### Leads Management
- Comprehensive leads table
- Lead profile modal with timeline
- Activity indicators and status badges

### Campaign Management
- Campaign list with filtering
- Campaign details with multiple tabs:
  - Overview: Campaign metrics
  - Leads: Associated leads
  - Sequence: Message templates
  - Settings: Campaign configuration

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Touch-friendly interface

## Customization

The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the color scheme in `tailwind.config.js`
2. Updating component styles in individual component files
3. Adding new utility classes in `app/globals.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

