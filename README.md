<div align="center">
  <img src="https://img.icons8.com/color/120/000000/artificial-intelligence.png" alt="AI Career Navigator Logo" />
  <h1>🚀 AI Career Navigator V2</h1>
  <p><strong>Your Intelligent Copilot for Tech Career Growth</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a>
  </p>
</div>

---

## 🌟 Overview

**AI Career Navigator V2** is a modern, full-stack web application designed to help aspiring and established tech professionals map out their optimal career trajectory. By leveraging advanced generative AI, the platform provides highly personalized, step-by-step roadmaps, deep-dive resume analysis, and real-time community insights. Whether you're transitioning into Machine Learning, climbing the ladder in Data Science, or exploring AI Product Management, this tool bridges the gap between where you are and where you want to be.

## ✨ Core Features

*   **🔐 Secure JWT Authentication**
    Robust, industry-standard user authentication and session management to keep your personalized career data safe and accessible across devices.
    
*   **🗺️ AI-Powered Skill Roadmap Generation**
    Input your current role and target destination. Our integrated OpenAI engine will generate a comprehensive, structured timeline of the exact skills, tools, and milestones required to level up.
    
*   **📈 Real-Time Progress Tracking & Metrics**
    A sleek, interactive dashboard that visualizes your readiness score, tracks your verified skills, and highlights critical skill gaps at a glance using a modern glassmorphism UI.
    
*   **📄 Smart Resume Analyzer (ATS Match & Optimization)**
    Upload your resume directly to the platform. Our backend extracts the text (PDF/DOCX) and feeds it to an AI recruiter agent that evaluates your profile against your target role, offering actionable strengths and weaknesses.
    
*   **👥 Dynamic Community Pulse Event Feed**
    Don't build your career in a silo! A live, MongoDB-backed event feed broadcasts community milestones in real-time—see when peers generate new roadmaps or complete resume analyses.

---

## 🛠️ Tech Stack

**Frontend (Client)**
*   **React (Vite)**: Lightning-fast rendering and component state management.
*   **TailwindCSS**: Utility-first CSS for our dark-mode glassmorphism V2 UI.
*   **Lucide React**: Crisp, modern iconography.
*   **Axios**: Promise-based HTTP client for seamless backend communication.

**Backend (Server)**
*   **Node.js & Express.js**: High-performance, unopinionated routing and controller logic.
*   **MongoDB & Mongoose**: Flexible NoSQL database and elegant object modeling for users, roadmaps, and feed events.
*   **OpenAI API (gpt-4o-mini)**: The "brain" behind the roadmap generation and resume analysis.
*   **JWT & bcryptjs**: Stateless, encrypted user authentication.
*   **multer & pdf-parse**: In-memory file uploading and robust PDF text extraction.

---

## 💻 Installation & Local Development

Want to run AI Career Navigator locally? Follow these steps:

### 1. Prerequisites
*   [Node.js](https://nodejs.org/en/) (v16+)
*   [MongoDB](https://www.mongodb.com/) (Local installation or Atlas URI)
*   [OpenAI API Key](https://platform.openai.com/api-keys)

### 2. Clone the Repository
```bash
git clone https://github.com/YourUsername/ai-career-navigator.git
cd ai-career-navigator
```

### 3. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `/server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_career_navigator
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your-actual-openai-api-key
```
Start the server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The client will usually run on `http://localhost:5173`. Open it in your browser and start navigating your career!

---

## 🔮 Future Roadmap

We are constantly pushing the boundaries of what AI Career Navigator can do. Upcoming features include:
- **[ ]** LinkedIn & GitHub Integration to automatically pull your professional history
- **[ ]** Interactive Interview Prep Bot based on your target role
- **[ ]** Enhanced Analytics Dashboard with job market demand trends
- **[ ]** Peer Mentorship Matching system

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <p>Built with ❤️ by Anzal Khan and the Open Source Community</p>
</div>
