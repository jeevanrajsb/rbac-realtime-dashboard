# 🚀 RBAC Real-Time Dashboard (Admin & Viewer)

A **Role-Based Access Control (RBAC)** web application built using **React + Vite + Firebase**, supporting **real-time data updates** using Firestore.

This project demonstrates **Admin / Viewer role separation**, **real-time synchronization**, and **frontend performance optimization**.

---

## ✨ Features

- 🔐 **Google Authentication** (Firebase Auth)
- 👥 **Role-based access** (Admin / Viewer)
- 📡 **Real-time updates** using Firestore
- 🧑‍💼 **Admin can**:
  - Add users
  - Edit phone number & credits
  - Delete users
- 👀 **Viewer can**:
  - View users in real time (read-only)
- ⚡ **Optimized UI**:
  - Memoized table rows
  - Non-blocking async operations
  - Minimal re-renders
- 🌍 **Environment-based configuration**:
  - Development & Production

---

## 🧠 Tech Stack

- **Frontend**: React + Vite
- **Authentication**: Firebase Authentication (Google)
- **Database**: Firebase Firestore
- **State Management**: React Hooks

---

## 📁 Project Structure

```text
client/
├── src/
│   ├── auth/                 # Login
│   ├── pages/                # Admin & Viewer dashboards
│   ├── components/           # Protected routes, UI helpers
│   ├── firebase.js           # Firebase initialization
│   └── App.jsx
│
├── .env.development          # Dev environment (ignored)
├── .env.production           # Prod environment (ignored)
├── package.json
└── README.md
```

## LOCAL SETUP
-----------
```text
STEP 1: Clone Repository

$ git clone https://github.com/jeevanrajsb/rbac-realtime-dashboard.git
$ cd rbac-realtime-dashboard/client


STEP 2: Install Dependencies

$ npm install


STEP 3: Environment Variables

Create the following files inside the client/ directory.

.env.development

VITE_FIREBASE_API_KEY=your_dev_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_dev_auth_domain
VITE_FIREBASE_PROJECT_ID=your_dev_project_id


.env.production

VITE_FIREBASE_API_KEY=your_prod_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_prod_auth_domain
VITE_FIREBASE_PROJECT_ID=your_prod_project_id



NOTE:
.env files are ignored by Git for security reasons.


FIREBASE SETUP (REQUIRED)
-------------------------

In Firebase Console:

1. Create a Firebase project
2. Enable:
   - Authentication (Google Sign-In)
   - Firestore Database
3. Create a Web App
4. Copy credentials into the env files


RUNNING THE PROJECT
-------------------

DEVELOPMENT MODE:

$ npm run dev

Runs on:
http://localhost:5173

Uses:
.env.development


PRODUCTION PREVIEW (LOCAL):

Runs on:
http://localhost:4173

$ npm run build
$ npm run preview

Uses:
.env.production


REAL-TIME BEHAVIOR
------------------

- Admin and Viewer dashboards stay synchronized
- Any update made by Admin is reflected instantly for Viewer


OPTIMIZATION TECHNIQUES USED
----------------------------

- React.memo for table rows
- useCallback for stable handlers
- Loading states to prevent UI blocking
- Efficient Firestore listeners


