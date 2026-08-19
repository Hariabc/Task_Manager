# Task Manager Backend

A scalable RESTful API built using Node.js and Express for managing tasks with authentication, filtering, pagination, and analytics.

---

##  Base URL

```
http://localhost:5001/api
```

---

##  Features

* 🔐 JWT Authentication (Login / Signup)
* 🔑 Password Hashing (bcrypt)
* 📋 Task CRUD Operations
* 🔍 Filtering & Search
* 📄 Pagination Support
* 📊 Task Analytics (Aggregation)
* 🔒 Protected Routes (Authorization)
* ⚡ Optimized MongoDB Queries

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcryptjs

---

##  Folder Structure

```
server/
│
├── config/
│   ├── db.js               # MongoDB connection
│   └── env.js              # environment variables
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── middleware/
│   ├── authMiddleware.js   
│   ├── errorMiddleware.js  
│   └── validateMiddleware.js
│
├── services/             
│   ├── authService.js
│   └── taskService.js
│
├── utils/
│   ├── generateToken.js
│   └── apiFeatures.js     
│
├── validations/
│   ├── authValidation.js
│   └── taskValidation.js
│
├── app.js                  
├── server.js               # Entry point
└── package.json
```

---

## ⚙️ Setup Instructions

1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/task-manager-backend.git
```

2. Navigate to project

```
cd task-manager-backend
```

3. Install dependencies

```
npm install
```

4. Create `.env` file or copy `.env.example`

```
cp .env.example .env
```

Then edit `.env` with your own values:

```
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

5. Run the server

```
npm run dev
```

---

## API Endpoints

###  Auth Routes

```
POST /api/auth/signup
POST /api/auth/login
```

---

###  Task Routes

```
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/analytics
```

---

## Analytics Example Response

```
{
  "totalTasks": 10,
  "completedTasks": 6,
  "pendingTasks": 4,
  "completionRate": 60
}
```

---

##  Authentication

Include token in headers:

```
Content-Type : application/json
Authorization: Bearer <your_token>
```

---

##  Author

Yeshwanth Mantri

---

##  Notes

This backend is designed with scalable architecture and clean separation of concerns, following RESTful API best practices.
