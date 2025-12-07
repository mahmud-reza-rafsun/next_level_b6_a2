# Vehicle Rental System

[Live API](https://next-level-b6-a2.vercel.app/)

---

## 🚀 Project Overview
A **Vehicle Rental System** backend built with **Node.js**, **Express**, and **PostgreSQL**.  
The system allows admins to manage vehicles and customers, while customers can rent vehicles securely.  
Authentication and authorization are handled using **JWT** and **bcrypt** for password security.

---

## 🛠️ Features
- User Authentication & Role-based Access Control (Admin & Customer)
- Vehicle Management (Add, Update, Delete, List)
- Vehicle Availability Tracking
- Secure Password Hashing with **bcrypt**
- JWT-based Authentication
- Booking Management
- RESTful API Design

---

## 🧰 Technology Stack
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Authentication:** JWT, bcrypt  
- **Others:** dotenv, cors, pg  

---

## ⚙️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/mahmud-reza-rafsun/next_level_b6_a2
cd YOUR_REPO
Install dependencies

Copy code
npm install

Set up environment variables
Create a .env file in the root directory:

env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/db_name
JWT_SECRET=your_jwt_secret
Run the server

Copy code
npm run dev