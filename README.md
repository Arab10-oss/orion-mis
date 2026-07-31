# University Management Information System (MIS)

A production-ready, microservice-ready, fully Dockerized **University Management Information System (MIS)** built with **React 19**, **Express.js**, **MySQL 8**, **Sequelize ORM**, and **Nginx**.

---

## 🏗️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **React Router DOM v7**
- **Axios** (JWT interceptors & 401 handling)
- **Tailwind CSS** (Custom theme, Dark mode, Glassmorphism)
- **React Hook Form** + **Joi Validation**
- **Chart.js** & **react-chartjs-2**
- **Framer Motion** (Page transitions & micro-animations)
- **React Toastify** (Notifications)
- **Heroicons**

### Backend
- **Node.js** & **Express.js** (MVC Clean Architecture)
- **MySQL 8** + **Sequelize ORM** (11 Normalized Tables + Audit Logs)
- **JWT Authentication** & **Role-Based Access Control (RBAC)**
- **bcrypt** (Salt rounds: 12)
- **Helmet**, **Morgan**, **Cors**, **Cookie Parser**
- **Express Rate Limit**
- **ExcelJS** & **PDFKit** (Data exports)
- **Swagger API Docs** (OpenAPI 3.0)

### DevOps & Infrastructure
- **Docker** & **Docker Compose**
- **Nginx** (Reverse Proxy & Static Asset Server)
- **GitHub Actions** (CI/CD Pipeline)

---

## 📐 Architecture & Database ER Diagram

### Database Architecture (11 Normalized Tables)
- `users` — Authentication & system roles (`Admin`, `Faculty`, `Student`)
- `departments` — Academic departments
- `students` — Student profiles & academic tracking
- `faculty` — Faculty profiles & designations
- `admins` — Admin staff details
- `courses` — Course catalog & credits
- `course_offerings` — Semester offerings assigned to faculty
- `enrollments` — Student course enrollments
- `attendance` — Daily attendance logs (`Present`, `Absent`, `Late`)
- `exams` — Examination schedules & total marks
- `results` — Student exam marks & auto-calculated grades (`A`, `B`, `C`, `D`, `F`)
- `audit_logs` — System mutation audit trail with IP & user tracking

```
[Users] 1 --- 1 [Students / Faculty / Admins]
[Departments] 1 --- * [Students / Faculty / Courses]
[Courses] 1 --- * [Course Offerings / Exams]
[Faculty] 1 --- * [Course Offerings]
[Course Offerings] 1 --- * [Enrollments / Attendance]
[Students] 1 --- * [Enrollments / Attendance / Results]
[Exams] 1 --- * [Results]
```

---

## 🔑 Authentication & RBAC

> **NOTE:** There is **NO registration page**. Only administrators can insert users into the system.

### Default Login Credentials (Pre-seeded)

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@university.edu` | `Admin@123` |
| **Faculty** | `faculty1@university.edu` | `Faculty@123` |
| **Student** | `student1@university.edu` | `Student@123` |

### Role Permissions
- **Admin**: Complete system access — Manage Users, Students, Faculty, Departments, Courses, Offerings, Enrollments, Exams, Results, and View Reports & Audit Logs.
- **Faculty**: Manage Attendance, Upload Marks, View Assigned Courses & Student Lists.
- **Student**: View Enrolled Courses, Attendance History, Exam Results, Exam Schedule, and Profile.

---

## 🚀 Quick Start (One Command Execution)

The entire project is pre-configured to run immediately using Docker Compose.

```bash
docker-compose up --build
```

Access the application in your browser:
- **Web App**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **Swagger Documentation**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

---

## 📄 API Documentation

Full interactive Swagger API documentation is available at `http://localhost:5000/api/docs`.

### Primary Endpoints Overview
- `POST /api/auth/login` — User authentication
- `GET /api/auth/me` — Current user profile
- `GET, POST, PUT, DELETE /api/students` — Student CRUD
- `GET, POST, PUT, DELETE /api/faculty` — Faculty CRUD
- `GET, POST, PUT, DELETE /api/departments` — Department CRUD
- `GET, POST, PUT, DELETE /api/courses` — Course CRUD
- `GET, POST, PUT, DELETE /api/course-offerings` — Course Offerings CRUD
- `GET, POST, PUT, DELETE /api/enrollments` — Student Enrollments CRUD
- `GET, POST, PUT, DELETE /api/attendance` — Attendance Management
- `GET, POST, PUT, DELETE /api/exams` — Exam Schedule CRUD
- `GET, POST, PUT, DELETE /api/results` — Exam Results & Grading CRUD
- `GET /api/reports/*` — Analytics & Audit Logs

---

## ⚡ Features & Bonus Implementations
- **Pagination, Search, Sorting, Filtering**: Built into all table views with server-side query optimizations.
- **Excel & PDF Exports**: Download student lists and reports formatted dynamically.
- **Interactive Dashboards**: Powered by Chart.js for data visualization.
- **Dark Mode**: Fully supported with local storage persistence and system preference matching.
- **Audit Logging**: Comprehensive mutation tracking stored in `audit_logs`.
- **Security**: Rate limiting, Helmet HTTP headers, CORS validation, parameter sanitization, and SQL injection protection via Sequelize ORM.
