"# Dashboard Admin Store Shirts

Admin dashboard for managing online shirt store. Built with Next.js, TypeScript, and Tailwind CSS.

## Features
- Product Management (Add, Edit, Delete Products)
- Order Management with Status Updates
- Sales Analytics and Reports
- Midtrans Payment Integration
- User Authentication and Authorization
- Responsive Design

## Tech Stack
- Next.js 13+
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Query for State Management
- Lucide Icons
- Recharts for Analytics

## Prerequisites
- Node.js 16+
- npm or yarn
- Midtrans Account for Payment Gateway

## Getting Started

1. Clone the repository
\`\`\`bash
git clone https://github.com/DavidDMPP/Dashboard_Admin_NextJS_StoreShirts.git
cd Dashboard_Admin_NextJS_StoreShirts
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create .env.local file
\`\`\`
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
\`\`\`

4. Run development server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
\`\`\`
src/
├── components/    # Reusable UI components
├── pages/         # Next.js pages
├── styles/        # Global styles
├── lib/          # Utilities and helpers
├── types/        # TypeScript types
└── api/          # API client setup
\`\`\`

## API Integration
The dashboard connects to a Golang backend API for:
- User Authentication
- Product Management
- Order Management
- Payment Processing via Midtrans

## Deployment
This project is configured for deployment on Vercel.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License

