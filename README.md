# Piranha Cocktail Bureau

A sophisticated cocktail bar website featuring a modern React frontend and FastAPI backend. The application showcases signature cocktails, gallery images, and provides contact functionality for the Piranha Cocktail Bureau.

## 🍸 Features

- **Landing Page**: Hero section with carousel, signature cocktails menu, about section, gallery, and contact form
- **Cocktails Page**: Filterable and searchable cocktail catalog with tags
- **Gallery Page**: Image gallery with autoplay carousel and masonry grid layout
- **Contact System**: Form submissions stored locally with toast notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Elegant dark theme with gold accents
- **Animations**: GSAP-powered animations and smooth transitions
- **Status Tracking**: Backend API for status checks and monitoring

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **GSAP** - Professional animations
- **Embla Carousel** - Touch-friendly carousels
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - Document database with Motor async driver
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server
- **Python-dotenv** - Environment variable management
- **CORS Middleware** - Cross-origin resource sharing

## 📁 Project Structure

```
├── backend/
│   ├── server.py          # FastAPI application
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main application pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── App.js        # Main application component
│   │   └── mock.js       # Mock data and content
│   ├── package.json      # Frontend dependencies
│   └── .env             # Frontend environment variables
└── tests/               # Test files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- MongoDB instance
- Yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables in `.env`:
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="piranha_db"
CORS_ORIGINS="http://localhost:3000"
```

5. Start the backend server:
```bash
uvicorn server:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables in `.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

4. Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`

## 📡 API Endpoints

### Status Checks
- `GET /api/` - Health check endpoint
- `POST /api/status` - Create status check entry
- `GET /api/status` - Retrieve all status checks

### Request/Response Examples

**Create Status Check:**
```bash
POST /api/status
Content-Type: application/json

{
  "client_name": "web_frontend"
}
```

**Response:**
```json
{
  "id": "uuid-string",
  "client_name": "web_frontend",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 🎨 Design System

The application uses a sophisticated dark theme with:
- **Primary Color**: Gold (#f4ce90)
- **Accent Color**: Teal (#0B788A)
- **Background**: Dark with glass morphism effects
- **Typography**: Serif headings with sans-serif body text
- **Components**: Radix UI primitives with custom styling

## 🖼 Content Management

Content is managed through the `mock.js` file, including:
- Brand information and colors
- Signature cocktail data
- Gallery images from Unsplash/Pexels
- Business hours and contact information
- About section quotes

## 🔧 Development Scripts

### Frontend
```bash
yarn start    # Start development server
yarn build    # Build for production
yarn test     # Run tests
```

### Backend
```bash
uvicorn server:app --reload    # Development server
python -m pytest              # Run tests
black .                        # Format code
flake8 .                      # Lint code
```

## 🌐 Deployment

The application is configured for deployment with:
- Frontend: Can be deployed to Vercel, Netlify, or similar platforms
- Backend: Can be deployed to Heroku, Railway, or cloud providers
- Database: MongoDB Atlas for production

## 📱 Features in Detail

### Landing Page
- Hero carousel with signature cocktail images
- Interactive signature cocktails menu with pricing
- About section with accordion for additional details
- Image gallery carousel
- Contact form with local storage
- Business hours display

### Cocktails Page
- Search functionality by cocktail name
- Filter by ingredient tags
- Responsive card layout
- Price display and ingredient tags

### Gallery Page
- Autoplay hero carousel
- Masonry grid layout for optimal image display
- Responsive design for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code quality
5. Submit a pull request

## 📄 License

This project is proprietary software for Piranha Cocktail Bureau.

## 📞 Support

For technical support or questions about the application, please contact the development team.
