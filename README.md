
# 🏡 MERN Airbnb Clone

A simple full-stack Airbnb-like app built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 📌 Features

- ✅ User Registration & Login (JWT)
- ✅ Host Dashboard: Create Listings
- ✅ Browse Listings
- ✅ View Listing Details
- ✅ Book a Listing (only for logged-in users)
- ✅ REST API with secure routes

---

## 📂 Project Structure

```
mern-airbnb-clone/
├── backend/           # Express + MongoDB API
│   ├── models/        # Mongoose models (User, Listing, Booking)
│   ├── routes/        # Auth, Listings, Bookings API routes
│   ├── controllers/   # Controllers for each resource
│   ├── server.js      # Express server entry point
│   └── .env           # Environment variables
└── frontend/          # React SPA
    ├── src/
    │   ├── pages/     # Dashboard, Listings, ListingDetails, Login, Register
    │   ├── services/  # Axios API wrapper
    │   └── App.jsx    # Main router
```

---

## ⚙️ Setup & Run

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/mern-airbnb-clone.git
cd mern-airbnb-clone
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file** in `backend/`:

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
PORT=5000
```

**Start backend:**

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Run the App

- Backend runs on: [http://localhost:5000](http://localhost:5000)
- Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## ✅ API Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| POST   | `/api/auth/register` | Register a new user        |
| POST   | `/api/auth/login`    | Login and get JWT token    |
| GET    | `/api/listings`      | Get all listings           |
| GET    | `/api/listings/:id`  | Get single listing details |
| POST   | `/api/listings`      | Create new listing (host)  |
| DELETE | `/api/listings/:id`  | Delete listing (host)      |
| POST   | `/api/bookings`      | Book a listing (user)      |

---

## 🧑‍💻 Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Other:** bcrypt, dotenv

---

## 📜 License

MIT License. Use and modify freely.

---

## ✨ Author

Built with ❤️ by [YOUR NAME]

---

## 📌 Notes

✅ Booking requires authentication.  
✅ Hosts can create/delete listings in Dashboard.  
✅ Guests can browse, view details, and book listings.

---
