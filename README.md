# TaskFlow - Full-Stack Task Management Workspace

TaskFlow is a premium, responsive full-stack task management dashboard. It enables users to create, update, delete, search, filter, and track tasks. Features include built-in analytics charts/stats, user authentication (JWT-based), and full dark mode support.

This workspace houses both the **frontend** and **backend** applications in a unified repository with easy concurrent startup tooling.

---

## 🛠️ Tech Stack & Architecture

### Backend API
* **Runtime**: Node.js
* **Framework**: Express.js (REST API)
* **Database**: MongoDB (Mongoose ODM)
* **Security**: Password hashing with `bcryptjs`, session security via JSON Web Tokens (`jsonwebtoken`)

### Frontend Client
* **Framework**: React.js (Vite)
* **Styling**: Vanilla CSS (Tailwind-free Custom Tokens, Grid Layouts, Transitions)
* **API Client**: Axios (Automated JWT Authorization interceptor)
* **Icons & Notifications**: SVG icons, `react-hot-toast` for micro-interactions

---

## 📁 Repository Structure

```text
Task_Manager/
│
├── package.json         # Workspace-level package (concurrent run configuration)
├── backend/             # Node.js & Express API server
│   ├── config/          # DB connections
│   ├── controllers/     # Request controllers
│   ├── middleware/      # Auth & Error handling middlewares
│   ├── models/          # Mongoose DB Schemas
│   ├── routes/          # REST Endpoint routing
│   ├── server.js        # Main app entrypoint
│   └── .env             # Backend secrets configuration
│
└── frontend/            # React & Vite application
    ├── src/
    │   ├── api/         # Axios wrapper calls
    │   ├── components/  # StatsCard, TaskCard, Navbar
    │   ├── pages/       # Login, Signup, Dashboard
    │   └── index.css    # Premium CSS Design System
    └── .env             # Client environment configuration
```

---

## ⚙️ Quick Local Setup

### 1. Clone & Prerequisite Verification
Ensure you have **Node.js (v20+)** installed on your system.

```bash
git clone https://github.com/MantriYeshwanth/task-manager-frontend.git frontend
git clone https://github.com/MantriYeshwanth/task-manager-backend.git backend
```

### 2. Install Workspace-Wide Dependencies
From the root workspace folder, run the following command to install all dependencies for both directories and root workspace tools:

```bash
# Installs root, frontend, and backend packages
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3. Environment Variables Configuration

#### Backend Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
```

#### Frontend Variables
Create a `.env` file in the `frontend/` directory:
```env
VITE_BACKEND_URL=http://localhost:5001/api
```

---

## 🚀 Running the Apps

Run the following command in the **root** folder:

```bash
# Starts both frontend and backend concurrently
npm run dev
```

* **Frontend Dashboard**: `http://localhost:5173/`
* **Backend API server**: `http://localhost:5001/api`

---

## 🌐 Production Hosting Guide

### 1. Hosting the Backend (Render, Railway, or Heroku)
1. Push your backend folder code (or repository) to GitHub.
2. Link it to **Render** (Web Service) or **Railway**.
3. Set the Environment Variables under settings:
   * `MONGO_URI`
   * `JWT_SECRET`
   * `PORT` (should be dynamically read as `process.env.PORT`)
4. Set the build commands:
   * Build Command: `npm install`
   * Start Command: `node server.js`

### 2. Hosting the Frontend (Vercel, Netlify, or Amplify)
1. Push your frontend folder code (or repository) to GitHub.
2. Connect it to **Vercel** or **Netlify**.
3. In the deployment settings, add the Environment Variable:
   * `VITE_BACKEND_URL`: Put your hosted Backend URL (e.g. `https://your-backend-api.onrender.com/api`).
4. Set the build settings:
   * Framework Preset: **Vite**
   * Build Command: `npm run build`
   * Output Directory: `dist`
