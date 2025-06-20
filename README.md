# 📝 Task Manager App

A full-stack task manager built using **Next.js** (React), **Node.js**, and **PostgreSQL**. This application allows users to **add**, **update**, **delete**, and **view tasks**. Tasks can be toggled between "pending" and "done" status.

---

## 🔧 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS  
- **Backend**: Node.js 
- **Database**: PostgreSQL  
- **Dev Tools**: pgAdmin

---

## 🚀 Features

- ✅ Add new tasks
- ✅ Mark tasks as done or pending
- ✅ Delete tasks
- ✅ Full CRUD functionality
- ✅ Responsive design using Tailwind CSS

---

## ⚙️ Installation

### Backend Setup

```bash
cd backend
npm install
````

Create PostgreSQL DB:

```sql
CREATE DATABASE taskmanager;
\\c taskmanager
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending'
);
```

Start server:

```bash
node index.js
```

Backend runs at `http://localhost:5000`

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📂 Project Structure

```
monkmantra-task-manager/
├── backend/
│   └── index.js
├── frontend/
│   ├── app/page.js
│   ├── styles/globals.css
│   └── public/
```

---

## 📡 API Endpoints

* `GET /tasks` → fetch all tasks
* `POST /tasks` → add a new task
* `PUT /tasks/:id` → update a task
* `DELETE /tasks/:id` → delete a task

---

## 📄 Documentation

### 1. Why this structure?

It separates frontend and backend for modularity. Next.js gives fast UI performance. Express makes APIs simple to manage.

### 2. How does frontend talk to backend?

The frontend uses `fetch()` to hit API endpoints hosted on `localhost:5000`.

### 3. Error/Edge Case Handling

Handled in backend using try-catch blocks and basic validation. Frontend handles `fetch()` errors with fallback UI.

### 4. Security considerations

* CORS is configured for local testing.
* In production, `.env` variables and secure token auth will be used.

### 5. Deployment:

* Deploy using Vercel + Render + Railway

Vercel Link: https://monkmantra-task-manager.vercel.app
Render Link: https://monkmantra-task-manager-backend.onrender.com
---

## 👤 Author

**Neelakanteswar Bathula**
LinkedIn: https://www.linkedin.com/in/neelanteswar2705
Portfolio: https://neelakanteswar.vercel.app

---


## 🧑‍💻 License

MIT License

```

---

This project is for **MonkMantra internship evaluation only**. Not intended for production or commercial use.
```
