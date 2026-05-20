# 🚀 AI Career Navigator

An AI-powered career roadmap and resume analysis platform that helps users generate personalized learning paths, skill development plans, and career guidance using Generative AI.

---

## 🌐 Live Demo

### Frontend
(Add your Vercel URL here)

```bash
https://your-vercel-app.vercel.app
```

### Backend API
(Add your Render Node Backend URL here)

```bash
https://your-node-backend.onrender.com
```

### AI Service
(Add your Render Python Service URL here)

```bash
https://your-ai-service.onrender.com
```

---

# 📌 Features

- 📄 Resume Upload & Analysis
- 🤖 AI-Powered Career Guidance
- 🛣️ Personalized Career Roadmaps
- 📅 Weekly Learning Plans
- 📊 Skill Gap Analysis
- 🔐 User Authentication
- ☁️ Cloud Deployment
- 📥 PDF Export Support
- 🎯 Modern Responsive UI

---

# 🏗️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios / Fetch API

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

## AI Service
- FastAPI
- Google Gemini API
- Python

## Deployment
- Vercel (Frontend)
- Render (Backend + AI Service)
- MongoDB Atlas (Database)

---

# 📂 Project Structure

```bash
AI-Career-Navigator/
│
├── client/          # React Frontend
├── server/          # Node.js Backend
├── ai_service/      # FastAPI AI Service
│
├── README.md
└── .gitignore
```

---

# ⚙️ Environment Variables

## Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
```

---

## Backend (`server/.env`)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

PYTHON_SERVICE_URL=http://localhost:8000
```

---

## AI Service (`ai_service/.env`)

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

# 🛠️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ai-career-navigator.git
```

```bash
cd ai-career-navigator
```

---

# 🚀 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🚀 Backend Setup

```bash
cd server
npm install
npm start
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🚀 AI Service Setup

```bash
cd ai_service

pip install -r requirements.txt

uvicorn main:app --reload
```

AI service runs on:

```bash
http://localhost:8000
```

---

# ☁️ Deployment

## MongoDB Atlas
- Create free M0 cluster
- Enable network access
- Create database user
- Copy MongoDB connection string

---

## Render Deployment
### Python AI Service
- Runtime: Python
- Root Directory: `ai_service`

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### Node Backend
- Runtime: Node
- Root Directory: `server`

Build Command:

```bash
npm install
```

Start Command:

```bash
node server.js
```

---

## Vercel Deployment
- Framework: Vite
- Root Directory: `client`

Environment Variable:

```env
VITE_API_URL=your_render_backend_url
```

---

# 📸 Screenshots

Add screenshots of:
- Homepage
- Resume Upload
- AI Roadmap
- Dashboard
- Authentication

---

# 🔮 Future Improvements

- 📈 AI Interview Preparation
- 🧠 Skill Recommendation Engine
- 📚 Course Integration
- 🎯 Real-Time Career Tracking
- 🧾 Resume Score System
- 🌍 Multi-language Support

---

# 🤝 Contributing

Contributions are welcome!

Fork the repository and create a pull request.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

### Mohammad Anzal Khan

- GitHub: https://github.com/AnzalKhan16
- LinkedIn: Add your LinkedIn profile
- Email: Add your email

---

# ⭐ Support

If you liked this project, please give it a ⭐ on GitHub!
