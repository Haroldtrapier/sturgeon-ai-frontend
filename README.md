# 🚀 Sturgeon AI - Government Contracting Platform

Complete AI-powered platform for federal contracts and grants management.

## ✨ Features

- 🔍 **Federal Opportunity Search** - SAM.gov & Grants.gov integration
- 🤖 **AI Contract Analysis** - Powered by GPT-4
- 📝 **AI Proposal Generation** - Automated proposal writing
- 📊 **Analytics Dashboard** - Track performance and metrics
- 📋 **Document Management** - Upload and organize documents
- 🔔 **Smart Notifications** - Stay updated on opportunities

## 🏗️ Tech Stack

**Frontend:**
- Next.js 14.2.33
- React 18
- TypeScript
- Tailwind CSS (inline styles)

**Backend:**
- FastAPI (Python)
- OpenAI GPT-4
- SAM.gov API
- Grants.gov API

**Database:**
- Supabase (PostgreSQL)
- 15 production tables

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Haroldtrapier/sturgeon-ai-frontend.git
cd sturgeon-ai-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://sturgeon-ai-prod.vercel.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 🌐 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Build

```bash
npm run build
npm start
```

## 📖 API Documentation

### Base URL
```
https://sturgeon-ai-prod.vercel.app
```

### Endpoints

#### Search Opportunities
```
GET /api/opportunities/search?keywords=AI&limit=50
```

#### Search Grants
```
GET /api/grants/search?keywords=technology&limit=50
```

#### Analyze Contract
```
POST /api/ai/analyze-contract
{
  "contract_text": "...",
  "analysis_type": "full"
}
```

#### Generate Proposal
```
POST /api/ai/generate-proposal
{
  "opportunity_id": "123",
  "company_info": {...}
}
```

## 📂 Project Structure

```
sturgeon-ai-frontend/
├── pages/
│   ├── index.tsx          # Landing page
│   ├── login.tsx          # Authentication
│   ├── register.tsx       # User registration
│   ├── dashboard.tsx      # Main dashboard
│   ├── opportunities.tsx  # Opportunity search
│   ├── proposals.tsx      # Proposal builder
│   └── analytics.tsx      # Analytics dashboard
├── components/            # Reusable components
├── public/               # Static assets
└── package.json         # Dependencies

```

## 🔑 Features in Detail

### Opportunity Search
- Real-time search across SAM.gov and Grants.gov
- Advanced filtering by agency, type, amount
- Save and track favorites

### AI Proposal Generation
- Automated proposal writing
- Compliance checking
- Past performance integration
- Export to Word/PDF

### Analytics Dashboard
- Win rate tracking
- Pipeline management
- Contract value metrics
- Performance trends

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Style
- TypeScript for type safety
- Functional React components
- Async/await for API calls
- Tailwind-style inline classes

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file

## 🔗 Links

- **Frontend:** https://sturgeon-ai-frontend.vercel.app
- **Backend API:** https://sturgeon-ai-prod.vercel.app
- **Documentation:** https://docs.sturgeonai.com

## 💬 Support

For support, email info@trapiermanagement.com

---

Built with ❤️ by Sturgeon AI Team
