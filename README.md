Leaderboard System

A full-stack application for managing user points and rankings with real-time updates.

Features
Select users and award random points (1-10)

View dynamic leaderboard rankings

Add new users

Track point claim history

Real-time updates

Tech Stack
Frontend: React.js
Backend: Node.js, Express
Database: MongoDB

Quick Start
Backend Setup:

bash
cd backend
npm install
echo "MONGODB_URI=mongodb://localhost:27017/leaderboard" > .env
npm start
Frontend Setup:

bash
cd frontend
npm install
npm start
Access the app at http://localhost:3000

API
GET /api/users - Get ranked users

POST /api/users - Add user
POST /api/users/claim - Claim points
GET /api/history - Get claim history
