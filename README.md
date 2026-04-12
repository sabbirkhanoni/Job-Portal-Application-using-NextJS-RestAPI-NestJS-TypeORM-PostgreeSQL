# Job Portal Application
🔗 **Live Demo:** [job-portal-application-using-next-j.vercel.app](https://job-portal-application-using-next-j.vercel.app)

**The installation guide is provided below, after the User Interface (UI) section.**

<img width="1920" height="4401" alt="screencapture-localhost-3000-2026-04-09-20_04_23" src="https://github.com/user-attachments/assets/3d171b3b-6a88-428a-8f24-6ce0c4d2727c" />
<img width="1920" height="2032" alt="screencapture-localhost-3000-contact-2026-04-09-20_05_15" src="https://github.com/user-attachments/assets/18737d05-2627-450e-8f3a-f9792377ad5b" />
<img width="1920" height="3661" alt="screencapture-localhost-3000-about-2026-04-09-20_04_50" src="https://github.com/user-attachments/assets/1dfec0e6-9285-4565-afdc-1203749d5e45" />
<img width="1920" height="2032" alt="screencapture-localhost-3000-contact-2026-04-09-20_05_15" src="https://github.com/user-attachments/assets/8ab3345f-3486-4b66-9695-bd36196f4479" />
<img width="1920" height="1240" alt="screencapture-localhost-3000-login-2026-04-09-20_05_28" src="https://github.com/user-attachments/assets/5df6cd27-de6f-4ab0-806e-3b00f91dd1c1" />
<img width="1920" height="1240" alt="screencapture-localhost-3000-register-2026-04-09-20_05_37" src="https://github.com/user-attachments/assets/0c9df367-579d-4108-8ad3-039f51b56dc7" />
<img width="1920" height="1588" alt="screencapture-localhost-3000-dashboard-2026-04-09-20_09_27" src="https://github.com/user-attachments/assets/2b366427-a434-408f-896c-f9b2bfa4c119" />
<img width="1920" height="1115" alt="screencapture-localhost-3000-empDashboard-empChat-2026-04-09-20_55_30" src="https://github.com/user-attachments/assets/18683204-5a96-47eb-8ca1-97c1c553f9ef" />
<img width="1920" height="1300" alt="screencapture-localhost-3000-users-employeesUsers-2026-04-09-20_10_24" src="https://github.com/user-attachments/assets/1cbe6f0b-32e7-4d78-9353-5e6c4f303bfb" />
<img width="1920" height="1300" alt="screencapture-localhost-3000-users-jobseekersUsers-2026-04-09-20_10_43" src="https://github.com/user-attachments/assets/1134f07b-0838-44ee-b664-470c6368591a" />
<img width="1920" height="1300" alt="screencapture-localhost-3000-jobs-2026-04-09-20_11_08" src="https://github.com/user-attachments/assets/b55a1fef-1c04-4867-9829-690c525b95fd" />
<img width="1920" height="1632" alt="screencapture-localhost-3000-empDashboard-2026-04-09-20_16_00" src="https://github.com/user-attachments/assets/09a9c11a-e52e-4e6e-9ce2-fb65e290a424" />


# 🏢 Job Portal Application

A full-stack Job Portal Application built with modern technologies that enables **Admins**, **Employers**, and **Job Seekers** to interact seamlessly within a complete job-management ecosystem. This project demonstrates production-ready architecture, clean code structure, secure authentication, and scalable backend API design.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | NestJS, TypeScript, REST API |
| **ORM** | TypeORM |
| **Database** | PostgreSQL |
| **Authentication** | JWT (JSON Web Tokens) |

---

## 📁 Project Structure

```
Job-Portal-Application/
├── backend/          # NestJS REST API
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/         # Next.js Application
│   ├── src/
│   ├── package.json
│   └── ...
├── package.json      # Root package.json
└── README.md
```

---

## ✅ Prerequisites

Make sure you have the following installed on your machine before proceeding:

- **Node.js** v18.x or higher → [Download](https://nodejs.org/)
- **npm** v9.x or higher (comes with Node.js)
- **PostgreSQL** v14 or higher → [Download](https://www.postgresql.org/download/)
- **Git** → [Download](https://git-scm.com/)

Verify your installations:

```bash
node -v
npm -v
psql --version
git --version
```

---

## 📦 Installation Guide

### Step 1 — Clone the Repository

```bash
git clone https://github.com/sabbirkhanoni/Job-Portal-Application-using-NextJS-RestAPI-NestJS-TypeORM-PostgreeSQL.git
cd Job-Portal-Application-using-NextJS-RestAPI-NestJS-TypeORM-PostgreeSQL
```

---

### Step 2 — Set Up the PostgreSQL Database

1. Open your PostgreSQL shell or a GUI tool like **pgAdmin**.
2. Create a new database:

```sql
CREATE DATABASE job_portal;
```

3. Note your PostgreSQL credentials (host, port, username, password) — you'll need them in the next step.

---

### Step 3 — Configure the Backend

Navigate to the backend folder:

```bash
cd backend
```

Create a `.env` file by copying the example (if provided) or create one manually:

```bash
cp .env.example .env
```

Or create `.env` from scratch:

```bash
touch .env
```

Open `.env` and fill in your environment variables:

```env
# Server
PORT=4000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=job_portal

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# App
NODE_ENV=development
```

> ⚠️ **Never commit your `.env` file to version control.**

Install backend dependencies:

```bash
npm install
```

---

### Step 4 — Configure the Frontend

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Create a `.env` file:

```bash
touch .env
```

Add the following environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Install frontend dependencies:

```bash
npm install
```

---

### Step 5 — Run the Application

#### ▶ Start the Backend (NestJS)

In the `backend/` directory:

```bash
# Development mode (with hot reload)
npm run start:dev

# OR Production mode
npm run build
npm run start:prod
```

The backend API will be running at: **http://localhost:4000**

---

#### ▶ Start the Frontend (Next.js)

In the `frontend/` directory:

```bash
# Development mode
npm run dev

# OR Production mode
npm run build
npm run start
```

The frontend application will be running at: **http://localhost:3000**

---

### Step 6 — (Optional) Run Both from Root

If a root-level `package.json` with concurrent scripts is configured:

```bash
# From the project root
npm install
npm run dev
```

---

## 🔑 Default Roles & Access

| Role | Capabilities |
|---|---|
| **Admin** | Full system access — manage users, jobs, and applications |
| **Employer** | Post jobs, manage applications, chat with job seekers |
| **Job Seeker** | Browse jobs, apply, manage profile and applications |

---

## 📡 API Overview

The backend exposes a RESTful API at `http://localhost:4000`. Key endpoint groups:

| Endpoint Group | Description |
|---|---|
| `/auth` | Register, Login, JWT token management |
| `/users` | User management (Admin) |
| `/jobs` | Job listings — create, update, delete |
| `/applications` | Apply for jobs, track status |
| `/chat` | Real-time messaging between users |

---



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Sabbir Khan Oni**
- GitHub: [@sabbirkhanoni](https://github.com/sabbirkhanoni)

---

> ⭐ If you find this project helpful, please give it a star on GitHub!
