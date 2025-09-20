career-companion/
├── 📂 ai-service/           # Python (Flask/FastAPI) service for AI features
│   └── ...
├── 📂 client/                # React (Vite) frontend application
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/     # Reusable UI components (e.g., LoginModal)
│       ├── pages/          # Main page components (e.g., LandingPage, Dashboard)
│       └── services/       # Data or feature modules
├── 📂 server/                # Node.js (Express) backend server
│   ├── controllers/      # Logic for handling requests (authController, taskController)
│   ├── middleware/       # Custom middleware (authMiddleware)
│   ├── models/           # Mongoose schemas (User, Task)
│   └── routes/           # API route definitions (authRoutes, taskRoutes)
├── 📝 .gitignore
├── 📝 README.md             # You are here!
└── 📝 requirements.txt      # Python dependencies for the AI service
