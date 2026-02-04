🚀 RBAC Real-Time Dashboard (Admin & Viewer)

A Role-Based Access Control (RBAC) web application built using React + Vite + Firebase, supporting real-time data updates using Firestore.

This project demonstrates Admin / Viewer role separation, real-time synchronization, and frontend performance optimization.

✨ Features

🔐 Google Authentication (Firebase Auth)

👥 Role-based access (Admin / Viewer)

📡 Real-time updates using Firestore

🧑‍💼 Admin can:

Add users

Edit phone number & credits

Delete users

👀 Viewer can:

View users in real time (read-only)

⚡ Optimized UI:

Memoized table rows

Non-blocking async operations

Minimal re-renders

🌍 Environment-based configuration:

Development & Production

🧠 Tech Stack

Frontend: React + Vite

Authentication: Firebase Authentication (Google)

Database: Firebase Firestore

State Management: React Hooks

📁 Project Structure
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
├── .env.example              # Environment template
├── package.json
└── README.md

⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/<your-username>/rbac-realtime-dashboard.git
cd rbac-realtime-dashboard/client

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create the following files inside client/.

.env.development
VITE_FIREBASE_API_KEY=your_dev_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_dev_auth_domain
VITE_FIREBASE_PROJECT_ID=your_dev_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_dev_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_dev_sender_id
VITE_FIREBASE_APP_ID=your_dev_app_id

.env.production
VITE_FIREBASE_API_KEY=your_prod_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_prod_auth_domain
VITE_FIREBASE_PROJECT_ID=your_prod_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_prod_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_prod_sender_id
VITE_FIREBASE_APP_ID=your_prod_app_id


🔒 .env files are ignored by Git for security.

4️⃣ Firebase Setup (Required)

In Firebase Console:

Create a Firebase project

Enable:

Authentication → Google Sign-In

Firestore Database

Create a Web App

Copy credentials into .env files

▶️ Running the Project
Development Mode
npm run dev


Runs on: http://localhost:5173

Uses .env.development

Production Preview (Local)
npm run build
npm run preview


Uses .env.production

🔁 Real-Time Behavior

Admin and Viewer dashboards stay in sync

Any update by Admin is reflected instantly for Viewer

🧠 Optimization Techniques Used

React.memo for table rows

useCallback for stable handlers

Loading states to prevent UI blocking

Efficient Firestore listeners
