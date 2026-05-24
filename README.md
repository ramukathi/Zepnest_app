# 🏠 Zepnest Home Service Platform

A full-stack Home Service Request Management System where users can register, log in, create service requests, upload images, select preferred service times, and track request status in real time.

---

## 🚀 Live Demo

### Frontend (Vercel)
https://zepnest-app.vercel.app/

### GitHub Repository
https://github.com/ramukathi/Zepnest_app

---

# ✨ Features

✅ User Authentication (Register/Login)

✅ JWT-Based Secure Authentication

✅ Password Encryption using bcrypt

✅ Create Service Requests

✅ Upload Images for Requests

✅ Preferred Time Selection

✅ User Dashboard

✅ Request Status Tracking

✅ Responsive UI Design

✅ Full Stack Deployment

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM
- CSS

## Backend
- Node.js
- Express.js

## Database
- MySQL

## Authentication & Security
- JWT (JSON Web Token)
- bcrypt

## Hosting Platforms
- Railway (Backend + Database)
- Vercel (Frontend)

---

# 📂 Project Structure

```bash
Zepnest_app/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/ramukathi/Zepnest_app.git
```

---

## 2️⃣ Open Project Folder

```bash
cd Zepnest_app
```

---

# 🔥 Backend Setup

## Navigate to Backend Folder

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env` File

```env
PORT=5000

DB_HOST=your_mysql_host
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=railway
DB_PORT=3306

JWT_SECRET=your_secret_key
```

## Start Backend Server

```bash
npm start
```

---

# 🎨 Frontend Setup

## Navigate to Frontend Folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start React App

```bash
npm run dev
```

---

# 🗄️ Database Tables

## Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Service Requests Table

```sql
CREATE TABLE service_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(100),
  address TEXT,
  preferred_time VARCHAR(100),
  image_url TEXT,
  status ENUM('Pending','In Progress','Completed','Cancelled') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

# 🌐 Deployment

## Frontend Deployment
- Hosted on Vercel

## Backend Deployment
- Hosted on Railway

## Database Hosting
- Railway MySQL

---

# 🔐 Authentication Flow

- User registers account
- Password hashed using bcrypt
- JWT token generated after login
- Protected routes accessed using token authentication

---

# 📈 Future Improvements

- Admin Panel
- Real-Time Notifications
- Payment Integration
- Service Provider Dashboard
- Email Notifications
- AI-Based Service Recommendations

---

# 👨‍💻 Author

## Kathi Ramu
ramukathi18@gmail.com

GitHub:
https://github.com/ramukathi

---

# 📄 License

This project is licensed for educational and learning purposes.
