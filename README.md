# TaskFlow - Full-Stack Task Management Workspace

TaskFlow is a premium, responsive full-stack task management dashboard. It enables users to create, update, delete, search, filter, and track tasks. Features include built-in analytics, user authentication (JWT-based), and full dark mode support.

This workspace houses both the **frontend** and **backend** applications in a unified repository with easy concurrent startup tooling.

---

## 🌐 Live Deployments

* **Live Site**: [https://task-manager-green-psi-31.vercel.app](https://task-manager-green-psi-31.vercel.app)
* **API Endpoint**: [https://task-manager-n68i.onrender.com/api](https://task-manager-n68i.onrender.com/api)

---

## 🚀 Features

### Frontend Client
* **🔐 User Authentication**: Login and sign-up flows with automatic token persistence.
* **📋 Task Management**: Create, view, update (inline editing), and delete tasks.
* **🔄 Status Toggles**: Easily transition tasks through `Todo` ➔ `In Progress` ➔ `Done` stages.
* **🔍 Search & Advanced Filtering**: Filter tasks instantly by status, priority level, or search description.
* **📊 Analytics Dashboard**: Live metrics tracking total tasks, completed vs. pending counts, and completion rate percentages.
* **🌓 Dark Mode**: Seamless visual mode toggle for light and dark themes.

### Backend REST API
* **🔑 Security & Auth**: Password hashing with `bcryptjs` and session tokens with JWT.
* **📋 Task CRUD Operations**: Optimized MongoDB queries for task filtering, search, and pagination.
* **📈 Aggregation Pipeline**: Custom aggregation endpoint to compute task metrics for the analytics dashboard.

---

## 🛠️ Tech Stack & Architecture

### Backend API
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JWT (`jsonwebtoken`)

### Frontend Client
* **Framework**: React.js (Vite)
* **Styling**: Vanilla CSS (Tailwind-free Custom design system with CSS tokens, layouts, and animations)
* **Client**: Axios (with custom auth header interceptors)

---

## 📁 Repository Structure

```text
Task_Manager/
│
├── package.json         # Workspace-level script configuration
├── backend/             # Node.js & Express API server
│   ├── config/          # DB connection
│   ├── controllers/     # Route logic (auth and tasks)
│   ├── middleware/      # Auth validation & error handlers
│   ├── models/          # Mongoose schemas (User & Task)
│   └── server.js        # Server entry point
│
└── frontend/            # React & Vite application
    ├── src/
    │   ├── api/         # Endpoint request handlers
    │   ├── components/  # StatsCard, TaskCard, Navbar
    │   ├── pages/       # Login, Signup, Dashboard
    │   └── index.css    # Unified visual theme & layout
    └── vite.config.js   # Vite config
```

---

## ⚙️ Quick Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Hariabc/Task_Manager.git
cd Task_Manager
```

### 2. Install Workspace-Wide Dependencies
From the root directory, run:
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

Start both frontend and backend development servers concurrently with a single command from the root folder:

```bash
npm run dev
```

* **Frontend Dashboard**: [http://localhost:5173/](http://localhost:5173/)
* **Backend API server**: [http://localhost:5001/api](http://localhost:5001/api)

---

## 🔌 API Endpoints Reference

### Authentication Routes
* `POST /api/auth/signup` - Register a new user
* `POST /api/auth/login` - Authenticate user & return token

### Task Routes
* `POST /api/tasks` - Create a task
* `GET /api/tasks` - Fetch user tasks (supports filters: status, priority, search, page, limit)
* `GET /api/tasks/:id` - Fetch single task details
* `PUT /api/tasks/:id` - Update task details or status
* `DELETE /api/tasks/:id` - Delete task
* `GET /api/tasks/analytics` - Fetch summary stats of user tasks

---

## 🌐 Production Hosting Guide

### Hosting the Backend (Render or Railway)
1. Set up a web service linking your repository.
2. In the Environment Variables, add:
   * `MONGO_URI`
   * `JWT_SECRET`
   * `PORT` (Render handles this dynamically)
3. Set the build settings:
   * Build Command: `npm install`
   * Start Command: `node server.js`

### Hosting the Frontend (Vercel or Netlify)
1. Add a project linked to your repository.
2. In settings, add the Environment Variable:
   * `VITE_BACKEND_URL`: Put your live production backend URL (e.g. `https://your-backend-api.onrender.com/api`).
3. Set the build commands:
   * Build Command: `npm run build`
   * Output Directory: `dist`
