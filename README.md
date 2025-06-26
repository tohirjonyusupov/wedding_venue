Wedding Venue Booking System

A full-stack web application that allows users to browse and book wedding venues in Tashkent. The system supports role-based access for users, venue owners, and admins.

---

📌 Features

👤 Roles
- User: Can browse venues and make bookings
- Owner: Can add and manage their own venues
- Admin: Can manage all users and venues

💡 Functionalities
- Venue listing by district
- Multi-image upload per venue
- Online booking with date & guest count
- Admin approval system for venues
- Role-based authentication (JWT)

---

🛠 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React.js, Tailwind CSS, Zustand |
| Backend     | Node.js, Express.js           |
| Auth        | JWT (JSON Web Token)          |
| Database    | PostgreSQL (Hosted on Render) |
| Deployment  | Render (backend), Vercel (frontend) |

---

🌐 Live Demo
🔗 Live frontend: [wedding-venue-taupe.vercel.app](https://wedding-venue-taupe.vercel.app)
🔗 Backend API: [Render link](https://wedding-venue.onrender.com)

---

📦 Installation

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
