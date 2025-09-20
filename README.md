# Career Companion – Project Structure

```text
career-companion/
├── 📂 ai-service/           # Python (FastAPI) microservice for AI features (e.g., recommendations, NLP)
│   └── ...
├── 📂 client/               # React (Vite) frontend application
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/      # Reusable UI components (e.g., LoginModal)
│       ├── pages/           # Main page components (LandingPage, Dashboard, etc.)
│       └── services/        # Data-fetching and feature modules
├── 📂 server/               # Node.js (Express) backend
│   ├── controllers/         # Request handlers (authController, taskController)
│   ├── middleware/          # Custom middleware (authMiddleware)
│   ├── models/              # Mongoose schemas (User, Task)
│   └── routes/              # API route definitions (authRoutes, taskRoutes)
├── 📝 .gitignore
├── 📝 README.md             # Project documentation
└── 📝 requirements.txt      # Python dependencies for ai-service
