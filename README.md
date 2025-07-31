# 🏠 REIA Frontend

**REIA (Real Estate Investment Analyzer)** is a full-stack web application that helps users make informed real estate investment decisions.

This is the **frontend** built with **React**, **Vite**, and **Tailwind CSS**. It communicates with the REIA backend which handles user authentication, real estate data, ROI calculations, and integration with a Python web scraper.

---

## 🌐 Live Demo

- **Frontend**: [Vercel](https://reia-frontend.vercel.app)
- **Backend**: [Render](https://reia-backend.onrender.com)

---

## Related repositories

- **Scraper**: [reia-scraper](https://github.com/prateekbalawat/reia-scraper)
- **Backend**: [reia-backend](https://github.com/prateekbalawat/reia-backend)

---

## 🚀 Features

- User Signup & Login with JWT-based authentication
- Submit investment amount + location to calculate ROI
- Fetch price/sqft and average sizes for major Bangalore locations
- Project 5-year ROI and CAGR
- Show nearby properties with price data
- Save reports and retrieve it per user
- Fast UI with Tailwind and Vite
- Fully deployed on Vercel

---

## 🧱 Tech Stack

- **React** + **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **JWT Authentication**
- **Deployed on Vercel**

---

📡 API Endpoints Used

Purpose Endpoint Method

- User Signup /api/auth/register POST
- User Login /api/auth/login POST
- Submit Investment /api/submit-investment POST
- Get Current Price /api/get-current-price?location=... GET
- Get ROI Projection /api/get-roi-projection?investment=... GET
- Competitive Analysis /api/competitive-analysis?location=... GET

---

🔐 Authentication

JWT is stored in localStorage after login.

AuthContext manages login state and protected routes.

Tokens are sent with API calls to access protected endpoints.

---

🧪 Testing the Deployed App

1. Visit https://reia-frontend.vercel.app

2. Sign up and log in

3. Enter investment amount and choose a location

4. View ROI projection, CAGR, and nearby properties

5. Save reports and go to the reports tab to view persisted reports

6. Download CSV or email yourself the report

---
